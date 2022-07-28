/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes: {
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   }
 * }
 */
import { SimpleColorPicker } from '@kitconcept/volto-blocks/components';
import AccordionSchemaEnhancer from '@kitconcept/volto-blocks/components/Accordion/schemaEnhancer';

import { insertInArray } from '@kitconcept/volto-blocks/helpers';

const serverConfig =
  typeof __SERVER__ !== 'undefined' && __SERVER__
    ? require('./server').default
    : false;

const newTeasersGroup = { id: 'teasers', title: 'Teasers' };
const customGroupBlocksOrder = (defaultGroups) =>
  insertInArray(defaultGroups, newTeasersGroup, 2);

// Schema extender example, a function with schema => schema signature
// It might take a second and third argument props and int, if required
// const schemaExtender = (schema) => {
//   schema.properties.newfield = {
//     title: 'new field',
//   };
//   schema.fieldsets[0].fields.push('newfield');
//   return schema;
// };

export default (config) => {
  config.widgets.widget.style_simple_color = SimpleColorPicker;

  if (config.blocks.blocksConfig.accordion) {
    config.blocks.blocksConfig.accordion.schemaEnhancer = AccordionSchemaEnhancer;
  }

  if (serverConfig) {
    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      ...serverConfig,
    ];
  }

  config.blocks.groupBlocksOrder = customGroupBlocksOrder(
    config.blocks.groupBlocksOrder,
  );

  return config;
};
