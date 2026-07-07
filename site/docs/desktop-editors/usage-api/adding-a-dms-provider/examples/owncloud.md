---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ownCloud integration

[ownCloud](https://owncloud.com/) is a self-hosted file sharing and collaboration platform. The built-in ownCloud provider in ONLYOFFICE Desktop Editors lets users sign in to an ownCloud instance and open files from the ONLYOFFICE app in the native desktop editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A running ownCloud instance.
- The ONLYOFFICE app installed and enabled in ownCloud.
- ONLYOFFICE Docs deployed and reachable from both the ownCloud server and the user's machine.

## Step 1: Preparing ownCloud

1. Open the ownCloud Marketplace or install the ONLYOFFICE app manually on the server.
2. Enable the app in ownCloud administration settings.
3. Configure the ONLYOFFICE Docs endpoint and JWT settings in the ownCloud ONLYOFFICE section.

## Step 2: Connecting ONLYOFFICE Desktop Editors to ownCloud

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and choose **ownCloud**.
3. Enter the ownCloud server URL.
4. Click **Connect now** and sign in in the embedded browser.
5. After the login succeeds, the ownCloud file area appears under **Clouds**.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\owncloud\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/owncloud/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/owncloud/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
  "provider": "owncloud",
  "name": "ownCloud",
  "check": {
    "url": "status.php"
  },
  "editorPage": "/apps/onlyoffice/",
  "startPage": "/",
  "cryptoSupport": "true",
  "order": 3,
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
| `check.url` | `status.php` | Confirms that the entered server is reachable and matches an ownCloud-style status endpoint. |
| `editorPage` | `/apps/onlyoffice/` | Identifies the ONLYOFFICE app route that Desktop Editors should treat as a document editor page. |
| `startPage` | `/` | Opens the root page of the ownCloud portal after the server URL is accepted. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |
| `order` | `3` | Defines the provider position in the connection dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Desktop Editors verifies the portal by sending a `GET` request to `{server_url}/status.php`.
2. If the response succeeds, the embedded browser opens the ownCloud root page because the provider defines `startPage: "/"`.
3. After authentication, the ownCloud ONLYOFFICE app can register the cloud with `portal:login`.
4. When the user opens a file through the ONLYOFFICE app and the route includes `/apps/onlyoffice/`, Desktop Editors intercepts the editor route or handles `open:document` and launches the native editor.
5. The ONLYOFFICE Docs instance configured in ownCloud serves the editor session, while save callbacks and version updates are handled back in ownCloud. The web app can call `window.DesktopUpdateFile()` when the file state changes.
6. On disconnect, ownCloud should call `portal:logout` to remove the connection from Desktop Editors.

## Implementing Desktop Editors support

Implement the Desktop Editors hooks inside the ownCloud ONLYOFFICE app pages so the registration and handoff happen after authentication.

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
    provider: "owncloud",
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

### The ownCloud server URL is not accepted

Verify that `status.php` is reachable and returns HTTP 200. Some proxy rules redirect the request to a login page, which breaks the provider check.

### Documents open in the browser instead of Desktop Editors

Confirm that the ONLYOFFICE app is enabled and that file-opening routes use `/apps/onlyoffice/` or call `open:document`.

### Saving back to ownCloud fails

Check the ONLYOFFICE Docs URL, callback reachability, and JWT settings in the ownCloud administration page.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../../debugging/debugging.md).
