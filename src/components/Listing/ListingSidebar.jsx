import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import ListingData from './ListingData';

const GridSidebar = props => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Listing" defaultMessage="Listing" />
        </h2>
      </header>

      <ListingData {...props} />
    </Segment.Group>
  );
};

GridSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(GridSidebar);
