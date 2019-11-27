import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

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

const TeaserData = ({
  data,
  block,
  onChangeBlock,
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
                  onChangeBlock(block, {
                    ...data,
                    href: '',
                  });
                }
              : () => openObjectBrowser({ mode: 'link' })
          }
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              href: value,
            });
          }}
        />
        <CheckboxWidget
          id="openLinkInNewTab"
          title={intl.formatMessage(messages.openLinkInNewTab)}
          value={data.openLinkInNewTab ? data.openLinkInNewTab : false}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              openLinkInNewTab: value,
            });
          }}
        />
      </Segment>
    </>
  );
};

TeaserData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default compose(withObjectBrowser, injectIntl)(TeaserData);
