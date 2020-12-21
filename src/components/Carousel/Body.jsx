import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import { TeaserBody } from '../../components';

defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
});

const CarouselBody = (props) => {
  return <TeaserBody {...props} />;
};

export default injectIntl(CarouselBody);
