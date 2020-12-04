import React from 'react';
import PropTypes from 'prop-types';
import { MultiSourceWidget, SchemaRenderer } from '../../components';
import { carouselSchema } from './schema';

const CarouselData = (props) => {
  const { block, data, onChangeBlock, schemaEnhancer } = props;
  const schema = schemaEnhancer
    ? schemaEnhancer(carouselSchema(props), props)
    : carouselSchema(props);

  return (
    <>
      <MultiSourceWidget {...props} />
      <SchemaRenderer
        schema={schema}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
        formData={data}
        fieldIndex={data.index}
        basic
        unwrapped
      />
    </>
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default CarouselData;
