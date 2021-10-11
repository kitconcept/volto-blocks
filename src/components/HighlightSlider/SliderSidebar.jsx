import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import refreshIcon from '@plone/volto/icons/refresh.svg';

import SliderData from './SliderData';

const SliderSidebar = (props) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Aktuelles" defaultMessage="Aktuelles" />
        </h2>
        <Button.Group>
          <Button icon basic>
            <Icon name={refreshIcon} size="24px" />
          </Button>
        </Button.Group>
      </header>

      <SliderData {...props} />
    </Segment.Group>
  );
};

export default SliderSidebar;
