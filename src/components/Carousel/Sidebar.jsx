import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import refreshIcon from '@plone/volto/icons/refresh.svg';

import Data from './Data';

const CarouselSidebar = (props) => {
  return <Data {...props} />;
};

export default CarouselSidebar;
