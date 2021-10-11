import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Segment } from 'semantic-ui-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

import { gridDefaultSchema } from './schema';
import { nullSchema } from '../withStyleWrapper/schema';

import {
  VariationsWidget,
  SchemaRenderer,
} from '@kitconcept/volto-blocks/components';

import config from '@plone/volto/registry';

const GridSidebar = (props) => {
  const {
    block,
    data,
    gridType,
    sidebarData,
    activeColumn,
    onChangeSelectedColumnItem,
    onChangeFullBlock,
    schemaEnhancer,
    maxItemsAllowed,
  } = props;

  function handleChangeColumn(e, blockProps) {
    const { index } = blockProps;
    const newIndex = activeColumn === index ? -1 : index;

    onChangeSelectedColumnItem(newIndex);
  }

  const intl = useIntl();

  const variations = config.blocks?.blocksConfig?.[data['@type']]?.variations;

  const applyVariationSchemaExtender = (schema) => {
    // We enhance the schema from two possible sources: Variation extenders and enhancers
    // This is the variation extender
    const VariationSchemaExtender =
      variations?.[data?.variation]?.['schemaExtender'];

    if (VariationSchemaExtender) {
      return VariationSchemaExtender(schema, props, intl);
    } else {
      return schema;
    }
  };

  const applyEnhancerSchema = (schema) => {
    // We enhance the schema from two possible sources: Variation extenders and enhancers
    // This is the enhancer schema
    if (schemaEnhancer) {
      return schemaEnhancer(schema);
    } else {
      return schema;
    }
  };

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
            disabled={data?.columns?.length >= (maxItemsAllowed || 4)}
          >
            <Icon name={addSVG} size="24px" />
          </Button>
        </Button.Group>
      </header>

      {variations && Object.keys(variations).length > 1 && (
        <Segment className="form attached" style={{ padding: 0 }}>
          <VariationsWidget {...props} onChangeBlock={onChangeFullBlock} />
          <SchemaRenderer
            schema={applyVariationSchemaExtender(gridDefaultSchema(props))}
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
                  {data.columns.length > 1 && (
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
      {/* In our grids, the block enhancers come after the grid data */}
      {schemaEnhancer && (
        <Segment className="form attached" style={{ padding: 0 }}>
          <SchemaRenderer
            schema={applyEnhancerSchema({
              ...nullSchema(),
              block: data['@type'],
            })}
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
    </Segment.Group>
  );
};

GridSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  sidebarData: PropTypes.func.isRequired,
};

export default GridSidebar;
