import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { SchemaRenderer } from '../../components';
import { ImagesGridSchema } from './schema';

const ImageData = (props) => {
  const { data, dataGrid, block, onChangeBlock } = props;

  const intl = useIntl();

  const schema = ImagesGridSchema({ ...props, intl });

  const applyVariationSchemaExtender = (schema) => {
    const variations =
      config.blocks?.blocksConfig?.[dataGrid['@type']]?.variations;

    const schemaExtender =
      variations?.[dataGrid?.variation]?.['schemaExtenderItem'];

    if (schemaExtender) {
      return schemaExtender(schema, props, intl);
    } else {
      return schema;
    }
  };

  return (
    <SchemaRenderer
      schema={applyVariationSchemaExtender(schema)}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
    />
  );
};

ImageData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default withObjectBrowser(ImageData);
