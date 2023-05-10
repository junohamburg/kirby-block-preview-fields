# Kirby Block Preview Fields
This plugin for Kirby 3 displays the block fields directly in the block preview, including tabs.

![Block Preview Fields](https://github.com/junohamburg/kirby-block-preview-fields/assets/77532479/39e559e4-f342-4110-b915-fcaf5fa5e095)

Inspired by the [Kirby Fields Block](https://github.com/jongacnik/kirby-fields-block), but this block preview **supports tabs** and the design aligns more closely with the Kirby UI.

## Installation

### Download

Download and copy this repository to `/site/plugins/kirby-block-preview-fields`.

### Git submodule

```
git submodule add https://github.com/junohamburg/kirby-block-preview-fields.git site/plugins/kirby-block-preview-fields
```

### Composer

```
composer require junohamburg/kirby-block-preview-fields
```

## Setup

In your custom block blueprint:

1. Add `preview: fields` to display the block fields.
2. Add `wysiwyg: true` to prevent the drawer from opening automatically after creating a new block.

Example: **site/blueprints/blocks/custom-block.yml**

```yml
name: Block Name
preview: fields
wysiwyg: true
tabs:
  content:
    label: Content
    fields:
      ...
  settings:
    label: Settings
    fields:
      ...
```

## Available options

1. **Hide block icons**. This is helpful if you are using our [Kirby Visual Block Selector](https://github.com/junohamburg/kirby-visual-block-selector).
2. **Disable equal height tabs**. By default, the largest tab sets the overall height, so there are no jumps when switching between tabs.

**site/config/config.php**

```php
<?php

return [
  'junohamburg.block-preview-fields' => [
    'icon' => false, // default: true
    'equalHeightTabs' => false // default: true
  ],
];
```

Please note: These options apply to all block previews. It is currently not possible / very difficult to add custom options to block previews.

## Known issues

1. This block preview uses the `angle-down` icon to expand a collapsed block preview. The Kirby `layout` field uses the `angle-down` icon to open a dropdown with options.

## License

MIT

## Credits

- [JUNO](https://juno-hamburg.com)
