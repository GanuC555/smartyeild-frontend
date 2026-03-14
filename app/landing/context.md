The landing page is the public home screen — the first thing users see before connecting their wallet. It explains the protocol, shows features, and has a connect wallet CTA that kicks off the auth flow.

- Multi-section page: Navbar, Hero, Features, Services, Process, Quote, FAQ, Footer
- Hero section has a ConnectWalletButton that triggers useWalletConnect
- On successful wallet connect + auth, redirects to /dashboard
- All sections use scroll-reveal animations via Framer Motion
- No authentication required — this is the public entry point
