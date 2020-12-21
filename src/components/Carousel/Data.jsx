import React from 'react';
import PropTypes from 'prop-types';
// import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SchemaRenderer } from '../../components';
import { usePrevious } from '../../helpers';
import { useIntl } from 'react-intl';
import { carouselSchema } from './schema';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { difference } from '@plone/volto/helpers';
import { replaceItemOfArray } from '@kitconcept/volto-blocks/helpers';

const CarouselData = (props) => {
  const { block, data, onChangeBlock } = props;
  const { columns } = props.data;
  const previous = usePrevious(columns);

  React.useEffect(() => {
    if (previous) {
      const diff = difference(columns, previous);
      const index = diff.findIndex((val) => val);
      if (diff[index]?.href?.[0]) {
        onChangeBlock(block, {
          ...data,
          columns: replaceItemOfArray(data.columns, index, {
            ...data.columns[index],
            title: diff[index].href[0].title,
            description: diff[index].href[0].Description,
          }),
        });
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [columns]);

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
    />
  );
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withObjectBrowser(CarouselData);
