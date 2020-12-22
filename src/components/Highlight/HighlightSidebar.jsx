import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import HighlightData from './HighlightData';

const HighlightSidebar = (props) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Highlight" defaultMessage="Highlight" />
        </h2>
      </header>

      <HighlightData {...props} />
    </Segment.Group>
  );
};

export default HighlightSidebar;
