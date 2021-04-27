import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import ButtonSidebar from './ButtonSidebar';
import View from './View';

const Edit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  return (
    <div className="block headline">
      <View {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <ButtonSidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </div>
  );
};

export default Edit;
