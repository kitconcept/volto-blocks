import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserItem = ({ data, block, isEditMode, intl }) => {
  const contentSubrequests = useSelector(state => state.content.subrequests);
  const dispatch = useDispatch();
  const blockID = data.id || block;
  const result = contentSubrequests?.[blockID]?.data;

  React.useEffect(() => {
    if (data.href) {
      dispatch(getContent(data.href, null, blockID));
    }
  }, [dispatch, data, blockID]);

  return (
    <>
      {!data.href && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href && result && (
        <div className="grid-teaser-item top">
          {(() => {
            const item = (
              <>
                {result?.image && (
                  <img src={flattenToAppURL(result.image.download)} alt="" />
                )}
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </>
            );
            if (!isEditMode) {
              return (
                <Link
                  to={flattenToAppURL(result['@id'])}
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
};

export default injectIntl(TeaserItem);
