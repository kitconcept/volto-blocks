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

// import {
//   settings as defaultSettings,
//   views as defaultViews,
//   widgets as defaultWidgets,
//   blocks as defaultBlocks,
// } from '@plone/volto/config';

import {
  SliderEditBlock,
  SliderViewBlock,
  TeaserGridEditBlock,
  TeaserGridViewBlock,
  ImagesGridEditBlock,
  ImagesGridViewBlock,
  ListingEditBlock,
  ListingViewBlock,
  TeaserHeroViewBlock,
  TeaserHeroEditBlock,
  // GridEditBlock,
  // GridViewBlock,
  // CardEditBlock,
  // CardViewBlock,
} from '@kitconcept/volto-blocks/components';

import { insertInArray } from '@kitconcept/volto-blocks/helpers';

import sliderSVG from '@plone/volto/icons/slider.svg';
import imagesSVG from '@plone/volto/icons/images.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import heroSVG from '@plone/volto/icons/hero.svg';

// export const settings = {
//   ...defaultSettings,
// };
//
// export const views = {
//   ...defaultViews,
// };
//
// export const widgets = {
//   ...defaultWidgets,
// };

const newTeasersGroup = { id: 'teasers', title: 'Teasers' };
const customGroupBlocksOrder = defaultGroups =>
  insertInArray(defaultGroups, newTeasersGroup, 2);

const customBlocks = {
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
  },
  imagesGrid: {
    id: 'imagesGrid',
    title: 'Images grid',
    icon: imagesSVG,
    group: 'common',
    view: ImagesGridViewBlock,
    edit: ImagesGridEditBlock,
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
};

// export const blocks = {
//   ...defaultBlocks,
//   blocksConfig: { ...defaultBlocks.blocksConfig, ...customBlocks },
//   groupBlocksOrder: customGroupBlocksOrder,
// };

export default config => {
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
