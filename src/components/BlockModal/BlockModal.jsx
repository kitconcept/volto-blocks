import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';

import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  options: {
    id: 'Options',
    defaultMessage: 'Options',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

/**
 * This is the settings modal for blocks
 * @function BlockModal
 * @returns {node} Component node
 */
function BlockModal({ children, open, submitLabel, onSubmit, onClose, intl }) {
  return (
    <Modal
      size="mini"
      dimmer="inverted"
      closeOnDocumentClick
      className="block"
      open={open}
      onClose={onClose}
    >
      <Modal.Header>
        Card Block Configuration{' '}
        <Icon onClick={onClose} name={clearSVG} size="24px" />
      </Modal.Header>
      <Modal.Content className="ui form">{children}</Modal.Content>
      <Modal.Actions>
        <Button
          basic
          circular
          primary
          floated="right"
          icon="arrow right"
          title={submitLabel || intl.formatMessage(messages.save)}
          size="big"
          onClick={onSubmit || onClose}
        />
        {onSubmit && onClose && (
          <Button
            basic
            circular
            secondary
            icon="remove"
            title={intl.formatMessage(messages.cancel)}
            floated="right"
            size="big"
            onClick={onClose}
          />
        )}
      </Modal.Actions>
    </Modal>
  );
}

BlockModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

BlockModal.defaultProps = {
  submitLabel: null,
  onSubmit: null,
};

export default injectIntl(BlockModal);
