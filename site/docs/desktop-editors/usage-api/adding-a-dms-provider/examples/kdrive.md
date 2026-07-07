---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# kDrive integration

[Infomaniak kDrive](https://www.infomaniak.com/en/kdrive) is a hosted file storage and collaboration service. In ONLYOFFICE Desktop Editors, the built-in kDrive provider uses a fixed SaaS entry page so users can sign in directly from the desktop app and open kDrive office pages in the native editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- An Infomaniak account with access to a kDrive workspace.
- Outbound access from the desktop app to `drive.infomaniak.com`.
- No self-hosted provider plugin or separate ONLYOFFICE Docs deployment is required on your side.

## Connecting ONLYOFFICE Desktop Editors to Infomaniak kDrive

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and choose **infomaniak kDrive**.
3. Desktop Editors opens the kDrive sign-in flow automatically; no server URL entry is required.
4. Sign in to your Infomaniak account in the embedded browser.
5. Open your kDrive workspace and select a supported document.
6. When kDrive opens an office page, Desktop Editors can hand the file to the native editor.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\kdrive\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/kdrive/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/kdrive/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
  "provider": "kdrive",
  "name": "infomaniak kDrive",
  "entryPage": "https://drive.infomaniak.com/app/drive",
  "extraLogout": "https://infomaniak.com/",
  "editorPage": "/app/office/",
  "cryptoSupport": "true",
  "order": 5,
  "icons": {
    "themeLight": {
      "connectionsList": "./assets/listicon.svg",
      "buttonLogo": "./assets/buttonlogo.svg"
    },
    "themeDark": {
      "connectionsList": "./assets/listicon_dark.svg",
      "buttonLogo": "./assets/buttonlogo_dark.svg"
    }
  }
}
```

| Parameter | Value | Description |
|---|---|---|
| `entryPage` | `https://drive.infomaniak.com/app/drive` | Fixed SaaS entry point used instead of a user-provided server URL. |
| `extraLogout` | `https://infomaniak.com/` | Additional logout target used when the user disconnects the cloud. |
| `editorPage` | `/app/office/` | Identifies the kDrive office route that should be opened in the native editor. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |
| `order` | `5` | Defines the provider position in the connection dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Because kDrive is configured with `entryPage`, Desktop Editors skips the `check.url` probe and opens `https://drive.infomaniak.com/app/drive` directly.
2. The user authenticates in the embedded browser using the normal Infomaniak web flow.
3. After sign-in, the integration page can register the cloud with `portal:login` using the `kdrive` provider id.
4. When the user opens a document and the browser navigates to a route containing `/app/office/`, Desktop Editors intercepts that page or handles `open:document` and launches the file natively.
5. Saving continues through the provider-side kDrive workflow. If the embedded file browser needs to refresh after save, the integration can call `window.DesktopUpdateFile()`.
6. On disconnect, Desktop Editors can clear the registered cloud and then open the configured `extraLogout` target to terminate the web session.

## Implementing Desktop Editors support

kDrive is a SaaS-style provider. Use the OAuth/login completion page to call `portal:login`, then hand office routes to Desktop Editors.

If you are implementing or customizing this provider, add the Desktop Editors hooks to the pages that users can reach after authentication.

Desktop Editors can be detected in three ways:

- `?desktop=true` is added to the request URL.
- `navigator.userAgent` contains `AscDesktopEditor {version}`.
- `window.AscDesktopEditor` is available in JavaScript.

The recommended detection pattern is:

```ts
if (window.AscDesktopEditor) {
  window.AscDesktopEditor.execCommand("portal:login", JSON.stringify({
    displayName: "John Smith",
    email: "john@example.com",
    domain: "https://example.com",
    provider: "kdrive",
    uiTheme: "theme-dark",
    userId: "78e1e841",
  }));
}
```

| Integration point | When to call | Purpose |
|---|---|---|
| `portal:login` | On every page reachable after user authentication | Registers the cloud in Desktop Editors |
| `open:document` | When the user opens a file from the web interface | Launches the file in the native desktop editor |
| `window.DesktopUpdateFile()` | After the provider saves the updated file back to storage | Refreshes the file browser in Desktop Editors |
| `portal:logout` | On disconnect or session end | Removes the cloud and clears cookies for the domain |
| `portal:uitheme` | When the portal theme changes | Synchronizes the Desktop Editors tab theme |

For details on each command, see [execCommand method](../execcommand.md).

## Troubleshooting

### The sign-in page loops or does not complete

Check that the embedded browser can reach `drive.infomaniak.com` and that corporate filtering is not blocking the login flow.

### Files open in the browser instead of Desktop Editors

Verify that the resulting document route contains `/app/office/` or explicitly calls `open:document`.

### Disconnecting the cloud does not sign you out completely

The provider uses `https://infomaniak.com/` as `extraLogout`. If the web session persists, sign out from the provider in the embedded page or clear cookies.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../../debugging/debugging.md).
