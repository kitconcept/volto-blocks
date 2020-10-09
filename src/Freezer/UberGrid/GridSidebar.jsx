import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import { Accordion, Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';

import ImageData from './ImageData';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const GridSidebar = (props) => {
  const { data, gridType } = props;
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
        </h2>
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
                {!gridType && (
                  <FormattedMessage
                    id="Grid Element"
                    defaultMessage="Grid Element {index}"
                    values={{ index: index }}
                  />
                )}
                {gridType === 'images' && (
                  <FormattedMessage
                    id="Grid Image"
                    defaultMessage="Grid Image {index}"
                    values={{ index: index }}
                  />
                )}

                {activeAccIndex === 0 ? (
                  <Icon name={upSVG} size="20px" />
                ) : (
                  <Icon name={downSVG} size="20px" />
                )}
              </Accordion.Title>
              <Accordion.Content active={activeAccIndex === index}>
                <ImageData {...props} data={column} />
              </Accordion.Content>
            </>
          ))}
      </Accordion>
    </Segment.Group>
  );
};

GridSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default compose(withObjectBrowser, injectIntl)(GridSidebar);
