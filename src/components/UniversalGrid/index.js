import UniversalGridWidget from './Widget';
import imagesSVG from '@plone/volto/icons/images.svg';
import { insertInArray } from '@kitconcept/volto-blocks/helpers';
import UniversalGridViewBlock from './UniversalGridView';
import UniversalGridEditBlock from './UniversalGridEdit';

const customBlocks = {
  universalGrid: {
    id: 'universalGrid',
    title: 'Universal grid',
    icon: imagesSVG,
    group: 'teasers',
    view: UniversalGridViewBlock,
    edit: UniversalGridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

export default config => {
  config.widgets.widget.universal_grid = UniversalGridWidget;

  const newTeasersGroup = { id: 'teasers', title: 'Teasers' };
  const customGroupBlocksOrder = defaultGroups =>
    insertInArray(defaultGroups, newTeasersGroup, 2);

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
