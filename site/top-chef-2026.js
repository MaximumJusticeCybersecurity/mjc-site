(() => {
  const chefs = [
    { id: 'chef-1', name: 'Chef 1', dish: 'Featured mushroom dish', image: '' },
    { id: 'chef-2', name: 'Chef 2', dish: 'Featured mushroom dish', image: '' },
    { id: 'chef-3', name: 'Chef 3', dish: 'Featured mushroom dish', image: '' },
    { id: 'chef-4', name: 'Chef 4', dish: 'Featured mushroom dish', image: '' }
  ];

  const grid = document.getElementById('chef-grid');
  const form = document.getElementById('top-chef-ballot');
  const button = document.getElementById('vote-button');
  const status = document.getElementById('vote-status');

  function chefCard(chef, index) {
    const label = document.createElement('label');
    label.className = 'chef-card';
    label.htmlFor = chef.id;

    const media = chef.image
      ? `<img class="chef-photo" src="${chef.image}" alt="${chef.name}">`
      : `<div class="chef-photo chef-photo--placeholder" aria-hidden="true"><span>${index + 1}</span></div>`;

    label.innerHTML = `${media}<div class="chef-copy"><div class="choice-row"><input id="${chef.id}" type="radio" name="chef" value="${chef.id}"><span class="radio-ui" aria-hidden="true"></span><span class="chef-name">${chef.name}</span></div><p class="dish">${chef.dish}</p></div>`;
    return label;
  }

  chefs.forEach((chef, index) => grid.appendChild(chefCard(chef, index)));

  form.addEventListener('change', () => {
    button.disabled = !form.elements.chef.value;
    status.textContent = '';
    document.querySelectorAll('.chef-card').forEach((card) => {
      const input = card.querySelector('input[type="radio"]');
      card.classList.toggle('selected', Boolean(input?.checked));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const chef = form.elements.chef.value;
    if (!chef) return;

    button.disabled = true;
    button.textContent = 'Submitting…';
    status.textContent = '';

    try {
      const response = await fetch('/api/top-chef-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chef, website: form.elements.website.value })
      });
      const payload = await response.json().catch(() => ({}));

      if (response.ok && payload.ok) {
        localStorage.setItem('setas-top-chef-2026-voted', '1');
        status.textContent = 'Vote recorded. Thank you for choosing your 2026 Top Chef.';
        button.textContent = 'Vote Recorded';
        document.querySelectorAll('input[name="chef"]').forEach((input) => { input.disabled = true; });
        return;
      }

      if (payload.code === 'DUPLICATE_VOTE') {
        localStorage.setItem('setas-top-chef-2026-voted', '1');
        status.textContent = 'A vote from this device or connection has already been recorded.';
        button.textContent = 'Already Voted';
        return;
      }

      throw new Error(payload.code || 'VOTE_FAILED');
    } catch {
      status.textContent = 'Your vote could not be recorded. Please try again.';
      button.disabled = false;
      button.textContent = 'Cast My Vote';
    }
  });

  if (localStorage.getItem('setas-top-chef-2026-voted') === '1') {
    status.textContent = 'This device has already submitted a vote.';
  }
})();
