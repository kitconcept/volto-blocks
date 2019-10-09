import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import find from 'lodash/find';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import templates from './templates';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserHeroBody = ({ data, id, isEditMode, intl }) => {
  const contentSubrequests = useSelector(state => state.content.subrequests);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data.href) {
      dispatch(getContent(data.href, null, id));
    }
  }, [dispatch, data, id]);

  return (
    <>
      {!data.href && (
        <Message>
          <div className="teaser-item default">
            <img
              src={
                find(templates, item => item.variation === data.variation)
                  ?.image
              }
              alt=""
            />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href &&
        contentSubrequests &&
        contentSubrequests[id] &&
        contentSubrequests[id].data && (
          <div
            className={cx('teaser-item', data.variation, {
              padded: data.isPadded,
            })}
          >
            {(() => {
              const item = (
                <>
                  {contentSubrequests[id]?.data?.image && (
                    <img
                      src={contentSubrequests[id].data.image.download}
                      alt=""
                    />
                  )}
                  <div>
                    <h3>{contentSubrequests[id].data.title}</h3>
                    <p>{contentSubrequests[id].data.description}</p>
                  </div>
                </>
              );
              if (!isEditMode) {
                return (
                  <Link
                    to={flattenToAppURL(contentSubrequests[id].data['@id'])}
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

TeaserHeroBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(TeaserHeroBody);
