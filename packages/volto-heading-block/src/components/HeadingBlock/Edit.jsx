import React from 'react';
import ContentEditable from 'react-contenteditable';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import HeadlineSidebar from './Sidebar';

const HeadingEdit = (props) => {
  const { data, block, onChangeBlock, selected } = props;

  const handleChange = (event) => {
    onChangeBlock(block, { ...data, headline: event.target.value });
  };

  return (
    <div className="block heading">
      <ContentEditable
        style={{ textAlign: data.alignment }}
        className="editable"
        tagName={data.tag || 'h2'}
        html={data.headline || ''} // innerHTML of the editable div
        onChange={handleChange} // handle innerHTML change
      />
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

export default withBlockExtensions(HeadingEdit);
