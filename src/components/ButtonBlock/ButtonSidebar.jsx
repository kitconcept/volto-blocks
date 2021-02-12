import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import ButtonData from './ButtonData';

const ButtonSidebar = (props) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Button" defaultMessage="Button" />
        </h2>
      </header>

      <ButtonData {...props} />
    </Segment.Group>
  );
};

export default ButtonSidebar;
