# Copilot Instructions

Follow this architecture strictly:

1. Feature-first only under app/(features)/
2. Route files stay thin (render feature page only)
3. UI in components/featureUI (no business logic)
4. Logic/API/hooks in components/featureService
5. One context.md per feature (keep updated)
6. No direct API calls from UI components
7. Keep names predictable (PascalCase components, useX hooks)

If unsure: keep logic inside the feature service layer.
