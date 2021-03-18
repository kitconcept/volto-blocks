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
import {
  ImagesGridIconsVariation,
  withStyleWrapper,
  SimpleColorPicker,
  CarouselEditBlock,
  CarouselViewBlock,
  ObjectListWidget,
  SliderEditBlock,
  SliderViewBlock,
  TeaserGridEditBlock,
  TeaserGridViewBlock,
  ImagesGridEditBlock,
  ImagesGridViewBlock,
  TeaserHeroViewBlock,
  TeaserHeroEditBlock,
  ListingGridEditBlock,
  ListingGridViewBlock,
  HighlightSliderViewBlock,
  HighlightSliderEditBlock,
  TextPillEditBlock,
  TextPillViewBlock,
  ObjectByType,
  ButtonViewBlock,
  ButtonEditBlock,
  QuerystringSidebarWidget,
} from '@kitconcept/volto-blocks/components';
import { ImagesGridIconsVariationSchemaExtender } from '@kitconcept/volto-blocks/components/ImagesGrid/schema';

import { insertInArray } from '@kitconcept/volto-blocks/helpers';

import textSVG from '@plone/volto/icons/subtext.svg';
import sliderSVG from '@plone/volto/icons/slider.svg';
import imagesSVG from '@plone/volto/icons/images.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import CircleMenuSVG from '@plone/volto/icons/circle-menu.svg';

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

const customBlocks = {
  carousel: {
    id: 'carousel',
    title: 'Carousel',
    icon: imagesSVG,
    group: 'common',
    view: withStyleWrapper(CarouselViewBlock),
    edit: withStyleWrapper(CarouselEditBlock),
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  teaserGrid: {
    id: 'teaserGrid',
    title: 'Teaser grid',
    icon: imagesSVG,
    group: 'teasers',
    view: TeaserGridViewBlock,
    edit: TeaserGridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    // Maximum items allowed
    // maxItemsAllowed: 6,
    //
    // Variations example
    // variations: {
    //   default: { label: 'Default', template: TeaserDefaultTemplate },
    //   custom: {
    //     label: 'Custom',
    //     components: {
    //       view: TeaserDefaultTemplate,
    //       wrapper: (props) => (
    //         <>
    //           hey! {props.data.description2} asdasd {props.children} bottoms
    //           thinggy
    //         </>
    //       ),
    //     },
    //     schemaExtender: schemaExtender,
    //     schemaExtenderItem: schemaExtender,
    //   },
    // },
  },
  imagesGrid: {
    id: 'imagesGrid',
    title: 'Images grid',
    icon: imagesSVG,
    group: 'common',
    view: withStyleWrapper(ImagesGridViewBlock),
    edit: withStyleWrapper(ImagesGridEditBlock),
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    // Maximum items allowed
    // maxItemsAllowed: 6,
    variations: {
      default: { label: 'Default' },
      icons: {
        label: 'Icons',
        maxItemsAllowed: 6,
        itemFixedWidth: 6,
        components: {
          view: ImagesGridIconsVariation,
        },
        schemaExtenderItem: ImagesGridIconsVariationSchemaExtender,
      },
    },
  },
  listingGrid: {
    id: 'listingGrid',
    title: 'Listing Grid',
    icon: imagesSVG,
    group: 'common',
    view: ListingGridViewBlock,
    edit: ListingGridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  slider: {
    id: 'slider',
    title: 'Slider',
    icon: sliderSVG,
    group: 'common',
    view: SliderViewBlock,
    edit: SliderEditBlock,
    restricted: true,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  teaserHero: {
    id: 'teaserHero',
    title: 'Teaser Hero',
    icon: heroSVG,
    group: 'teasers',
    view: TeaserHeroViewBlock,
    edit: TeaserHeroEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  highlightSlider: {
    id: 'highlightSlider',
    title: 'Highlight Slider',
    icon: sliderSVG,
    group: 'teasers',
    view: HighlightSliderViewBlock,
    edit: HighlightSliderEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  textPillWithStyle: {
    id: 'textPillWithStyle',
    title: 'Text with background color',
    icon: textSVG,
    group: 'text',
    view: withStyleWrapper(TextPillViewBlock),
    edit: withStyleWrapper(TextPillEditBlock),
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  buttonBlock: {
    id: 'buttonBlock',
    title: 'Button',
    icon: CircleMenuSVG,
    group: 'common',
    view: ButtonViewBlock,
    edit: ButtonEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

// export const blocks = {
//   ...defaultBlocks,
//   blocksConfig: { ...defaultBlocks.blocksConfig, ...customBlocks },
//   groupBlocksOrder: customGroupBlocksOrder,
// };
export default (config) => {
  config.widgets.widget.object_list = ObjectListWidget;
  config.widgets.widget.style_simple_color = SimpleColorPicker;
  config.widgets.widget.object_by_type = ObjectByType;
  config.widgets.id.query = QuerystringSidebarWidget;

  if (serverConfig) {
    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      ...serverConfig,
    ];
  }

  return {
    ...config,
    blocks: {
      ...config.blocks,
      blocksConfig: {
        ...config.blocks.blocksConfig,
        ...customBlocks,
      },
      groupBlocksOrder: customGroupBlocksOrder(config.blocks.groupBlocksOrder),
    },
  };
};
