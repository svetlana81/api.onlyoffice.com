# Link

A text link component. Extends [IText](./text.md).

**Interface**: ILink.

See the parameters of this component in [storybook](https://storybook.onlyoffice.io/?path=/docs/components-link--docs).

To set the link type, use [LinkType](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/components/ILink.ts) (*page, action*).

To set the link target, use [LinkTarget](https://github.com/ONLYOFFICE/docspace-plugin-sdk/blob/master/src/interfaces/components/ILink.ts) (*blank, self, parent, top*).

## Extra parameters

### href

Optional. The URL the link points to.

Type: string

Example: `"https://example.com"`

### id

Optional. The HTML id attribute of the link.

Type: string

Example: `"my-link"`

### isHovered

Optional. Specifies whether the link is in the hovered state.

Type: boolean

Example: `false`

### isTextOverflow

Optional. Specifies whether to truncate the link text with an ellipsis when it overflows.

Type: boolean

Example: `true`

### noHover

Optional. Specifies whether to disable the hover style.

Type: boolean

Example: `false`

### enableUserSelect

Optional. Specifies whether the link text is user-selectable.

Type: boolean

Example: `true`

### type

Optional. The link type. Can be *page* (navigates to a URL) or *action* (triggers a callback).

Type: LinkType

Example: `LinkType.page`

### target

Optional. The link target. Can be *blank*, *self*, *parent*, or *top*.

Type: LinkTarget

Example: `LinkTarget.blank`

### textDecoration

Optional. The CSS text-decoration style. Can be: *none*, *underline*, *line-through*, *overline*, *underline dotted*, *underline dashed*.

Type: string

Example: `"underline"`

### onClick

Optional. A function called when the link is clicked. Typically used with `LinkType.action`. This function can be asynchronous and can return `IMessage`, `Promise<IMessage>`, or `Promise<void>`.

Type: func

Example: `() => {}`

## Example

``` ts
import {LinkTarget, LinkType, type ILink} from "@onlyoffice/docspace-plugin-sdk"

const link: ILink = {
  text: "Learn more",
  href: "https://example.com",
  type: LinkType.page,
  target: LinkTarget.blank,
  isTextOverflow: true,
}
```
