<?php

use Kirby\Cms\App as Kirby;

// Validate Kirby version
if (
  version_compare(Kirby::version() ?? '0.0.0', '3.6.0', '<') === true ||
  version_compare(Kirby::version() ?? '0.0.0', '3.11.0', '>=') === true
) {
  throw new Exception('The block preview fields plugin supports Kirby 3.6.0 to 3.10.x');
}

Kirby::plugin('junohamburg/block-preview-fields', [
  'options' => [
    'icon' => true,
    'equalHeightTabs' => true,
  ],
  'api' => [
    'routes' => [
      [
        'pattern' => 'block-preview-fields',
        'action'  => function () {
          // Get options for Vue component
          return [
            'icon' => kirby()->option('junohamburg.block-preview-fields.icon'),
            'equalHeightTabs' => kirby()->option('junohamburg.block-preview-fields.equalHeightTabs')
          ];
        }
      ]
    ]
  ]
]);
