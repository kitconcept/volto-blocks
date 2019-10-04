import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import imageTileSVG from '@plone/volto/components/manage/Tiles/Image/tile-image.svg';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserItem = ({ data, tile, isEditMode, intl }) => {
  const contentSubrequests = useSelector(state => state.content.subrequests);
  const dispatch = useDispatch();
  const tileID = data.id || tile;

  React.useEffect(() => {
    if (data.href) {
      dispatch(getContent(data.href, null, tileID));
    }
  }, [dispatch, data, tileID]);

  return (
    <>
      {!data.href && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageTileSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href &&
        contentSubrequests &&
        contentSubrequests[tileID] &&
        contentSubrequests[tileID].data && (
          <div className="grid-teaser-item">
            {(() => {
              const item = (
                <>
                  {contentSubrequests[tileID]?.data?.image && (
                    <img
                      src={contentSubrequests[tileID].data.image.download}
                      alt=""
                    />
                  )}
                  <h3>{contentSubrequests[tileID].data.title}</h3>
                  <p>{contentSubrequests[tileID].data.description}</p>
                </>
              );
              if (!isEditMode) {
                return (
                  <Link
                    to={flattenToAppURL(contentSubrequests[tileID].data['@id'])}
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

TeaserItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(TeaserItem);