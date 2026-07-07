---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Moodle integration

[Moodle](https://moodle.org/) is an open-source learning management system. In the current Desktop Editors build, the built-in Moodle provider can connect to a Moodle portal and hand ONLYOFFICE activity pages over to the native editors when the integration plugin is configured.

## Overview

| **Document operation** | **Supported formats** |
|---|---|
| Editing | DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats |
| Viewing | Over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more |

## Prerequisites

- ONLYOFFICE Desktop Editors **9.4.0** or later.
- A running Moodle instance.
- The [ONLYOFFICE plugin for Moodle](https://github.com/ONLYOFFICE/moodle-mod_onlyofficeeditor) installed and configured.
- ONLYOFFICE Docs deployed and reachable from Moodle and from end-user browsers.
- A Moodle account with access to the course materials or ONLYOFFICE activities you want to open.

## Step 1: Preparing Moodle

1. Install the ONLYOFFICE Moodle plugin in `mod/onlyofficeeditor` using the standard Moodle plugin workflow.
2. Configure the ONLYOFFICE Docs URL and JWT secret in the plugin settings.
3. Verify that users can open ONLYOFFICE document activities in the browser before testing Desktop Editors.

## Step 2: Connecting ONLYOFFICE Desktop Editors to Moodle

1. Launch ONLYOFFICE Desktop Editors.
2. Click **+** next to **Clouds** and select **Moodle**.
3. Enter your Moodle portal URL and click **Connect now**.
4. Sign in to Moodle in the embedded browser.
5. Navigate to the course or activity containing the ONLYOFFICE document.
6. When you open the document activity, Desktop Editors can launch the file in the native editor.

## Configuration

This provider is built in to ONLYOFFICE Desktop Editors, so no manual provider installation is required unless you are customizing the integration.

<Tabs>
  <TabItem value="win" label="Windows">
    ```bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\moodle\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ```bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/moodle/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ```bash
    /opt/onlyoffice/desktopeditors/providers/moodle/
    ```
  </TabItem>
</Tabs>

The provider folder contains a `config.json` file and an `assets/` subfolder with the ready-made icons shipped in the current Desktop Editors distribution.

### config.json

```json
{
    "provider": "moodle",
    "name": "Moodle",
    "check": {
        "url": "/admin/cli/checks.php"
    },
    "editorPage": "/mod/onlyofficeeditor/view.php",
    "editorFrameSize": "finite",
    "cryptoSupport": "true",
    "order": 4,
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
| `check.url` | `/admin/cli/checks.php` | Checks that the target Moodle installation is reachable before the connection is stored. |
| `editorPage` | `/mod/onlyofficeeditor/view.php` | Identifies the Moodle ONLYOFFICE activity page as a document page. |
| `editorFrameSize` | `"finite"` | Present in the shipped provider config for Moodle. Public Desktop Editors docs do not yet describe this flag in detail. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. |
| `order` | `4` | Defines the provider position in the connection dialog. |

### Icons

The current distribution ships the following icon files in `assets/`: `listicon.svg`, `listicon_dark.svg`, `buttonlogo.svg`, and `buttonlogo_dark.svg`. Use `36x36` icons for the connection list and `148x38` icons for the empty-state provider button used in versions below 9.0. Supported formats are `.svg`, `.png`, and `.jpeg`.

## How it works

1. When the user adds a Moodle portal, Desktop Editors sends a `GET` request to `{server_url}/admin/cli/checks.php`.
2. If the check succeeds, the app opens the Moodle portal in the embedded browser and the user signs in normally.
3. Once the user reaches Moodle pages that should appear under **Clouds**, the integration can call `portal:login` with the `moodle` provider id.
4. When the user opens an ONLYOFFICE document activity and the route matches `/mod/onlyofficeeditor/view.php`, Desktop Editors treats that page as an editor entry point and opens the file natively or handles `open:document` if the plugin calls it explicitly.
5. The actual document editing session is still served by ONLYOFFICE Docs configured in Moodle. When the updated file state needs to be reflected in the course page, the integration can call `window.DesktopUpdateFile()`.
6. On disconnect, the portal should call `portal:logout` so the Moodle connection is removed from Desktop Editors.

## Implementing Desktop Editors support

If you adapt the Moodle plugin for Desktop Editors, implement the hooks in the activity pages that users see after signing in, not only in the administration area.

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
    provider: "moodle",
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

### The Moodle portal is not recognized

Check that `/admin/cli/checks.php` is reachable with HTTP 200 from the desktop app and is not blocked by server rules.

### Opening the activity still stays inside the browser

Verify that the ONLYOFFICE activity page uses `/mod/onlyofficeeditor/view.php` or explicitly calls `open:document`.

### The document opens but saving does not return to Moodle

Check the ONLYOFFICE Docs callback settings, JWT secret, and network reachability between Moodle and ONLYOFFICE Docs.

For low-level diagnostics, see [Running Desktop Editors in debug mode](../debugging.md).
