import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';

import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
});

const SliderBody = (props) => {
  const { data, isEditMode } = props;

  return (
    <div className="grid-teaser-item top">
      {data && (
        <div className="teaser-item top">
          {(() => {
            const item = (
              <>
                {data.preview_image && data.preview_image.scales ? (
                  <div className="highlight-image-wrapper">
                    <img
                      src={flattenToAppURL(
                        data.preview_image.scales.larger.download,
                      )}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="highlight-image-wrapper">
                    <img
                      src={flattenToAppURL(
                        `${data.href}/@@images/preview_image/larger`,
                      )}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="teaser-item-title fix-width-issue">
                  <div className="title">
                    <h3>{data.nav_title || data.title}</h3>
                  </div>
                  <p>{data.description}</p>
                </div>
              </>
            );
            if (!isEditMode) {
              return (
                <Link to={flattenToAppURL(data.href)}>
                  {item}
                  {/* <div className="corner-button">
                    {intl.formatMessage(messages.moreInfo)}
                  </div> */}
                </Link>
              );
            } else {
              return item;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default injectIntl(SliderBody);
