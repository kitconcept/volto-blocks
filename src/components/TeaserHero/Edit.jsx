import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import TeaserHeroSidebar from './TeaserHeroSidebar';
import TeaserHeroBody from './TeaserHeroBody';
import TemplateChooser from '../TemplateChooser/TemplateChooser';
import templates from './templates';

const Edit = ({
  data,
  onChangeBlock,
  block,
  id,
  selected,
  properties,
  render,
  sidebarData,
}) => {
  const teaserHeroBodyRender = render ? (
    <>{render(data, id)}</>
  ) : (
    <TeaserHeroBody data={data} id={id} isEditMode />
  );

  return (
    <>
      {!data.variation && (
        <TemplateChooser
          templates={templates}
          onSelectTemplate={index =>
            onChangeBlock(block, {
              ...data,
              variation: templates()[index].variation,
            })
          }
        />
      )}
      {data.variation && teaserHeroBodyRender}
      <SidebarPortal selected={selected}>
        <TeaserHeroSidebar
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
