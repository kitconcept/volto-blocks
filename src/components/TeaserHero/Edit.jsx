import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import TeaserHeroSidebar from './TeaserHeroSidebar';
import TeaserHeroBody from './TeaserHeroBody';
import TemplateChooser from '../TemplateChooser/TemplateChooser';
import templates from './templates';

const Edit = ({ data, onChangeTile, tile, selected, properties }) => {
  return (
    <>
      {!data.variation && (
        <TemplateChooser
          templates={templates}
          onSelectTemplate={index =>
            onChangeTile(tile, {
              ...data,
              variation: templates[index].variation,
            })
          }
        />
      )}
      {data.variation && (
        <TeaserHeroBody
          data={data}
          properties={properties}
          id={tile}
          isEditMode
        />
      )}
      <SidebarPortal selected={selected}>
        <TeaserHeroSidebar
          data={data}
          tile={tile}
          onChangeTile={onChangeTile}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
