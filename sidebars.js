// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introducao: [
    {
      type: 'category',
      label: 'Introdução',
      collapsed: false,
      items: [
        'introducao/intro',
        'introducao/history-and-architecture',
        'introducao/new-architecture',
        'introducao/choose-your-track',
      ],
    },
  ],

  trilhaNativo: [
    {
      type: 'category',
      label: 'Fundamentos',
      collapsed: false,
      items: [
        'trilha-nativo/modulo-fundamentos/js-ts-overview',
        'trilha-nativo/modulo-fundamentos/js-fundamentals',
        'trilha-nativo/modulo-fundamentos/typescript',
        'trilha-nativo/modulo-fundamentos/react-fundamentals',
        'trilha-nativo/modulo-fundamentos/components-and-props',
        'trilha-nativo/modulo-fundamentos/state-and-hooks',
        'trilha-nativo/modulo-fundamentos/rn-core-components',
        'trilha-nativo/modulo-fundamentos/layout-and-flexbox',
        'trilha-nativo/modulo-fundamentos/styling',
      ],
    },
  ],

  trilhaWeb: [
    {
      type: 'category',
      label: 'Fundamentos',
      collapsed: false,
      items: [
        'trilha-web/modulo-fundamentos/adaptando-js-ts',
        'trilha-web/modulo-fundamentos/typescript',
        'trilha-web/modulo-fundamentos/web-vs-rn',
        'trilha-web/modulo-fundamentos/sem-dom-sem-css',
        'trilha-web/modulo-fundamentos/componentes-nativos',
        'trilha-web/modulo-fundamentos/estilos-flexbox',
        'trilha-web/modulo-fundamentos/listas-navegacao',
      ],
    },
  ],
};

module.exports = sidebars;
