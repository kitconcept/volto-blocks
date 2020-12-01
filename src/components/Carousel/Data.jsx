import React from 'react';
import PropTypes from 'prop-types';
// import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SchemaRenderer } from '../../components';
import { useIntl } from 'react-intl';
import { carouselSchema } from './schema';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

const CarouselData = (props) => {
  const intl = useIntl();
  const schema = carouselSchema({ ...props, intl });

  return (
    <SchemaRenderer
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        props.onChangeBlock(props.block, {
          ...props.data,
          [id]: value,
        });
      }}
      formData={props.data}
      block={props.block}
      onChangeBlock={props.onChangeBlock}
    />
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withObjectBrowser(CarouselData);
