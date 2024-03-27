# Electron Auth

Let's try Electron Auth following [Electron documentation](https://www.electronjs.org/docs/latest/).

## Goals

- Implement new brand icons ✅
- Test Auth0 + Azure App ✅
- Sign in button Electron - Auth0 webAuth without approval from Admin
- Sign in button Electron - Auth9 with Admin approval
- Test MSAL
- Test Java to discover IWA + Electron
- Confirm Auto login without organization
- Confirm Auth login with organization
- Tray icon
- Test rebranding prebuilt apps based on this [doc](https://www.electronjs.org/docs/latest/tutorial/application-distribution)
- Signing Apps (Mac and Win)

## Resources

- [Icons with Electron Forge](https://www.electronforge.io/guides/create-and-add-icons#windows-and-macos)

## Discoveries

- `icon.icns` is used on Mac and `icon.ico` on Windows. So, please keep both
- The runtime icon on dev mode was not possible to be updated or the OS cache is more annoying than regular caches
