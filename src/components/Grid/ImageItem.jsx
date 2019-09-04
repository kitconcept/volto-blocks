import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';
import imageTileSVG from '@plone/volto/components/manage/Tiles/Image/tile-image.svg';

const messages = defineMessages({
  PleaseChooseImage: {
    id: 'Please choose an existing content as source for this image',
    defaultMessage:
      'Please choose an existing content as source for this image',
  },
});

const ImageItem = ({ data, isEditMode, intl }) => {
  return (
    <>
      {!data.url && (
        <Message>
          <div className="grid-image-item default">
            <img src={imageTileSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseImage)}</p>
          </div>
        </Message>
      )}
      {data.url && (
        <div className="grid-image-item">
          {(() => {
            const image = (
              <img
                src={
                  data.url.includes(settings.apiPath)
                    ? `${flattenToAppURL(data.url)}/@@images/image`
                    : data.url
                }
                alt={data.alt || ''}
              />
            );
            if (data.href && !isEditMode) {
              return (
                <Link
                  to={data.href}
                  target={data.openLinkInNewTab ? '_blank' : null}
                >
                  {image}
                </Link>
              );
            } else {
              return image;
            }
          })()}
        </div>
      )}
    </>
  );
};

ImageItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ImageItem);
