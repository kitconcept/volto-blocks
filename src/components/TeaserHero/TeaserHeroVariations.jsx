import React from 'react';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import heroTopSVG from '@plone/volto/icons/hero.svg';
import heroLeftSVG from '../../icons/hero-left.svg';
import heroRightSVG from '../../icons/hero-right.svg';

const TeaserHeroVariations = ({ variation, onChangeBlock, data, block }) => {
  function onSetVariation(variation) {
    onChangeBlock(block, {
      ...data,
      variation,
    });
  }

  return (
    <div>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Top"
          onClick={() => onSetVariation('top')}
          active={data.variation === 'top' || !data.variation}
        >
          <Icon name={heroTopSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Left"
          onClick={() => onSetVariation('left')}
          active={data.variation === 'left'}
        >
          <Icon name={heroLeftSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Right"
          onClick={() => onSetVariation('right')}
          active={data.variation === 'right'}
        >
          <Icon name={heroRightSVG} size="24px" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default TeaserHeroVariations;
