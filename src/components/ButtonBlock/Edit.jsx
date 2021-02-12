import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import ButtonSidebar from './ButtonSidebar';
import View from './View';

const Edit = ({
  data,
  onChangeBlock,
  block,
  selected,
  sidebarData,
  isEditMode,
}) => {
  return (
    <>
      <View data={data} isEditMode />
      <SidebarPortal selected={selected}>
        <ButtonSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          sidebarData={sidebarData}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
