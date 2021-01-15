import { v4 as uuid } from 'uuid';
import { defineMessages } from 'react-intl';

import imageGridTemplate1 from './image-grid-1.svg';
import imageGridTemplate2 from './image-grid-2.svg';
import imageGridTemplate3 from './image-grid-3.svg';
import imageGridTemplate4 from './image-grid-4.svg';

const messages = defineMessages({
  image: {
    id: 'image',
    defaultMessage: 'image',
  },
  images: {
    id: 'images',
    defaultMessage: 'images',
  },
});

const templates = (intl) => [
  {
    image: imageGridTemplate1,
    id: 'imagegridtemplateone',
    title: `1 ${intl.formatMessage(messages.image)}`,
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
    title: `2 ${intl.formatMessage(messages.images)}`,
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
    title: `3 ${intl.formatMessage(messages.images)}`,
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
    title: `4 ${intl.formatMessage(messages.images)}`,
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
