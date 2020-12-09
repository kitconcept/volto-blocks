import React from 'react';
import { Button, Grid, Message } from 'semantic-ui-react';
import Slider from 'react-slick';
import teaserHeroTopTemplate from '@kitconcept/volto-blocks/components/TeaserHero/teaserhero-top-template.svg';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

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
    icon
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <img src={leftArrowSVG} width="24" height="24" alt="Previous" />
  </Button>
);

const NextArrow = ({ className, style, onClick }) => (
  <Button
    icon
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
    <div
      className={cx('block carousel', {
        'wrapperstyle full': data.useBigContainer,
      })}
    >
      {(data.hrefList?.length === 0 || !data.hrefList) && isEditMode && (
        <Message>
          <div className="teaser-item default">
            <img src={teaserHeroTopTemplate} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.hrefList?.length > 0 && (
        <div
          className={cx({ 'full-width': data.useBigContainer })}
          style={{ backgroundColor: props.data.bg_color }}
        >
          {data.headline && <h2>{data.headline}</h2>}
          <Slider
            dots
            infinite={false}
            speed={500}
            slidesToShow={data.items_to_show || 4}
            slidesToScroll={data.items_to_show || 4}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {data.hrefList &&
              data.hrefList.map((item) => (
                <Body
                  key={item.id}
                  data={item}
                  isEditMode={isEditMode}
                  dataBlock={data}
                />
              ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default CarouselView;
