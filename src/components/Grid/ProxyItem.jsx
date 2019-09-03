import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageTileSVG from '@plone/volto/components/manage/Tiles/Image/tile-image.svg';
import { getContent } from '@plone/volto/actions';

const ProxyItem = ({ data }) => {
  const contentSubrequests = useSelector(state => state.content.subrequests);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContent(data.href, null, data.id));
  }, [dispatch, data]);

  return (
    <>
      {!data.href && (
        <div className="grid-proxy-item">
          <img src={imageTileSVG} alt="" />
          <h3>Please choose an existing content as source for this element</h3>
        </div>
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

export default ProxyItem;
