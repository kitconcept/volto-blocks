export const Teaser = {
  title: 'Teaser',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'description', 'openLinkInNewTab'],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      title: 'Source',
    },
    description: {
      widget: 'textarea',
      title: 'Description',
    },
    openLinkInNewTab: {
      title: 'Open in a new tab',
      type: 'boolean',
    },
  },

  required: ['source'],
};

export const Image = {
  title: 'Image',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['source', 'description', 'openLinkInNewTab'],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      title: 'Source for image',
    },
    description: {
      widget: 'textarea',
      title: 'Description',
    },
    openLinkInNewTab: {
      title: 'Open in a new tab',
      type: 'boolean',
    },
  },

  required: ['source'],
};

export const UniversalGrid = {
  title: 'Cards',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['cards'],
    },
  ],

  properties: {
    cards: {
      widget: 'universal_grid',
      title: 'Pick cards',
      available_schemas: [Teaser, Image],
      min: 2,
      max: 4,
    },
  },

  required: ['cards'],
};

export default UniversalGrid;
