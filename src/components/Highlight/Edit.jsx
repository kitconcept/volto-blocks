import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import HighlightSidebar from './HighlightSidebar';
import HighlightBody from './HighlightBody';

const Edit = ({ data, onChangeBlock, block, selected, properties }) => {
  return (
    <>
      <HighlightBody
        data={data}
        properties={properties}
        id={block}
        isEditMode
      />
      <SidebarPortal selected={selected}>
        <HighlightSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
