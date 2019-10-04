import { v4 as uuid } from 'uuid';

import teaserGridTemplate1 from './teaser-grid-1.svg';
import teaserGridTemplate2 from './teaser-grid-2.svg';
import teaserGridTemplate3 from './teaser-grid-3.svg';
import teaserGridTemplate4 from './teaser-grid-4.svg';

const templates = [
  {
    image: teaserGridTemplate1,
    id: 'teasergridtemplateone',
    title: '1 column',
    columns: [
      {
        id: uuid(),
        '@type': 'teaser',
      },
    ],
  },
  {
    image: teaserGridTemplate2,
    id: 'teasergridtemplatetwo',
    title: '2 columns',
    columns: [
      {
        id: uuid(),
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
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
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
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
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
      },
      {
        id: uuid(),
        '@type': 'teaser',
      },
    ],
  },
];

export default templates;
