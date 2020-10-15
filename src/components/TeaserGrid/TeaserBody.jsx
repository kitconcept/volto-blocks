import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserBody = ({ data, block, isEditMode, intl }) => {
  return (
    <>
      {!data.href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href && (
        <div className="grid-teaser-item top">
          {(() => {
            const item = (
              <>
                <div className="grid-image-wrapper">
                  <img
                    src={flattenToAppURL(
                      `${data.href}/@@images/preview_image/teaser`,
                    )}
                    alt=""
                    loading="lazy"
                  />
                </div>
                {data?.headline && (
                  <div>
                    <div className="supertitle">{data.headline}</div>
                  </div>
                )}
                <h3 className={cx({ 'no-supertitle': !data.headline })}>
                  {data?.title}
                </h3>
                <p>{data?.description}</p>
              </>
            );
            if (!isEditMode) {
              return (
                <Link
                  to={flattenToAppURL(data.href)}
                  target={data.openLinkInNewTab ? '_blank' : null}
                >
                  {item}
                </Link>
              );
            } else {
              return item;
            }
          })()}
        </div>
      )}
    </>
  );
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(TeaserBody);
