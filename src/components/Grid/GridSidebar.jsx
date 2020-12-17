import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

import { gridDefaultSchema } from './schema';

import {
  VariationsWidget,
  SchemaRenderer,
} from '@kitconcept/volto-blocks/components';

import { blocks } from '~/config';

const GridSidebar = (props) => {
  const {
    block,
    data,
    gridType,
    sidebarData,
    activeColumn,
    onChangeSelectedColumnItem,
    onChangeFullBlock,
    intl,
  } = props;

  function handleChangeColumn(e, blockProps) {
    const { index } = blockProps;
    const newIndex = activeColumn === index ? -1 : index;

    onChangeSelectedColumnItem(newIndex);
  }

  const variations = blocks?.blocksConfig?.[data['@type']]?.variations;

  const applySchemaEnhancer = (schema) => {
    const schemaExtender = variations?.[data?.variation]?.['schemaExtender'];

    if (schemaExtender) {
      return schemaExtender(schema, props, intl);
    } else {
      return schema;
    }
  };

  const { minItemsAllowed } = blocks?.blocksConfig?.[data['@type']];

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          {!gridType && <FormattedMessage id="Grid" defaultMessage="Grid" />}
          {gridType === 'image' && (
            <FormattedMessage id="Images Grid" defaultMessage="Images Grid" />
          )}
          {gridType === 'teaser' && (
            <FormattedMessage id="Teaser Grid" defaultMessage="Teaser Grid" />
          )}
          {gridType === 'listing' && (
            <FormattedMessage id="Listing Grid" defaultMessage="Listing Grid" />
          )}
        </h2>
        <Button.Group>
          <Button
            icon
            basic
            onClick={(e) => props.addNewColumn(e, gridType)}
            disabled={data.columns && data.columns.length >= 4}
          >
            <Icon name={addSVG} size="24px" />
          </Button>
        </Button.Group>
      </header>

      {variations && Object.keys(variations).length > 1 && (
        <Segment className="form attached" style={{ padding: 0 }}>
          <VariationsWidget {...props} onChangeBlock={onChangeFullBlock} />
          <SchemaRenderer
            schema={applySchemaEnhancer(gridDefaultSchema(props))}
            title={gridDefaultSchema.title}
            onChangeField={(id, value) => {
              onChangeFullBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
            fieldIndex={data.index}
            basic
          />
        </Segment>
      )}

      <Accordion fluid styled className="form">
        {data.columns &&
          data.columns.map((column, index) => (
            <React.Fragment key={column.id}>
              <Accordion.Title
                active={activeColumn === index}
                index={index}
                onClick={handleChangeColumn}
              >
                {(!gridType || gridType === 'teaser') && (
                  <>
                    <FormattedMessage
                      id="Grid Element"
                      defaultMessage="Grid Element {index}"
                      values={{ index: (index + 1).toString() }}
                    />
                  </>
                )}
                {gridType === 'image' && (
                  <FormattedMessage
                    id="Grid Image"
                    defaultMessage="Grid Image {index}"
                    values={{ index: (index + 1).toString() }}
                  />
                )}
                {gridType === 'listing' && (
                  <FormattedMessage
                    id="ListingGrid"
                    defaultMessage="Listing Grid {index}"
                    values={{ index: (index + 1).toString() }}
                  />
                )}
                <div className="accordion-tools">
                  {data.columns.length > minItemsAllowed && (
                    <Button.Group>
                      <Button
                        icon
                        basic
                        onClick={(e) => props.removeColumn(e, index)}
                      >
                        <Icon name={trashSVG} size="20px" color="#e40166" />
                      </Button>
                    </Button.Group>
                  )}
                  {activeColumn === 0 ? (
                    <Icon name={upSVG} size="20px" />
                  ) : (
                    <Icon name={downSVG} size="20px" />
                  )}
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeColumn === index}>
                {sidebarData(props, column, index)}
              </Accordion.Content>
            </React.Fragment>
          ))}
      </Accordion>
    </Segment.Group>
  );
};

GridSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  sidebarData: PropTypes.func.isRequired,
};

export default injectIntl(GridSidebar);
