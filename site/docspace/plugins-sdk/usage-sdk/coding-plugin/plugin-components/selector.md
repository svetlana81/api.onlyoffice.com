# Selector

A component for selecting files, folders, rooms, users, or groups. Five selector types are available: **Base**, **Files**, **Groups**, **People**, **Room**.

**Types**: TBaseSelector, TFilesSelector, TGroupsSelector, TPeopleSelector, TRoomSelector.

To control the selector, use the following actions in the [IMessage](../plugin-message.md) response:

- **Actions.showSelector** - opens the selector with `selectorProps`.
- **Actions.updateSelector** - updates the currently open selector with `selectorProps`.
- **Actions.closeSelector** - closes the selector.

The `selectorProps` passed in `IMessage` has the following structure:

``` ts
{
  type: SelectorType,  // one of: Base, Files, Groups, People, Room
  props: TBaseSelector | TFilesSelector | TGroupsSelector | TPeopleSelector | TRoomSelector,
}
```

To set the selector type, use [SelectorType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Selector.ts): *Base, Files, Groups, People, Room*.

To set the room type, use [RoomsType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Rooms.ts): *PublicRoom, FormRoom, EditingRoom, VirtualDataRoom, CustomRoom*.

To set the room search area, use [RoomSearchArea](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Rooms.ts): *Any, Active, Archive, Templates*.

:::note
Only the parameters below are truly shared by all five selector types. Each type extends them with its own set of extra parameters — a parameter documented for one type (e.g. `submitButtonLabel` for Files) is not necessarily available on another (e.g. Groups). See each type's own section for its exact parameter list.
:::

---

## Common parameters

The following parameters are shared across all selector types.

### id {#common-id}

Optional. A unique identifier for the selector component.

Type: string

Example: `"my-selector"`

### className

Optional. Sets a CSS class name applied to the selector.

Type: string

Example: `"my-selector-class"`

### withHeader {#common-withheader}

Optional. Specifies whether to display the header.

Type: boolean

Example: `true`

### headerProps {#common-headerprops}

Optional. Configuration of the selector header.

Type: object

| Name | Type | Description |
|---|---|---|
| label | string | The title text in the header. |
| isCloseable | boolean | Optional. Specifies whether to show a close button. |
| onCloseClick | func | Optional. A function called when the close button is clicked. |
| withBackButton | boolean | Optional. Specifies whether to show a back button. |
| onBackClick | func | Optional. A function called when the back button is clicked. |

### onLoad {#common-onload}

Optional. A function called when the selector is mounted. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### onClose {#common-onclose}

Optional. A function called when the selector is closed. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

---

## Base selector parameters

