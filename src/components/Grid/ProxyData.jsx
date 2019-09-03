import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { TextWidget } from '@plone/volto/components';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

const ImageData = ({
  data,
  tile,
  onChangeTile,
  openObjectBrowser,
  required = false,
  intl,
}) => {
  return (
    <>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="source"
          title={intl.formatMessage(messages.Source)}
          required={false}
          value={data.href}
          icon={data.href ? clearSVG : navTreeSVG}
          iconAction={
            data.href
              ? () => {
                  onChangeTile(tile, {
                    ...data,
                    href: '',
                  });
                }
              : () => openObjectBrowser('link')
          }
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              href: value,
            });
          }}
        />
      </Segment>
    </>
  );
};

ImageData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default compose(
  withObjectBrowser,
  injectIntl,
)(ImageData);
