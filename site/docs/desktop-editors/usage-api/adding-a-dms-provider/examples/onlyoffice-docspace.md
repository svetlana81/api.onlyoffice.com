---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ONLYOFFICE DocSpace integration

[ONLYOFFICE DocSpace](https://www.onlyoffice.com/docspace.aspx) is ONLYOFFICE's collaboration platform for rooms, files, and document workflows. In the current Desktop Editors 9.4.0 build, the shipped `onlyoffice` provider connects to an ONLYOFFICE portal, opens the Files module in the embedded browser, and hands matching document pages off to the native editors.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- An accessible ONLYOFFICE portal URL with the Files module enabled.
- A user account that can sign in to the portal and open files.
- If you use an on-premises deployment, make sure HTTPS and the portal API are reachable from the desktop app.

## Connecting ONLYOFFICE Desktop Editors to ONLYOFFICE DocSpace

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds**.
3. Select **ONLYOFFICE** from the provider list.
4. Enter the portal URL and click **Connect now**.
5. Sign in to your ONLYOFFICE account in the embedded browser.
6. After authentication, the portal Files area opens and the connection appears under **Clouds**.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\onlyoffice\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/onlyoffice/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/onlyoffice/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
    "provider": "onlyoffice",
    "name" : "ONLYOFFICE",
    "check" : {
        "url":"/api/2.0/capabilities"
    },
    "editorPage" : "regex:(\/products\/files\/doceditor.aspx)|(\/doceditor)",
    "startPage": "/Products/Files/",
    "cryptoSupport" : "true",
    "icons": {
        "themeLight":{
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
| `check.url` | `/api/2.0/capabilities` | Checks that the entered ONLYOFFICE portal is reachable and exposes the capabilities API. |
| `startPage` | `/Products/Files/` | Opens the Files module immediately after the base portal URL is resolved. |
| `editorPage` | `regex:(\/products\/files\/doceditor.aspx)|(\/doceditor)` | Marks ONLYOFFICE editor routes that Desktop Editors should treat as native document pages. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. When the user adds the portal, Desktop Editors sends a `GET` request to `{portal_url}/api/2.0/capabilities`. A `200 OK` JSON response confirms that the portal matches the built-in ONLYOFFICE provider.
2. Desktop Editors opens the embedded browser at `{portal_url}/Products/Files/`, which is the `startPage` shipped in the current provider config.
3. After the user signs in, a page inside the portal detects `window.AscDesktopEditor` or the `AscDesktopEditor {version}` user agent and registers the cloud with `portal:login`.
4. When the user opens a file and the web route matches `products/files/doceditor.aspx` or `/doceditor`, Desktop Editors treats it as an editor page and opens the document natively.
5. Native editing, co-authoring, and saving continue through the ONLYOFFICE portal services behind that editor route. If the portal updates file state in the embedded browser, it can call `window.DesktopUpdateFile()` to refresh the file list.
6. On disconnect, the portal should call `portal:logout` so Desktop Editors removes the connection and clears cookies for the portal domain.

## Implementing Desktop Editors support

The built-in provider name is `onlyoffice`, so any custom portal page that integrates with Desktop Editors must use that provider id when calling `execCommand`.

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
    provider: "onlyoffice",
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

### The portal is not recognized after entering the URL

Check that `/api/2.0/capabilities` is reachable from the desktop app and returns JSON with HTTP 200. Reverse proxies and SSO gateways often block or rewrite this endpoint.

### The connection is added but documents open in the browser

Verify that the portal eventually navigates to a route matching `products/files/doceditor.aspx` or `/doceditor`, or explicitly calls `open:document`.

### The file list does not refresh after saving

Call `window.DesktopUpdateFile()` after the portal stores the updated file state so the embedded browser refreshes its file view.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../debugging.md).
