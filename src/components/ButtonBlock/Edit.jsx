import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import ButtonSidebar from './ButtonSidebar';
import View from './View';

const Edit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  return (
    <>
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <ButtonSidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
