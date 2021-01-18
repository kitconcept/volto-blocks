import { v4 as uuid } from 'uuid';
import { defineMessages } from 'react-intl';

import teaserGridTemplate1 from './teaser-grid-1.svg';
import teaserGridTemplate2 from './teaser-grid-2.svg';
import teaserGridTemplate3 from './teaser-grid-3.svg';
import teaserGridTemplate4 from './teaser-grid-4.svg';

const messages = defineMessages({
  column: {
    id: 'column',
    defaultMessage: 'column',
  },
  columns: {
    id: 'columns',
    defaultMessage: 'columns',
  },
});

const templates = (intl) => [
  {
    image: teaserGridTemplate1,
    id: 'teasergridtemplateone',
    title: `1 ${intl.formatMessage(messages.column)}`,
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
    image: teaserGridTemplate2,
    id: 'teasergridtemplatetwo',
    title: `2 ${intl.formatMessage(messages.columns)}`,
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
    title: `3 ${intl.formatMessage(messages.columns)}`,
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
    title: `4 ${intl.formatMessage(messages.columns)}`,
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
