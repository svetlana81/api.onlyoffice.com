---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Box integration

[Box](https://www.box.com/) is a cloud content management platform for business files and collaboration. The built-in Box provider in ONLYOFFICE Desktop Editors uses a fixed ONLYOFFICE bridge entry page and opens matching Box office routes in the native editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A Box account.
- Outbound access from the desktop app to `box.onlyoffice.com` and Box sign-in pages.
- No self-hosted provider plugin or separate ONLYOFFICE Docs deployment is required on your side.

## Connecting ONLYOFFICE Desktop Editors to Box

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and choose **Box**.
3. Desktop Editors opens the Box bridge page automatically; there is no server URL field for this provider.
4. Sign in to Box and approve the required permissions if prompted.
5. Browse to a supported file and open it from the embedded browser.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\box\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/box/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/box/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
  "provider": "box",
  "name": "Box",
  "entryPage": "https://box.onlyoffice.com/app",
  "extraLogout": "https://box.com",
  "editorPage": "regex:execute.*onlyoffice_personal",
  "order": 0,
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
| `entryPage` | `https://box.onlyoffice.com/app` | Fixed ONLYOFFICE bridge page used to start the Box connection flow. |
| `extraLogout` | `https://box.com` | Logout target used when the cloud is disconnected. |
| `editorPage` | `regex:execute.*onlyoffice_personal` | Detects the Box bridge route that should be handled by the native editor. |
| `order` | `0` | Places Box at the top of the provider list in the current Desktop Editors build. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Because Box uses `entryPage`, Desktop Editors skips the `check.url` request and opens `https://box.onlyoffice.com/app` directly.
2. The user completes the Box sign-in and authorization flow in the embedded browser.
3. After authentication, the bridge page can call `portal:login` and register the cloud in Desktop Editors.
4. When the user opens a file and the resulting route matches `execute.*onlyoffice_personal`, Desktop Editors treats it as a document editor entry point and opens the file natively.
5. Saving and synchronization continue through the Box-side bridge workflow. The page can call `window.DesktopUpdateFile()` when the file list in the embedded browser must be refreshed.
6. On disconnect, Desktop Editors removes the cloud and can open `https://box.com` as the configured logout target.

## Implementing Desktop Editors support

For Box-style SaaS flows, keep the OAuth completion page inside the embedded browser and register the cloud before redirecting to the document bridge.

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
    provider: "box",
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

### The Box login flow fails or loops

Check access to `box.onlyoffice.com` and Box authentication pages from the embedded browser.

### Files do not switch to the native editor

Verify that the resulting bridge URL still matches `execute.*onlyoffice_personal`, or explicitly call `open:document`.

### Disconnecting does not end the Box web session

The provider uses `https://box.com` as `extraLogout`. If the session remains active, sign out manually in the embedded page or clear cookies.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../../debugging/debugging.md).
