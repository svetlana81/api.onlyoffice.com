---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nextcloud integration

[Nextcloud](https://nextcloud.com/) is an open-source file hosting platform for storing, sharing, and collaborating on files within your own infrastructure. ONLYOFFICE Desktop Editors connects to a Nextcloud instance via the **ONLYOFFICE app** for Nextcloud, so users can open and edit documents stored in Nextcloud directly in the native desktop application — without a browser.

## Overview

Once connected, ONLYOFFICE Desktop Editors loads the Nextcloud web interface in an embedded browser. When a user opens a document, the application intercepts the request and launches it in the native editor instead of the browser-based one. All file operations — opening, saving, co-editing — are handled through the ONLYOFFICE Docs server configured in the Nextcloud ONLYOFFICE app.

**Supported document formats for editing:** DOCX, XLSX, PPTX, DOCM, XLSM, PPTM, and other Office Open XML formats.

**Supported formats for viewing:** over 50 additional formats, including ODT, ODS, ODP, PDF, TXT, CSV, and more.

## Prerequisites

- ONLYOFFICE Desktop Editors **[version TBD]** or later.
- A running Nextcloud instance with the [ONLYOFFICE app](https://apps.nextcloud.com/apps/onlyoffice) installed and configured.
- ONLYOFFICE Docs (Document Server) deployed and accessible from both the Nextcloud server (for callbacks) and the machine running Desktop Editors (for loading the editor).

## Configuration

Nextcloud ships as a built-in provider in ONLYOFFICE Desktop Editors — no manual setup is required. The provider files are located in the *providers* directory:

<Tabs>
  <TabItem value="win" label="Windows">
    ``` bash
    %ProgramFiles%\ONLYOFFICE\DesktopEditors\providers\nextcloud\
    ```
  </TabItem>
  <TabItem value="mac" label="macOS">
    ``` bash
    /Applications/ONLYOFFICE.app/Contents/Resources/providers/nextcloud/
    ```
  </TabItem>
  <TabItem value="lin" label="Linux">
    ``` bash
    /opt/onlyoffice/desktopeditors/providers/nextcloud/
    ```
  </TabItem>
</Tabs>

The folder contains a *config.json* file and an *assets/* subfolder with provider icons.

### config.json

``` json
{
  "provider": "nextcloud",
  "name": "Nextcloud",
  "check": {
    "url": "status.php"
  },
  "editorPage": "/apps/onlyoffice/",
  "cryptoSupport": "true",
  "order": 2,
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

The Nextcloud-specific values are explained below:

```mdx-code-block
import APITable from '@site/src/components/APITable/APITable';

<APITable>
```

| Parameter | Value | Description |
|---|---|---|
| `check.url` | `status.php` | Standard Nextcloud endpoint that returns instance status as JSON. Desktop Editors sends a `GET` request here to verify that the server is reachable before allowing the user to connect. |
| `editorPage` | `/apps/onlyoffice/` | The relative URL path that indicates a document is being opened through the ONLYOFFICE Nextcloud app. Desktop Editors intercepts navigation to any URL containing this path and opens the document in the native editor. |
| `cryptoSupport` | `"true"` | Enables end-to-end encryption support for this provider. See [Encryption](../encryption/encryption.md). |
| `order` | `2` | Defines the position of this provider in the **Connect to cloud** dialog. |

```mdx-code-block
</APITable>
```

## How it works

The following describes the full technical flow from adding the cloud to saving a document.

### Connecting the cloud

1. The user enters the Nextcloud server URL in Desktop Editors and clicks **Connect**.
2. Desktop Editors sends a `GET` request to `{server_url}/status.php`. A `200 OK` response with a JSON body confirms that the Nextcloud instance is reachable.
3. Desktop Editors opens an embedded Chromium browser at the URL the user entered. Since no `startPage` is defined in the Nextcloud config, the application opens the server root, which is Nextcloud's standard login page.
4. The user logs in through the Nextcloud web interface.
5. After authentication, the ONLYOFFICE app for Nextcloud detects that the page is loaded inside Desktop Editors by checking for the `window.AscDesktopEditor` object or the `AscDesktopEditor {version}` string in `navigator.userAgent`. For details, see [Configuring the interaction](../configuring-the-interaction.md).
6. The ONLYOFFICE app calls the `portal:login` command to register the cloud in Desktop Editors:

   ``` ts
   window.AscDesktopEditor.execCommand("portal:login", JSON.stringify({
     displayName: "John Smith",
     email: "john@example.com",
     domain: "https://nextcloud.example.com",
     provider: "nextcloud",
     uiTheme: "theme-dark",
     userId: "78e1e841",
   }));
   ```

   For the full list of `portal:login` parameters, see [Login and logout](../login-and-logout.md).

7. The Nextcloud instance appears in the **Connected clouds** list.

### Opening a document

8. The user browses their Nextcloud files in the embedded browser and clicks to open a document.
9. The ONLYOFFICE Nextcloud app checks for `window.AscDesktopEditor` and, instead of loading the browser-based editor, calls the `open:document` command:

   ``` ts
   window.AscDesktopEditor.execCommand("open:document", JSON.stringify({
     url: "https://nextcloud.example.com/apps/onlyoffice/12345/",
     type: "word",
     provider: "nextcloud",
   }));
   ```

   Alternatively, the app may use `window.open()` with a URL that contains the `editorPage` path — Desktop Editors intercepts the call and opens the document natively.

10. Desktop Editors opens the document in its native editor. The editor is loaded from the ONLYOFFICE Docs server configured in the Nextcloud ONLYOFFICE app settings.

### Saving a document

11. When the user saves the document or closes the editor, ONLYOFFICE Docs sends a POST callback request to the Nextcloud ONLYOFFICE app with the document status and a download URL for the updated file.
12. The Nextcloud ONLYOFFICE app downloads the updated file and saves it to Nextcloud storage.
13. To notify the Desktop Editors interface that the file has been updated, the app calls:

    ``` ts
    window.DesktopUpdateFile();
    ```

14. Desktop Editors refreshes the file browser to reflect the latest version.

### Logging out

15. When the user disconnects the cloud, the ONLYOFFICE Nextcloud app calls `portal:logout`:

    ``` ts
    window.AscDesktopEditor.execCommand("portal:logout", JSON.stringify({
      domain: "https://nextcloud.example.com",
    }));
    ```

16. The cloud is removed from **Connected clouds** and all session cookies for the domain are cleared.

## Implementing Desktop Editors support

If you are building a custom integration or extending the ONLYOFFICE app for Nextcloud, implement the following JavaScript integration points on the Nextcloud side. Desktop Editors exposes two detection methods:

- **User agent check:** `navigator.userAgent` contains `AscDesktopEditor {version}` (e.g., `AscDesktopEditor 8.1.0`).
- **JavaScript object check:** `window.AscDesktopEditor` is defined on all pages loaded inside Desktop Editors.

The recommended detection pattern is:

``` ts
if (window.AscDesktopEditor) {
  // running inside ONLYOFFICE Desktop Editors
  window.AscDesktopEditor.execCommand("portal:login", JSON.stringify({ /* ... */ }));
}
```

| Integration point | When to call | Purpose |
|---|---|---|
| `portal:login` | On every page accessible after user login | Registers the cloud in Desktop Editors |
| `open:document` | When user opens a document | Launches the document in the native editor |
| `window.DesktopUpdateFile()` | After the file is saved to Nextcloud storage | Updates the file browser in Desktop Editors |
| `portal:logout` | On session end or disconnect | Removes the cloud and clears cookies |
| `portal:uitheme` | When the Nextcloud UI theme changes | Synchronizes the editor color theme |

For details on each command, see [execCommand method](../execcommand.md).

## Troubleshooting

**The Nextcloud instance is not recognized when entering the URL.**
Check that `status.php` is accessible at the root of your Nextcloud domain and returns `HTTP 200` with a JSON body. Some reverse proxy configurations may intercept or redirect this endpoint.

**The cloud appears in Connected clouds but documents open in the browser instead of the native editor.**
Verify that the ONLYOFFICE app for Nextcloud is installed and active. The app must detect `window.AscDesktopEditor` and call `open:document`. Also confirm that the `editorPage` value in *config.json* matches the actual URL path the ONLYOFFICE app uses.

**Co-editing does not work.**
ONLYOFFICE Docs must be reachable both from the Nextcloud server (for save callbacks) and from the user's machine (for the editor to load). Check firewall rules and the ONLYOFFICE Docs URL configured in the Nextcloud admin panel under **Settings → ONLYOFFICE**.

**The editor theme does not match the Nextcloud theme.**
The ONLYOFFICE Nextcloud app must call `portal:uitheme` when it detects a theme change. See [Changing a theme](../changing-a-theme.md).

**The file browser does not refresh after saving.**
Ensure that `window.DesktopUpdateFile` is called by the ONLYOFFICE Nextcloud app after a successful save. See [Sending notifications](../sending-notifications.md).
