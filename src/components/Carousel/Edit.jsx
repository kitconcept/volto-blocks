import React from 'react';
import View from './View';
import { SidebarPortal } from '@plone/volto/components';
import CarouselData from './Data';

const CarouselEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <CarouselData data={data} block={block} onChangeBlock={onChangeBlock} />
      </SidebarPortal>
    </>
  );
};

export default CarouselEdit;
