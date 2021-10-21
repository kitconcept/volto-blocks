import headingSVG from '@plone/volto/icons/heading.svg';
import HeadingViewBlock from './components/HeadingBlock/View';
import HeadingEditBlock from './components/HeadingBlock/Edit';
import './styles/heading.less';

export default (config) => {
  config.blocks.blocksConfig.heading = {
    id: 'heading',
    title: 'Heading',
    icon: headingSVG,
    group: 'common',
    view: HeadingViewBlock,
    edit: HeadingEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
