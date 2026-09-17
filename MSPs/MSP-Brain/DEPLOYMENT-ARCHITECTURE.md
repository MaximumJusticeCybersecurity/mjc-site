# MSP Brain Deployment Architecture

## User Experience

The intended end-user flow is simple:

1. The MSP receives a trusted download link.
2. The user downloads the MSP-specific signed Windows installer.
3. The user runs the installer locally and explicitly approves installation.
4. The installer deploys the MSP Brain application, approved configuration, local support components, and shortcuts.
5. On first launch, the application completes environment checks and prompts for any required authorized account connections.
6. The Brain is then available from the desktop/Start menu and can update through an authenticated release channel.

A web browser should not be expected to execute an `.exe` directly from a repository page. The repository or MJC site may provide the trusted download link, but execution happens locally after download.

## Distribution Pattern

Preferred external distribution:

- Human-facing MJC/ThinkEzIT download page or controlled GitHub Release page
- Versioned signed installer asset
- Published SHA-256 digest
- Release notes
- Minimum system requirements
- Installation instructions
- Rollback/uninstall instructions

The Git repository remains the source of truth for source code, build definitions, configuration templates, release manifests, documentation, and traceability. Large binary installer assets should be distributed through a release/artifact mechanism rather than treated as ordinary source files.

## Security Requirements

- Code-sign Windows installer and executable before external release.
- Never package reusable credentials, API keys, access tokens, private certificates, or customer secrets.
- Use least privilege for installation and runtime.
- Separate privileged operations from normal agent operation.
- Verify update signatures and hashes before applying updates.
- Protect local configuration and cached customer information using OS-native controls where appropriate.
- Log security-relevant events without logging secrets.
- Provide explicit uninstall and rollback capability.
- Maintain an SBOM/build manifest for releasable builds.
- Scan dependencies and build outputs prior to release.

## Release States

Use explicit release states:

- Development
- Internal test
- ThinkEzIT pilot
- Release candidate
- Production-approved
- Deprecated
- Revoked

Only production-approved builds may be presented as the standard MSP Brain installer.

## Public/Private Boundary

The current `mjc-site` repository is public. Do not place confidential MSP customer data, secrets, private operational records, proprietary credentials, or restricted customer-specific knowledge in public paths.

Before production packaging, decide whether customer-specific Brain source/configuration will remain public, be separated into a private repository/artifact store, or be generated from protected configuration during CI/CD. Default to protected/private storage for customer-specific operational material.

## Traceability

Every installer release must map to:

- Source commit SHA
- Build workflow/run
- Brain baseline version
- MSP-specific configuration version
- Installer version
- SHA-256 digest
- Signing identity
- Approval record
- Release notes

This enables support, rollback, incident analysis, and reproducibility.
