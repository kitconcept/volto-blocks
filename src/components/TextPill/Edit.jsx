import React from 'react';
import TextPillBody from './Body';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';
import { DetachedTextBlockEditor } from 'volto-slate/blocks/Text/TextBlockEdit';

const TextPillEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DetachedTextBlockEditor {...props} detached />
      <SidebarPortal selected={selected}>
        <Sidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </div>
  );
};

export default TextPillEdit;
