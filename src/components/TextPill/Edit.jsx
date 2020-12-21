import React from 'react';
import TextPillBody from './Body';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';

const TextPillEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <TextPillBody isEditMode dataName="text" {...props} />
      <SidebarPortal selected={selected}>
        <Sidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default TextPillEdit;
