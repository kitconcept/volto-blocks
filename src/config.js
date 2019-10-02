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
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  tiles as defaultTiles,
} from '@plone/volto/config';

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
} from '@kitconcept/volto-tiles/components';

import { insertInArray } from '@kitconcept/volto-tiles/helpers';

import sliderSVG from '@plone/volto/icons/slider.svg';
import imagesSVG from '@plone/volto/icons/images.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import heroSVG from '@plone/volto/icons/hero.svg';

export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
};

export const widgets = {
  ...defaultWidgets,
};

const newTeasersGroup = { id: 'teasers', title: 'Teasers' };
const customGroupTilesOrder = insertInArray(
  defaultTiles.groupTilesOrder,
  newTeasersGroup,
  2,
);

const customTiles = {
  teaserGrid: {
    id: 'teaserGrid',
    title: 'Teaser grid',
    icon: imagesSVG,
    group: 'teasers',
    view: TeaserGridViewBlock,
    edit: TeaserGridEditBlock,
    restricted: false,
    mostUsed: true,
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
    security: {
      addPermission: [],
      view: [],
    },
  },
  listing: {
    id: 'listing',
    title: 'Listing',
    icon: listBulletSVG,
    group: 'common',
    view: ListingViewBlock,
    edit: ListingEditBlock,
    restricted: false,
    mostUsed: true,
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
    security: {
      addPermission: [],
      view: [],
    },
  },
};

export const tiles = {
  ...defaultTiles,
  tilesConfig: { ...defaultTiles.tilesConfig, ...customTiles },
  groupTilesOrder: customGroupTilesOrder,
};
