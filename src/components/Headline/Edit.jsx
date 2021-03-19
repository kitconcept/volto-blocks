import React from 'react';
import View from './View';

import { SidebarPortal } from '@plone/volto/components';
import HeadlineSidebar from './Sidebar';

const Edit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  return (
    <div className="block headline">
      <View {...props} />
      <SidebarPortal selected={selected}>
        <HeadlineSidebar
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
