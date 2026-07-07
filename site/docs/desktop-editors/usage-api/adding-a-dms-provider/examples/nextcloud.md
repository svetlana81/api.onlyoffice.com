---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nextcloud integration

[Nextcloud](https://nextcloud.com/) is an open-source file hosting platform for storing, sharing, and collaborating on files within your own infrastructure. By connecting ONLYOFFICE Desktop Editors to a Nextcloud instance via the ONLYOFFICE app, users can open and edit documents stored in Nextcloud directly in the native desktop application.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A running Nextcloud instance.
- The [ONLYOFFICE app](https://apps.nextcloud.com/apps/onlyoffice) installed and configured in Nextcloud.
- ONLYOFFICE Docs deployed and reachable both from the Nextcloud server and from the user's machine.

## Step 1: Preparing Nextcloud

1. Log in to your Nextcloud instance as an administrator.
2. Open the app catalog and install the **ONLYOFFICE** app.
3. Configure the ONLYOFFICE Docs URL and JWT settings in the Nextcloud ONLYOFFICE app page if required by your deployment.

## Step 2: Connecting ONLYOFFICE Desktop Editors to Nextcloud

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and select **Nextcloud**.
3. Enter your Nextcloud server address in **Cloud office URL**.
4. Click **Connect now**.
5. Sign in on the Nextcloud login page in the embedded browser.
6. After authentication, the Nextcloud files area opens and the connection appears under **Clouds**.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\nextcloud\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/nextcloud/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/nextcloud/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
    "provider": "nextcloud",
    "name": "Nextcloud",
    "check": {
        "url": "status.php"
    },
    "editorPage" : "/apps/onlyoffice/",
    "cryptoSupport" : "true",
    "order": 2,
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
| `check.url` | `status.php` | Checks that the target server is a reachable Nextcloud instance before Desktop Editors stores the connection. |
| `editorPage` | `/apps/onlyoffice/` | Marks the ONLYOFFICE app route that Desktop Editors should intercept as a document page. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |
| `order` | `2` | Defines the provider position in the **Connect to cloud** dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. Desktop Editors sends a `GET` request to `{server_url}/status.php`. A `200 OK` JSON response confirms that the server matches the built-in Nextcloud provider.
2. The app opens an embedded Chromium browser at the server URL. Because no `startPage` is defined, Nextcloud's normal login flow is used.
3. After the user signs in, the Nextcloud ONLYOFFICE app can detect `window.AscDesktopEditor` or the Desktop Editors user agent and call `portal:login` to register the cloud.
4. When the user opens a file through the ONLYOFFICE app and the route contains `/apps/onlyoffice/`, Desktop Editors intercepts the navigation or handles an explicit `open:document` call and launches the document natively.
5. The actual editor session is loaded by the ONLYOFFICE Docs server configured in the Nextcloud app. Save callbacks return to Nextcloud, which stores the updated file and can call `window.DesktopUpdateFile()` to refresh the browser pane.
6. When the user disconnects the cloud, the portal should call `portal:logout` so the connection is removed and the session cookies are cleared.

## Implementing Desktop Editors support

Implement the Desktop Editors hooks inside the pages served by the Nextcloud ONLYOFFICE app, not only on the root login page.

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
    provider: "nextcloud",
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

### The Nextcloud URL is rejected

Check that `status.php` is reachable at the root of the instance and is not blocked by a reverse proxy or redirect rule.

### The cloud connects but documents still open in the browser

Verify that the ONLYOFFICE app is installed and that its editor pages use `/apps/onlyoffice/` or call `open:document`.

### Co-editing or saving fails

Make sure ONLYOFFICE Docs is reachable both from Nextcloud and from end-user machines, and verify the callback/JWT settings in the app configuration.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../debugging.md).
