(() => {
  'use strict';

  const GUIDE_URL = 'https://app.maximumjusticecybersecurity.com/local-digital-brain-guide';
  const ALLOWED_HOSTS = new Set([
    'maximumjusticecybersecurity.com',
    'www.maximumjusticecybersecurity.com'
  ]);

  function installGuidePromotion() {
    if (!ALLOWED_HOSTS.has(window.location.hostname)) return;
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;
    if (document.getElementById('mjc-local-brain-guide-promo')) return;

    const style = document.createElement('style');
    style.textContent = `
      .mjc-guide-promo{position:fixed;left:22px;bottom:22px;z-index:9998;width:min(330px,calc(100vw - 44px));padding:16px 17px;border:1px solid rgba(84,216,255,.62);border-radius:18px;background:linear-gradient(145deg,rgba(6,19,29,.97),rgba(13,61,87,.97));color:#f7fbff;box-shadow:0 18px 45px rgba(0,0,0,.34);font-family:Aptos,Inter,"Segoe UI",Arial,sans-serif}
      .mjc-guide-promo__eyebrow{margin:0 0 4px;color:#54d8ff;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .mjc-guide-promo__title{margin:0 0 5px;font-size:1.05rem;line-height:1.2;font-weight:900;color:#fff}
      .mjc-guide-promo__copy{margin:0 0 12px;color:#d6e5ed;font-size:.84rem;line-height:1.4}
      .mjc-guide-promo__button{display:flex;align-items:center;justify-content:center;min-height:44px;padding:10px 15px;border-radius:999px;background:#087a9f;color:#fff!important;text-decoration:none!important;font-weight:900;line-height:1.2}
      .mjc-guide-promo__button:hover{filter:brightness(.92)}
      .mjc-guide-promo__button:focus-visible{outline:3px solid #ffbf47;outline-offset:3px}
      @media(max-width:520px){.mjc-guide-promo{left:12px;bottom:72px;width:calc(100vw - 24px);padding:14px 15px}}
      @media print{.mjc-guide-promo{display:none!important}}
    `;
    document.head.appendChild(style);

    const promo = document.createElement('aside');
    promo.id = 'mjc-local-brain-guide-promo';
    promo.className = 'mjc-guide-promo';
    promo.setAttribute('aria-label', 'Free Local Digital Brain Starter Guide');
    promo.innerHTML = `
      <p class="mjc-guide-promo__eyebrow">Free Local AI Guide</p>
      <p class="mjc-guide-promo__title">Build a digital brain you can control.</p>
      <p class="mjc-guide-promo__copy">Enter your email to unlock the guide, then read online or save it as a PDF.</p>
      <a class="mjc-guide-promo__button" href="${GUIDE_URL}" target="_blank" rel="noopener">Download the Free Guide</a>
    `;

    promo.querySelector('a').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('mjc:conversion', {
        detail: {
          name: 'local_brain_guide_clicked',
          route: 'squarespace_homepage',
          path: window.location.pathname
        }
      }));
      try {
        if (window.va) {
          window.va('event', {
            name: 'local_brain_guide_clicked',
            data: { route: 'squarespace_homepage' }
          });
        }
      } catch (_) {}
    });

    document.body.appendChild(promo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installGuidePromotion, { once: true });
  } else {
    installGuidePromotion();
  }
})();
