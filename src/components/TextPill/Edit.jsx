import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';
import { DetachedTextBlockEditor } from 'volto-slate/blocks/Text/TextBlockEdit';

const TextPillEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <div className="block textPillWithStyle">
      <DetachedTextBlockEditor {...props} />
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
