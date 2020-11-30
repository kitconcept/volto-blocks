import React from 'react';
import PropTypes from 'prop-types';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { carouselSchema } from './schema';

const CarouselData = (props) => {
  const schema = carouselSchema(props);

  return (
    <InlineForm
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
    />
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default CarouselData;
