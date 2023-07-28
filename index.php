<?php

Kirby::plugin('junohamburg/block-preview-fields', [
  'options' => [
    'icon' => true,
    'equalHeightTabs' => true,
    'collapedByDefault' => false, 
  ],
  'api' => [
    'routes' => [
      [
        'pattern' => 'block-preview-fields',
        'action'  => function () {
          // Get options for Vue component
          return [
            'icon' => kirby()->option('junohamburg.block-preview-fields.icon'),
            'equalHeightTabs' => kirby()->option('junohamburg.block-preview-fields.equalHeightTabs'),
            'collapsedByDefault' => kirby()->option('junohamburg.block-preview-fields.collapsedByDefault')
          ];
        }
      ]
    ]
  ]
]);
