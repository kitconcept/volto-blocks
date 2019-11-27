import { v4 as uuid } from 'uuid';

import imageGridTemplate1 from './image-grid-1.svg';
import imageGridTemplate2 from './image-grid-2.svg';
import imageGridTemplate3 from './image-grid-3.svg';
import imageGridTemplate4 from './image-grid-4.svg';

const templates = () => [
  {
    image: imageGridTemplate1,
    id: 'imagegridtemplateone',
    title: '1 image',
    columns: [
      {
        id: uuid(),
        '@type': 'image',
      },
    ],
  },
  {
    image: imageGridTemplate2,
    id: 'imagegridtemplatetwo',
    title: '2 images',
    columns: [
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
    ],
  },
  {
    image: imageGridTemplate3,
    id: 'imagegridtemplatethree',
    title: '3 images',
    columns: [
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
    ],
  },
  {
    image: imageGridTemplate4,
    id: 'imagegridtemplatefour',
    title: '4 images',
    columns: [
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
      {
        id: uuid(),
        '@type': 'image',
      },
    ],
  },
];

export default templates;
