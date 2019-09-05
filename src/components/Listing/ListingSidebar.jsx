import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Segment } from 'semantic-ui-react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Icon } from '@plone/volto/components';

import ListingData from './ListingData';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

const messages = defineMessages({
  Listing: {
    id: 'Listing',
    defaultMessage: 'Listing',
  },
  Origin: {
    id: 'Origin',
    defaultMessage: 'Origin',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  NoImageSelected: {
    id: 'No image selected',
    defaultMessage: 'No image selected',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
});

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
  openObjectBrowser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(GridSidebar);
