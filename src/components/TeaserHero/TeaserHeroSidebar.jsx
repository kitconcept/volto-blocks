import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import TeaserHeroData from './TeaserHeroData';

const TeaserHeroSidebar = props => {
  const { sidebarData } = props;

  const teaserHeroSidebarDataRender = sidebarData ? (
    <>{sidebarData(props)}</>
  ) : (
    <TeaserHeroData {...props} />
  );

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Teaser Hero" defaultMessage="Teaser Hero" />
        </h2>
      </header>

      {teaserHeroSidebarDataRender}
    </Segment.Group>
  );
};

export default TeaserHeroSidebar;
