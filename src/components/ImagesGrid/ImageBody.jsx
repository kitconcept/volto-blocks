import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import Dropzone from 'react-dropzone';
import { readAsDataURL } from 'promise-file-reader';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import imageTileSVG from '@plone/volto/components/manage/Tiles/Image/tile-image.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createContent } from '@plone/volto/actions';
import { settings } from '~/config';

const messages = defineMessages({
  PleaseChooseImage: {
    id: 'Drop a file, click for upload or browse the site',
    defaultMessage: 'Drop a file, click for upload or browse the site',
  },
  UploadingImage: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

const ImageItem = ({ data, isEditMode, onChangeGridItem, index, intl }) => {
  const [uploadedImageIndex, setUploadedImageIndex] = React.useState(null);
  const dispatch = useDispatch();
  const pathname = useSelector(state => state.router.location.pathname);
  const request = useSelector(state => state.content.create);
  const content = useSelector(state => state.content.data);
  const uploading = React.useRef(false);

  const onDropImage = file => {
    uploading.current = true;
    setUploadedImageIndex(index);

    readAsDataURL(file[0]).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(getBaseUrl(pathname), {
          '@type': 'Image',
          title: file[0].name,
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file[0].name,
          },
        }),
      );
    });
  };

  React.useEffect(() => {
    if (request.loaded && uploading.current) {
      uploading.current = false;
      onChangeGridItem(uploadedImageIndex, { url: content['@id'] });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [request.loading]);

  return (
    <>
      {!data.url && (
        <Dropzone onDrop={onDropImage} className="dropzone">
          <Message>
            {uploading.current && (
              <Dimmer active>
                <Loader indeterminate>
                  {intl.formatMessage(messages.UploadingImage)}
                </Loader>
              </Dimmer>
            )}
            <div className="grid-image-item default">
              <img src={imageTileSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseImage)}</p>
            </div>
          </Message>
        </Dropzone>
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
  onChangeGridItem: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default injectIntl(ImageItem);