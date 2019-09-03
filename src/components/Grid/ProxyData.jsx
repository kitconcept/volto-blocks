import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Grid, Segment } from 'semantic-ui-react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { CheckboxWidget, Icon, TextWidget } from '@plone/volto/components';
import { settings } from '~/config';
import { AlignTile, flattenToAppURL } from '@plone/volto/helpers';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
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
      <Segment className="sidebar-metadata-container" secondary />
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="link"
          title={intl.formatMessage(messages.LinkTo)}
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
