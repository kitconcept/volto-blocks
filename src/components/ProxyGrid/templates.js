import { v4 as uuid } from 'uuid';

import proxyGridTemplate1 from './proxy-grid-1.svg';
import proxyGridTemplate2 from './proxy-grid-2.svg';
import proxyGridTemplate3 from './proxy-grid-3.svg';
import proxyGridTemplate4 from './proxy-grid-4.svg';

const templates = [
  {
    image: proxyGridTemplate1,
    text: '1 image',
    columns: [
      {
        id: uuid(),
        '@type': 'proxy',
      },
    ],
  },
  {
    image: proxyGridTemplate2,
    text: '2 images',
    columns: [
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
    ],
  },
  {
    image: proxyGridTemplate3,
    text: '3 images',
    columns: [
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
    ],
  },
  {
    image: proxyGridTemplate4,
    text: '4 images',
    columns: [
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
      {
        id: uuid(),
        '@type': 'proxy',
      },
    ],
  },
];

export default templates;
