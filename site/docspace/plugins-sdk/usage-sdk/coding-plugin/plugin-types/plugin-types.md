---
sidebar_position: -5
---

# Types

The following plugin types can be distinguished:

| Type                                                | Interface            | Description                                                                                           |
| --------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------- |
| [Plugin](plugin.md)                           | IPlugin              | The default plugin. This interface is required.                                                       |
| [ArticleButtonPlugin](articlebuttonplugin.md) | IArticleButtonPlugin | The plugin that adds custom button items to the article sidebar.                                       |
| [PostMessagePlugin](postmessageplugin.md)     | IPostMessagePlugin   | The plugin that handles messages received from an IFrame component via the browser `postMessage` API.  |
| [SettingsPlugin](settingsplugin.md)           | ISettingsPlugin      | The plugin that manages settings for the administrator or owner.                                      |
| [APIPlugin](apiplugin.md)                     | IApiPlugin           | The plugin that is provided with the origin, proxy, and prefix to make requests to the portal server. |
| [ContextMenuPlugin](contextmenuplugin.md)     | IContextMenuPlugin   | The plugin that is embedded in the context menu of files, folders, rooms, images, video (audio).      |
| [InfoPanelPlugin](infopanelplugin.md)         | IInfoPanelPlugin     | The plugin that is embedded as a separate tab in the file info panel.                                 |
| [MainButtonPlugin](mainbuttonplugin.md)       | IMainButtonPlugin    | The plugin that is embedded in the main button.                                                       |
| [ProfileMenuPlugin](profilemenuplugin.md)     | IProfileMenuPlugin   | The plugin that is embedded in the profile menu.                                                      |
| [EventListenerPlugin](eventlistenerplugin.md) | IEventListenerPlugin | The plugin that is given the access to the portal events.                                             |
| [FilePlugin](fileplugin.md)                   | IFilePlugin          | The plugin that can interact with the file list.                                                      |