Used with `SelectorType.Base`. In addition to [common parameters](#common-parameters), it has the following:

### isLoading

Optional. Specifies whether to show a loading indicator for the entire selector.

Type: boolean

Example: `false`

### items {#base-items}

The list of items to display. Each item has a required `label` and optional `id`. See [Item parameters](#item-parameters).

Type: TSelectorItem[]

Example: `[{id: "1", label: "Report.pdf"}]`

### hasNextPage

Optional. Specifies whether more items are available on subsequent pages.

Type: boolean

Example: `true`

### isNextPageLoading

Optional. Specifies whether the next page is currently loading.

Type: boolean

Example: `false`

### onLoadNextPage

Optional. A function called to load the next page of items. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### totalItems

Optional. The total number of items available.

Type: number

Example: `42`

### withBreadCrumbs {#base-withbreadcrumbs}

Optional. Specifies whether to display breadcrumb navigation.

Type: boolean

Example: `true`

### breadCrumbs

Optional. The breadcrumb items to display. Each item has a required `id`, a required `label`, and an optional `isRoom`.

Type: TBreadCrumbItem[]

Example: `[{id: "root", label: "My Files"}]`

### isBreadCrumbsLoading

Optional. Specifies whether the breadcrumbs are loading.

Type: boolean

Example: `false`

### onSelectBreadCrumb

Optional. A function called when the user clicks a breadcrumb item. Receives the breadcrumb `id`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `(id) => {}`

### withCancelButton {#base-withcancelbutton}

Optional. Specifies whether to display a cancel button.

Type: boolean

Example: `true`

### cancelButtonLabel {#base-cancelbuttonlabel}

Optional. The label of the cancel button.

Type: string

Example: `"Cancel"`

### onCancel {#base-oncancel}

Optional. A function called when the user clicks the cancel button. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### submitButtonLabel {#base-submitbuttonlabel}

The label of the submit button.

Type: string

Example: `"Select"`

### disabledSubmitButton {#base-disabledsubmitbutton}

Optional. Specifies whether the submit button is disabled.

Type: boolean

Example: `false`

### onSubmit {#base-onsubmit}

A function called when the user clicks the submit button. Receives `selectedIds`, `fileName`, and `isFooterCheckboxChecked`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `({selectedIds}) => {}`

### withCheckbox

Optional. Specifies whether to display a checkbox in the footer.

Type: boolean

Example: `false`

### footerCheckboxLabel {#base-footercheckboxlabel}

Optional. The label of the footer checkbox.

Type: string

Example: `"Apply to all files"`

### isChecked

Optional. The initial checked state of the footer checkbox.

Type: boolean

Example: `false`

### isMultiSelect {#base-ismultiselect}

Optional. Specifies whether multiple items can be selected.

Type: boolean

Example: `true`

### maxSelectedItems

Optional. The maximum number of items that can be selected.

Type: number

Example: `5`

### selectedItems

Optional. The initially selected items.

Type: TSelectorItem[]

Example: `[{id: "1", label: "Report.pdf"}]`

### onSelect {#base-onselect}

Optional. A function called when an item is selected. Receives `selectedId` and `isDoubleClick`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `({selectedId, isDoubleClick}) => {}`

### emptyScreenHeader {#base-emptyscreenheader}

Optional. The header text displayed when there are no items.

Type: string

Example: `"No files found"`

### emptyScreenDescription {#base-emptyscreendescription}

Optional. The description text displayed when there are no items.

Type: string

Example: `"Upload files to get started"`

### searchEmptyScreenHeader

Optional. The header text displayed when a search yields no results.

Type: string

Example: `"No results found"`

### searchEmptyScreenDescription

Optional. The description text displayed when a search yields no results.

Type: string

Example: `"Try a different search query"`

### descriptionText {#base-descriptiontext}

Optional. A descriptive text displayed inside the selector.

Type: string

Example: `"Select a destination folder"`

---

## Files selector parameters

Used with `SelectorType.Files`. In addition to [common parameters](#common-parameters), it has the following:

### withSearch {#files-withsearch}

Optional. Specifies whether to display a search input field.

Type: boolean

Example: `true`

### withCreate {#files-withcreate}

Optional. Specifies whether to allow creating new items from the selector.

Type: boolean

Example: `false`

### withCancelButton {#files-withcancelbutton}

Optional. Specifies whether to display a cancel button.

Type: boolean

Example: `true`

### cancelButtonLabel {#files-cancelbuttonlabel}

Optional. The label of the cancel button.

Type: string

Example: `"Cancel"`

### onCancel {#files-oncancel}

Optional. A function called when the user clicks the cancel button. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### submitButtonLabel {#files-submitbuttonlabel}

The label of the submit button.

Type: string

Example: `"Save"`

### isMultiSelect {#files-ismultiselect}

Optional. Specifies whether multiple items can be selected.

Type: boolean

Example: `false`

### withBreadCrumbs {#files-withbreadcrumbs}

Optional. Specifies whether to display breadcrumb navigation (a simple on/off flag; unlike the Base selector, the Files selector does not expose the `breadCrumbs` list, loading state, or click handler as separate parameters).

Type: boolean

Example: `true`

### currentFolderId

Optional. The id of the folder to open initially.

Type: string | number

Example: `"folder-123"`

### isRoomsOnly

Optional. Specifies whether to display only rooms.

Type: boolean

Example: `false`

### openRoot

Optional. Specifies whether to open the root folder initially.

Type: boolean

Example: `true`

### descriptionText {#files-descriptiontext}

Optional. A descriptive text displayed inside the selector.

Type: string

Example: `"Select a destination folder"`

### withFooterInput

Optional. Specifies whether to show an input field in the footer.

Type: boolean

Example: `true`

### footerInputHeader

Optional. The label for the footer input field.

Type: string

Example: `"File name"`

### currentFooterInputValue

Optional. The initial value of the footer input field.

Type: string

Example: `"New document"`

### withFooterCheckbox

Optional. Specifies whether to show a checkbox in the footer.

Type: boolean

Example: `false`

### footerCheckboxLabel {#files-footercheckboxlabel}

Optional. The label of the footer checkbox.

Type: string

Example: `"Apply to all files"`

### filterParam

Optional. Restricts which files and folders are shown in the selector. Use [FilterType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Utility.ts): *None, FilesOnly, FoldersOnly, DocumentsOnly, PresentationsOnly, SpreadsheetsOnly, ImagesOnly*.

Type: FilterType

Example: `FilterType.DocumentsOnly`

### getIsDisabled

A function that determines whether the submit button should be disabled based on the current selection state. Receives an object with `selectedItemId`, optional `selectedItemType` (`"rooms"` or `"files"`), optional `selectedItemSecurity`, `selectedFileInfo`, `isFirstLoad`, optional `isDisabledFolder`, and `isRoot`.

Type: func

Example: `(params) => false`

### onSubmit {#files-onsubmit}

Optional. A function called when the user clicks the submit button. Unlike the [Base selector's `onSubmit`](#base-onsubmit), the Files selector passes its own parameter shape: `selectedItemId`, `folderTitle`, `fileName`, `isChecked`, `selectedFileInfo` (an object with `id`, `title`, and optional `fileExst`, or `null`), and optional `breadCrumbs`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `({selectedItemId, fileName}) => {}`

### onSelect {#files-onselect}

Optional. A function called when an item is selected. Unlike the [Base selector's `onSelect`](#base-onselect), the Files selector passes only the selected item's `id` (or `undefined`), not an object with `selectedId`/`isDoubleClick`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `(id) => {}`

---

## Room selector parameters

Used with `SelectorType.Room`. In addition to [common parameters](#common-parameters), it has the following:

### withSearch {#room-withsearch}

Optional. Specifies whether to display a search input field.

Type: boolean

Example: `true`

### withCreate {#room-withcreate}

Optional. Specifies whether to allow creating new items from the selector.

Type: boolean

Example: `false`

### withCancelButton {#room-withcancelbutton}

Optional. Specifies whether to display a cancel button.

Type: boolean

Example: `true`

### cancelButtonLabel {#room-cancelbuttonlabel}

Optional. The label of the cancel button.

Type: string

Example: `"Cancel"`

### onCancel {#room-oncancel}

Optional. A function called when the user clicks the cancel button. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### submitButtonLabel {#room-submitbuttonlabel}

The label of the submit button.

Type: string

Example: `"Select"`

### isMultiSelect {#room-ismultiselect}

Optional. Specifies whether multiple rooms can be selected.

Type: boolean

Example: `true`

### emptyScreenHeader {#room-emptyscreenheader}

Optional. The header text displayed when there are no rooms.

Type: string

Example: `"No rooms found"`

### emptyScreenDescription {#room-emptyscreendescription}

Optional. The description text displayed when there are no rooms.

Type: string

Example: `"Create a room to get started"`

### roomType

Optional. The type(s) of rooms to display.

Type: [RoomsType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Rooms.ts) | RoomsType[]

Example: `RoomsType.EditingRoom`

### searchArea

Optional. The area to search for rooms.

Type: [RoomSearchArea](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Rooms.ts)

Example: `RoomSearchArea.Active`

### excludeItems {#room-excludeitems}

Optional. Room ids to exclude from the list.

Type: (number | string | undefined)[]

Example: `["room-1", "room-2"]`

### createDefineRoomLabel

Optional. The label for the "create new room" option.

Type: string

Example: `"Create room"`

### createDefineRoomType

Optional. The default type for newly created rooms.

Type: [RoomsType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Rooms.ts)

Example: `RoomsType.CustomRoom`

### onSubmit {#room-onsubmit}

Optional. A function called when the user clicks the submit button. Unlike the [Base selector's `onSubmit`](#base-onsubmit), the Room selector receives the selected ids directly as an array argument, not an object with a `selectedIds` property.

Type: func

Example: `(selectedIds) => {}`

---

## People selector parameters

Used with `SelectorType.People`. In addition to [common parameters](#common-parameters), it has the following:

### withCancelButton {#people-withcancelbutton}

Optional. Specifies whether to display a cancel button.

Type: boolean

Example: `true`

### cancelButtonLabel {#people-cancelbuttonlabel}

Optional. The label of the cancel button.

Type: string

Example: `"Cancel"`

### onCancel {#people-oncancel}

Optional. A function called when the user clicks the cancel button. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### submitButtonLabel {#people-submitbuttonlabel}

The label of the submit button.

Type: string

Example: `"Select"`

### disabledSubmitButton {#people-disabledsubmitbutton}

Optional. Specifies whether the submit button is disabled.

Type: boolean

Example: `false`

### onSubmit {#people-onsubmit}

A function called when the user clicks the submit button. Receives `selectedIds`, `fileName`, and `isFooterCheckboxChecked`, same as the [Base selector's `onSubmit`](#base-onsubmit). This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `({selectedIds}) => {}`

### emptyScreenHeader {#people-emptyscreenheader}

Optional. The header text displayed when there are no users or groups.

Type: string

Example: `"No users found"`

### emptyScreenDescription {#people-emptyscreendescription}

Optional. The description text displayed when there are no users or groups.

Type: string

Example: `"Invite users to get started"`

### targetEntityType

Optional. The type of entity for which the user is being selected (e.g. for sharing a file).

Type: "file" | "folder" | "room"

Example: `"file"`

### withGroups

Optional. Specifies whether to include groups in the selector.

Type: boolean

Example: `true`

### isGroupsOnly

Optional. Specifies whether to display only groups.

Type: boolean

Example: `false`

### withGuests

Optional. Specifies whether to include guest users.

Type: boolean

Example: `false`

### isGuestsOnly

Optional. Specifies whether to display only guest users.

Type: boolean

Example: `false`

### isMultiSelect {#people-ismultiselect}

Optional. Specifies whether multiple users and/or groups can be selected.

Type: boolean

Example: `true`

### currentUserId

Optional. The id of the current user to exclude from the list.

Type: string

Example: `"user-123"`

### excludeItems {#people-excludeitems}

Optional. User or group ids to exclude from the list.

Type: string[]

Example: `["user-1", "group-2"]`

### disableInvitedUsers

Optional. Ids of already invited users to show as disabled.

Type: string[]

Example: `["user-3"]`

### disableDisabledUsers

Optional. Specifies whether to hide users with a "disabled" status from the list.

Type: boolean

Example: `false`

### roomId

Optional. The id of the room the selector is related to.

Type: string | number

Example: `"room-456"`

### alwaysShowFooter

Optional. Specifies whether the footer is always visible, even when nothing is selected.

Type: boolean

Example: `true`

### onlyRoomMembers

Optional. Specifies whether to display only members of the current room.

Type: boolean

Example: `false`

---

## Groups selector parameters

Used with `SelectorType.Groups`. This is the most minimal selector type: besides [common parameters](#common-parameters), it only adds its own `onSubmit` — it has no cancel button, no submit button label, no multi-select, breadcrumb, or empty-screen parameters.

### onSubmit {#groups-onsubmit}

A function called when the user clicks the submit button. Receives `selectedIds`, and optional `fileName` and `isFooterCheckboxChecked`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `({selectedIds}) => {}`

---

## Item parameters

Each item in the `items` array is a `TSelectorItem` object with the following properties:

### label

The display text for the item.

Type: string

Example: `"Report.pdf"`

### id {#item-id}

Optional. A unique identifier for the item.

Type: string | number

Example: `"file-123"`

### icon

Optional. The URL or path to the item icon.

Type: string

Example: `"https://example.com/icon.svg"`

### fileExst

Optional. The file extension of the item, when it represents a file.

Type: [FilesExst](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Files.ts) | string

Example: `FilesExst.pdf`

### fileType

Optional. The general file type of the item, when it represents a file.

Type: [FilesType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Files.ts)

Example: `FilesType.file`

### security

Optional. The security or access level of the item, when it represents a file.

Type: [FilesSecurity](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/enums/Files.ts)

Example: `FilesSecurity.Edit`

### isInputItem

Optional. Specifies whether to render this item as an inline input field.

Type: boolean

Example: `true`

### defaultInputValue

Optional. The default value shown in the input field when `isInputItem` is `true`.

Type: string

Example: `"New folder"`

### onAcceptInput

Optional. A function called when the user confirms the input value. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `(value) => {}`

### onCancelInput

Optional. A function called when the user cancels the input. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### isCreateNewItem

Optional. Specifies whether to render this item as a "create new" button.

Type: boolean

Example: `true`

### onCreateClick

Optional. A function called when the user clicks the "create new" item. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

---

## Example

``` ts
import {Actions, SelectorType, type IMessage, type TBaseSelector} from "@onlyoffice/docspace-plugin-sdk"

const selectorProps: TBaseSelector = {
  withHeader: true,
  headerProps: {
    label: "Select destination",
    isCloseable: true,
    onCloseClick: () => {
      const message: IMessage = {actions: [Actions.closeSelector]}
      return message
    },
  },
  items: [
    {id: "folder-1", label: "Documents"},
    {id: "folder-2", label: "Images"},
  ],
  submitButtonLabel: "Select",
  onSubmit: ({selectedIds}) => {
    const message: IMessage = {
      actions: [Actions.closeSelector],
    }
    return message
  },
  withCancelButton: true,
  cancelButtonLabel: "Cancel",
  onCancel: () => {
    const message: IMessage = {actions: [Actions.closeSelector]}
    return message
  },
}

// Open the selector
const openMessage: IMessage = {
  actions: [Actions.showSelector],
  selectorProps: {
    type: SelectorType.Base,
    props: selectorProps,
  },
}
```
