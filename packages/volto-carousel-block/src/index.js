import CarouselViewBlock from './components/Carousel/View';
import CarouselEditBlock from './components/Carousel/Edit';
import './styles/carousel.less';

export default (config) => {
  config.blocks.blocksConfig.carousel = {
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
  };

  return config;
};
