import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import QuerystringWidget from './QuerystringWidget';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
});

const ListingData = ({
  data,
  tile,
  onChangeTile,
  openObjectBrowser,
  required = false,
  intl,
}) => {
  return (
    <>
      <Segment className="form sidebar-listing-data">
        <QuerystringWidget
          id="source"
          title={intl.formatMessage(messages.Source)}
          required={false}
          value={data.query || ''}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              query: value,
            });
          }}
        />
      </Segment>
    </>
  );
};

ListingData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default compose(
  withObjectBrowser,
  injectIntl,
)(ListingData);
