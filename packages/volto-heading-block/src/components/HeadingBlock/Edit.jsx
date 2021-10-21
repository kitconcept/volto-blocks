import React from 'react';
import ContentEditable from 'react-contenteditable';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import HeadingSidebar from './Sidebar';
import config from '@plone/volto/registry';

const HeadingEdit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const show_alignment = config.blocks?.blocksConfig?.heading?.show_alignment;

  const handleChange = (event) => {
    onChangeBlock(block, { ...data, heading: event.target.value });
  };

  return (
    <div className="block heading">
      <ContentEditable
        style={show_alignment ? { textAlign: data.alignment } : {}}
        className="editable"
        tagName={data.tag || 'h2'}
        html={data.heading || ''} // innerHTML of the editable div
        onChange={handleChange} // handle innerHTML change
      />
      <SidebarPortal selected={selected}>
        <HeadingSidebar
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
