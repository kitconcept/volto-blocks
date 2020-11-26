import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';

import {
  SchemaRenderer,
  VariationsSchemaExtender,
} from '@kitconcept/volto-blocks/components';
import { TeaserGridSchema } from './schema';
import { blocks } from '~/config';

const TeaserData = (props) => {
  const { block, data, dataGrid, onChangeBlock } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const blockID = data.id || block;
  const prevDataHref = React.useRef(data?.href);

  React.useEffect(() => {
    if (data.href && !data.title && !data.description && !data.preview_image) {
      dispatch(getContent(data.href, null, blockID)).then((resp) => {
        onChangeBlock(blockID, {
          ...data,
          migrated: true,
          ...(!data.title && { title: resp.title }),
          ...(!data.description && { description: resp.description }),
          ...(!data.preview_image && { preview_image: resp.preview_image }),
        });
      });
    }
    // The data changes, since we are subscribed (its parent TeaserBody) to the store change,
    // then on select it triggers a change anyways)
    if (data.href && data.href !== prevDataHref.current && data?.migrated) {
      dispatch(getContent(data.href, null, blockID)).then((resp) => {
        onChangeBlock(blockID, {
          ...data,
          title: resp.title,
          description: resp.description,
          preview_image: resp.preview_image,
        });
      });
    }
    prevDataHref.current = data.href;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.href]);

  const schema = TeaserGridSchema({ ...props, intl });

  const applySchemaEnhancer = (schema) => {
    const variations = blocks?.blocksConfig?.[dataGrid['@type']]?.variations;

    const schemaExtender =
      variations?.[dataGrid?.variation]?.['schemaExtenderItem'];

    return schemaExtender(schema);
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

TeaserData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default withObjectBrowser(TeaserData);
