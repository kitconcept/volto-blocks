import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import TeaserHeroSidebar from './TeaserHeroSidebar';
import TeaserHeroBody from './TeaserHeroBody';

const Edit = ({ data, onChangeTile, tile, selected, properties }) => {
  return (
    <>
      <TeaserHeroBody
        data={data}
        properties={properties}
        blockID={tile}
        isEditMode
      />
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
