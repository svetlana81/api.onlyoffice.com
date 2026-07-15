# IconButton

A button that displays an icon instead of text.

**Interface**: IIconButton.

## Extra parameters

### iconName

Optional. The icon displayed in the default state. Specify the icon file name from the plugin `assets` folder.

Type: string

Example: `"download-16.png"`

### iconHoverName

Optional. The icon displayed on hover. If not specified, `iconName` is used.

Type: string

Example: `"download-hover-16.png"`

### iconClickName

Optional. The icon displayed on click. If not specified, `iconName` is used.

Type: string

Example: `"download-active-16.png"`

### color

Optional. The icon color in the default state. Use `"accent"` for the accent color or any CSS color value.

Type: string

Example: `"accent"`

### hoverColor

Optional. The icon color on hover. Use `"accent"` for the accent color or any CSS color value.

Type: string

Example: `"#333333"`

### clickColor

Optional. The icon color on click. Use `"accent"` for the accent color or any CSS color value.

Type: string

Example: `"#000000"`

### size

Optional. The icon size in pixels.

Type: number

Example: `16`

### isFill

Optional. Specifies whether the icon is filled.

Type: boolean

Example: `true`

### isStroke

Optional. Specifies whether the icon uses a stroke.

Type: boolean

Example: `false`

### isDisabled

Optional. Specifies whether the button is disabled.

Type: boolean

Example: `false`

### isClickable

Optional. Specifies whether the button is clickable (sets the cursor to pointer).

Type: boolean

Example: `true`

### onClick

Optional. A function called when the button is clicked. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

### id

Optional. The HTML id attribute of the button.

Type: string

Example: `"download-btn"`

### title

Optional. The tooltip text shown on hover (native HTML title attribute).

Type: string

Example: `"Download"`

### tooltipId

Optional. The id of an external tooltip element to use.

Type: string

Example: `"my-tooltip"`

### tooltipContent

Optional. The content of the tooltip.

Type: string

Example: `"Download file"`

### className

Optional. Sets a CSS class name applied to the component. Can be used to override or extend the default component styles.

Type: string

Example: `"my-icon-button"`

## Example

``` ts
import {Actions, type IIconButton, type IMessage} from "@onlyoffice/docspace-plugin-sdk"

const iconButton: IIconButton = {
  iconName: "download-16.png",
  size: 16,
  isClickable: true,
  onClick: () => {
    const message: IMessage = {
      actions: [Actions.showToast],
      toastProps: [{title: "Downloading..."}],
    }
    return message
  },
}
```
