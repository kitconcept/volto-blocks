import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

function getImageURL(data) {
  if (
    typeof data.preview_image === 'object' &&
    (data.preview_image['content-type'] === 'image/gif' ||
      data.preview_image['content-type'] === 'image/svg+xml')
  ) {
    return flattenToAppURL(data.preview_image.download);
  } else if (
    data.preview_image.scales?.teaser.download &&
    typeof data.preview_image === 'object'
  ) {
    // If we are using the current image in preview_image in the source object
    // then we have the scale UID at hand and we can use it right away
    return flattenToAppURL(data.preview_image.scales.teaser.download);
  } else if (typeof data.preview_image === 'string') {
    // We've manually overriden the image pointing to an image content type,
    // then we have a string, we get it via URL shorthand
    // TODO: get the actual image scale UUID for better caching
    if (isInternalURL(data.preview_image)) {
      return flattenToAppURL(`${data.preview_image}/@@images/image/teaser`);
    } else {
      return data.preview_image;
    }
  } else {
    // Guard for edge cases
    return flattenToAppURL(`${data.href}/@@images/preview_image/teaser`);
  }
}

const TeaserBody = ({ data, isEditMode }) => {
  const intl = useIntl();

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
                {data?.preview_image && (
                  <div className="grid-image-wrapper">
                    <img src={getImageURL(data)} alt="" loading="lazy" />
                  </div>
                )}
                <h3>{data?.title}</h3>
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

export default TeaserBody;
