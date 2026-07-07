---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dropbox integration

[Dropbox](https://www.dropbox.com/) is a hosted file storage and sharing service. In ONLYOFFICE Desktop Editors, the built-in Dropbox provider uses a fixed ONLYOFFICE bridge entry page, so users can sign in to Dropbox from the app and open supported files in the native editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A Dropbox account.
- Outbound access from the desktop app to `dropbox.onlyoffice.com` and Dropbox sign-in pages.
- No self-hosted provider plugin or separate ONLYOFFICE Docs deployment is required on your side.

## Connecting ONLYOFFICE Desktop Editors to Dropbox

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and choose **Dropbox**.
3. Desktop Editors opens the Dropbox connection flow automatically; there is no server URL field for this provider.
4. Sign in to Dropbox and authorize access if prompted.
5. After the cloud is registered, browse your files in the embedded browser and open a supported document.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\dropbox\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/dropbox/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/dropbox/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
  "provider": "dropbox",
  "name": "Dropbox",
  "entryPage": "https://dropbox.onlyoffice.com/app",
  "extraLogout": "https://www.dropbox.com",
  "editorPage": "regex:\/(convert|editor)",
  "order": 1,
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
| `entryPage` | `https://dropbox.onlyoffice.com/app` | Fixed ONLYOFFICE bridge page used to start the Dropbox connection flow. |
| `extraLogout` | `https://www.dropbox.com` | Logout target used when the cloud is disconnected. |
| `editorPage` | `regex:/(convert|editor)` | Detects Dropbox bridge routes that should be opened in the native editor. |
| `order` | `1` | Defines the provider position in the connection dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Dropbox is configured with `entryPage`, so Desktop Editors skips the server availability check and opens `https://dropbox.onlyoffice.com/app` directly.
2. The user completes the Dropbox sign-in and authorization flow in the embedded browser.
3. Once authentication succeeds, the bridge page can register the cloud with `portal:login`.
4. When the user opens a file and the bridge navigates to a route matching `/convert` or `/editor`, Desktop Editors interprets that page as a native document entry point and opens the file locally.
5. Saving and file synchronization continue through the Dropbox-side bridge workflow. When the file list should be refreshed, the page can call `window.DesktopUpdateFile()`.
6. On disconnect, Desktop Editors removes the cloud and uses `https://www.dropbox.com` as the additional logout target.

## Implementing Desktop Editors support

For Dropbox-style SaaS providers, use the bridge or OAuth completion page to call `portal:login` and keep the returned editor URLs inside the shipped regex pattern.

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
    provider: "dropbox",
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

### The Dropbox login flow does not finish

Check access to `dropbox.onlyoffice.com` and Dropbox authentication pages from the embedded browser.

### The document opens in the browser instead of Desktop Editors

Verify that the bridge route still matches `/convert` or `/editor`, or explicitly call `open:document`.

### Disconnecting does not fully sign out

The provider uses `https://www.dropbox.com` as `extraLogout`. If the Dropbox web session remains active, sign out manually in the embedded page or clear cookies.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../../debugging/debugging.md).
