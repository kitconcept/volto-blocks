import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Form, Grid, Segment } from 'semantic-ui-react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { CheckboxWidget, Icon, TextWidget } from '@plone/volto/components';
import { AlignTile, flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

import ImageData from './ImageData';
import ProxyData from './ProxyData';

import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

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

const GridSidebar = props => {
  const { data, gridType, intl } = props;
  const [activeAccIndex, setActiveAccIndex] = React.useState(0);

  function handleAccClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeAccIndex === index ? -1 : index;

    setActiveAccIndex(newIndex);
  }

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          {!gridType && <FormattedMessage id="Grid" defaultMessage="Grid" />}
          {gridType === 'images' && (
            <FormattedMessage id="Images Grid" defaultMessage="Images Grid" />
          )}
          {gridType === 'proxy' && (
            <FormattedMessage id="Proxy Grid" defaultMessage="Proxy Grid" />
          )}
        </h2>
        <Button.Group>
          <Button
            icon
            basic
            onClick={e => props.addNewColumn(e, gridType)}
            disabled={data.columns && data.columns.length >= 4}
          >
            <Icon name={addSVG} size="24px" />
          </Button>
        </Button.Group>
      </header>

      <Accordion fluid styled className="form">
        {data.columns &&
          data.columns.map((column, index) => (
            <>
              <Accordion.Title
                active={activeAccIndex === index}
                index={index}
                onClick={handleAccClick}
              >
                {(!gridType || gridType === 'proxy') && (
                  <FormattedMessage
                    id="Grid Element"
                    defaultMessage="Grid Element {index}"
                    values={{ index: index + 1 }}
                  />
                )}
                {gridType === 'images' && (
                  <FormattedMessage
                    id="Grid Image"
                    defaultMessage="Grid Image {index}"
                    values={{ index: index + 1 }}
                  />
                )}
                <div className="accordion-tools">
                  <Button.Group>
                    <Button
                      icon
                      basic
                      onClick={e => props.removeColumn(e, index)}
                    >
                      <Icon name={trashSVG} size="20px" color="#e40166" />
                    </Button>
                  </Button.Group>
                  {activeAccIndex === 0 ? (
                    <Icon name={upSVG} size="20px" />
                  ) : (
                    <Icon name={downSVG} size="20px" />
                  )}
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeAccIndex === index}>
                {gridType === 'images' && (
                  <ImageData {...props} data={{ ...column, index }} />
                )}
                {gridType === 'proxy' && (
                  <ProxyData {...props} data={{ ...column, index }} />
                )}
              </Accordion.Content>
            </>
          ))}
      </Accordion>
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
