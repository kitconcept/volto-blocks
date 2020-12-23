import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import { blocks, settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { SchemaRenderer } from '../../components';
import { ImagesGridSchema } from './schema';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const ImageData = (props) => {
  const { data, dataGrid, block, onChangeBlock } = props;
  // const [alt, setAlt] = React.useState(data.alt || '');
  const intl = useIntl();

  const schema = ImagesGridSchema({ ...props, intl });

  const applySchemaEnhancer = (schema) => {
    const variations = blocks?.blocksConfig?.[dataGrid['@type']]?.variations;

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
      schema={applySchemaEnhancer(schema)}
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
