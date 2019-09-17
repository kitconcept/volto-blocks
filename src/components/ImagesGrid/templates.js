import { v4 as uuid } from 'uuid';

import imageGridTemplate1 from './image-grid-1.svg';
import imageGridTemplate2 from './image-grid-2.svg';
import imageGridTemplate3 from './image-grid-3.svg';
import imageGridTemplate4 from './image-grid-4.svg';

const templates = [
  {
    image: imageGridTemplate1,
    text: '1 image',
    columns: [
      {
        id: uuid(),
        '@type': 'image',
      },
    ],
  },
  {
    image: imageGridTemplate2,
    text: '2 images',
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
    text: '3 images',
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
    text: '4 images',
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
