import React from 'react';
import PropTypes from 'prop-types';
import { MultiSourceWidget, SchemaRenderer } from '../../components';
import { carouselSchema } from './schema';

const CarouselData = (props) => {
  const { block, data, onChangeBlock } = props;
  const schema = carouselSchema(props);

  return (
    <>
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
      <MultiSourceWidget {...props} />
    </>
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default CarouselData;
