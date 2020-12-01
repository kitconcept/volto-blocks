import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import Slider from 'react-slick';
import teaserHeroTopTemplate from '@kitconcept/volto-blocks/components/TeaserHero/teaserhero-top-template.svg';
import { defineMessages, useIntl } from 'react-intl';

import Body from './Body';
import leftArrowSVG from './slider-previous.svg';
import rightArrowSVG from './slider-next.svg';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const PrevArrow = ({ className, style, onClick }) => (
  <Button
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <img src={leftArrowSVG} width="24" height="24" alt="Previous" />
  </Button>
);

const NextArrow = ({ className, style, onClick }) => (
  <Button
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <img src={rightArrowSVG} width="24" height="24" alt="Previous" />
  </Button>
);

const CarouselView = (props) => {
  const { data, isEditMode } = props;
  const intl = useIntl();

  return (
    <div className="block highlightSlider">
      {(data.hrefList?.length === 0 || !data.hrefList) && isEditMode && (
        <Message>
          <div className="teaser-item default">
            <img src={teaserHeroTopTemplate} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.hrefList?.length > 0 && (
        <div className="full-width">
          <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {data.hrefList &&
              data.hrefList.map((item) => (
                <Body key={item.id} data={item} isEditMode={isEditMode} />
              ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default CarouselView;
