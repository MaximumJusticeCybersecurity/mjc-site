# ThinkEzIT End-to-End Build Checklist

Status: ACTIVE BUILD — MEDIA BINDING REMAINS
Authoritative persistent copy: `/Aegis/ThinkEzIT/ThinkEzIT_End_to_End_Campaign_Build_Checklist_2026-08-28.md`

## Foundation
- [x] Legal and healthcare verticals
- [x] Target geography and scoring model
- [x] Jab-Jab-Hook structure
- [x] Current ThinkEzIT trial/contact routes verified
- [x] Fresh implementation branch from current production

## Legal journey
- [x] Landing page built on current production baseline
- [ ] Exact real personalized video integrated
- [x] Jab #1 readiness check
- [x] Jab #2 one-system continuity pressure test
- [x] Trial and contact hook
- [x] Responsive/mobile CSS implemented
- [x] Public implementation-note language removed
- [ ] Final mobile/accessibility journey review after video binding

## Healthcare journey
- [x] Landing page built on current production baseline
- [ ] Exact real personalized video integrated
- [x] Jab #1 readiness check
- [x] Jab #2 critical-dependency map
- [x] Appropriately scoped trial/contact hook
- [x] Responsive/mobile CSS implemented
- [x] Public implementation-note language removed
- [ ] Final mobile/accessibility journey review after video binding

## Video
- [x] Personalized Michael + Barry script exists
- [x] Companion-perspective grammar defined
- [x] Production media path reserved
- [x] Candidate `Walk_Talk_2026-08-25_Final.mp4` inspected and rejected as final campaign cut: duration 13:31, therefore not the target ~2-minute personalized video
- [ ] Exact finished MP4 identity verified
- [ ] MP4 at `/thinkezit/media/thinkezit-michael-barry.mp4`
- [ ] SRT at `/thinkezit/media/thinkezit-michael-barry.srt`
- [ ] Playback and telemetry verified against real media

## Outreach and operations
- [x] Final production route templates replace page placeholders
- [x] Prospect-specific UTM taxonomy
- [x] Jab #1/Jab #2/Hook sequences synchronized with pages
- [x] Prospect list ported with owner/status/suppression fields
- [x] Suppression/duplicate handling documented
- [x] Production-target legal QR generated and stored in Aegis Library
- [x] Production-target healthcare QR generated and stored in Aegis Library
- [x] Page/Jab/video/trial/contact telemetry hooks defined
- [x] Metrics doctrine requires downstream owner/action; orphan outputs prohibited

## Brand / trust fixes
- [x] External ThinkEzIT logo hot-link identified as incompatible with MJC CSP
- [x] Site-wide CSP not weakened
- [x] Broken third-party image dependency removed from campaign pages
- [ ] Replace temporary text brand treatment with exact locally hosted approved ThinkEzIT logo when the approved logo file is available in the repository/build context

## Release acceptance
- [x] Vercel preview build success on implementation candidate
- [x] Legal preview rendered HTTP 200
- [x] Current security headers preserved on preview
- [x] Official ThinkEzIT trial/contact destinations independently verified current
- [x] No stale 2025 scarcity/deadline language copied into campaign
- [ ] Exact video and captions return HTTP 200
- [ ] All four internal value-asset routes independently fetched after final media commit
- [ ] Desktop and mobile final journey reviewed with real video
- [ ] Production deployment verified
- [ ] Legal QR verified against production route
- [ ] Healthcare QR verified against production route
- [ ] Operations record updated with final production evidence

## Release decision
Do not merge/publish the campaign as complete until the exact ~2-minute Michael/Barry video and captions are bound. The rest of the campaign is implemented on PR #59 and preview-builds successfully. The 13:31 Walk & Talk file currently visible in the Aegis Library is not the finished personalized cut and must not be mislabeled or substituted.