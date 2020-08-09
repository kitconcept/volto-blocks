const Teaser = {
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

export default Teaser;
