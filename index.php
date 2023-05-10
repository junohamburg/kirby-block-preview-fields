<?php

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
