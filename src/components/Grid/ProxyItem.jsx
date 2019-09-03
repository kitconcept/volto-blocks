import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import imageTileSVG from '@plone/volto/components/manage/Tiles/Image/tile-image.svg';
import { getContent } from '@plone/volto/actions';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const ProxyItem = ({ data, intl }) => {
  const contentSubrequests = useSelector(state => state.content.subrequests);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContent(data.href, null, data.id));
  }, [dispatch, data]);

  return (
    <>
      {!data.href && (
        <Message>
          <div className="grid-proxy-item default">
            <img src={imageTileSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href &&
        contentSubrequests &&
        contentSubrequests[data.id] &&
        contentSubrequests[data.id].data && (
          <div className="grid-proxy-item">
            <img src={contentSubrequests[data.id].data.image.download} alt="" />
            <h3>{contentSubrequests[data.id].data.title}</h3>
            <p>{contentSubrequests[data.id].data.description}</p>
          </div>
        )}
    </>
  );
};

ProxyItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ProxyItem);
