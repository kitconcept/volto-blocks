import { v4 as uuid } from 'uuid';

import teaserGridTemplate2 from './teaser-grid-2.svg';
import teaserGridTemplate3 from './teaser-grid-3.svg';
import teaserGridTemplate4 from './teaser-grid-4.svg';

const templates = () => [
  {
    image: teaserGridTemplate2,
    id: 'teasergridtemplatetwo',
    title: '2 columns',
    columns: [
      {
        id: uuid(),
        '@type': 'listing',
        query: [],
      },
      {
        id: uuid(),
        '@type': 'listing',
        query: [],
      },
    ],
  },
  {
    image: teaserGridTemplate3,
    id: 'teasergridtemplatethree',
    title: '3 columns',
    columns: [
      {
        id: uuid(),
        '@type': 'listing',
      },
      {
        id: uuid(),
        '@type': 'listing',
      },
      {
        id: uuid(),
        '@type': 'listing',
      },
    ],
  },
  {
    image: teaserGridTemplate4,
    id: 'teasergridtemplatefour',
    title: '4 columns',
    columns: [
      {
        id: uuid(),
        '@type': 'listing',
      },
      {
        id: uuid(),
        '@type': 'listing',
      },
      {
        id: uuid(),
        '@type': 'listing',
      },
      {
        id: uuid(),
        '@type': 'listing',
      },
    ],
  },
];

export default templates;
