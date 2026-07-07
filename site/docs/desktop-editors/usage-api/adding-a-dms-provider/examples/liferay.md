---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Liferay integration

[Liferay](https://www.liferay.com/) is an enterprise portal and digital experience platform. The built-in Liferay provider in Desktop Editors can log into a Liferay portal, detect the ONLYOFFICE document editor route, and open matching files in the native desktop editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A running Liferay instance.
- The [ONLYOFFICE app for Liferay](https://github.com/ONLYOFFICE/onlyoffice-liferay) installed and configured.
- ONLYOFFICE Docs deployed and reachable from both Liferay and end-user browsers.
- A Liferay account with access to the required documents.

## Step 1: Preparing Liferay

1. Install the ONLYOFFICE app from Liferay Marketplace or deploy the compiled application to your Liferay server.
2. Configure the ONLYOFFICE Docs URL and JWT secret in the Liferay system settings.
3. Verify that the **Edit in ONLYOFFICE** action works in the browser before testing Desktop Editors.

## Step 2: Connecting ONLYOFFICE Desktop Editors to Liferay

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and choose **Liferay**.
3. Enter the portal URL and click **Connect now**.
4. Desktop Editors opens the Liferay login flow at the provider `startPage`.
5. Sign in and navigate to the document library or another page that exposes the ONLYOFFICE editor action.
6. When a document opens through the ONLYOFFICE integration, Desktop Editors can launch it natively.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\liferay\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/liferay/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/liferay/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
  "provider": "liferay",
  "name": "Liferay",
  "check": {
    "url": "/o/onlyoffice/status"
  },
  "editorPage": "regex:[?&]p_p_id=com_onlyoffice_liferay_docs_portlet_editorportlet.*",
  "cryptoSupport": "true",
  "order": 6,
  "icons": {
    "themeLight": {
      "connectionsList": "./assets/listicon.svg",
      "buttonLogo": "./assets/buttonlogo.svg"
    },
    "themeDark": {
      "connectionsList": "./assets/listicon_dark.svg",
      "buttonLogo": "./assets/buttonlogo_dark.svg"
    }
  },
  "startPage": "/o/onlyoffice/desktop/login"
}
```

| Parameter | Value | Description |
|---|---|---|
| `check.url` | `/o/onlyoffice/status` | Checks that the Liferay portal exposes the ONLYOFFICE integration status endpoint. |
| `startPage` | `/o/onlyoffice/desktop/login` | Opens the Desktop Editors-specific login entry point after the base portal URL is accepted. |
| `editorPage` | `regex:[?&]p_p_id=com_onlyoffice_liferay_docs_portlet_editorportlet.*` | Detects the Liferay ONLYOFFICE editor portlet URL. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |
| `order` | `6` | Defines the provider position in the connection dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Desktop Editors sends a `GET` request to `{server_url}/o/onlyoffice/status` to verify the Liferay integration endpoint.
2. If the check succeeds, the app opens `{server_url}/o/onlyoffice/desktop/login`, which is the provider `startPage` shipped in Desktop Editors 9.4.0.
3. After the user signs in, the Liferay integration can call `portal:login` and register the cloud under the `liferay` provider id.
4. When the user reaches an ONLYOFFICE editor portlet URL that matches the `p_p_id=com_onlyoffice_liferay_docs_portlet_editorportlet` pattern, Desktop Editors treats it as a document page and opens the file natively.
5. The document session itself is served by ONLYOFFICE Docs configured in Liferay. The portal can call `window.DesktopUpdateFile()` when a saved version should be reflected in the embedded browser.
6. On disconnect, Liferay should call `portal:logout` to remove the portal from Desktop Editors.

## Implementing Desktop Editors support

Liferay uses a dedicated `startPage`, so keep the Desktop Editors login and post-login pages within the same integration flow and register the cloud after authentication succeeds.

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
    provider: "liferay",
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

### The Liferay URL is not recognized

Check that `/o/onlyoffice/status` returns HTTP 200 from the desktop app and is not blocked by portal routing rules.

### The portal opens but files do not switch to the native editor

Verify that the ONLYOFFICE editor portlet URL still contains `p_p_id=com_onlyoffice_liferay_docs_portlet_editorportlet` or that the app explicitly calls `open:document`.

### Saving changes does not refresh the browser pane

Call `window.DesktopUpdateFile()` after the saved document version is written back to Liferay.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../../debugging/debugging.md).
