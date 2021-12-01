import imagesSVG from '@plone/volto/icons/images.svg';
import SeparatorView from './components/Separator/View';
import SeparatorEdit from './components/Separator/Edit';
import './styles/separator.less';

export default (config) => {
  config.blocks.blocksConfig.separator = {
    id: 'separator',
    title: 'Seperator',
    icon: imagesSVG,
    group: 'teasers',
    view: SeparatorView,
    edit: SeparatorEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
