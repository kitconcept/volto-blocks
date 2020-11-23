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
  const result = contentSubrequests?.[id]?.data;

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
                find(templates(), item => item.variation === data.variation)
                  ?.image
              }
              alt=""
            />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href && result && (
        <div className={cx('teaser-item', data.variation, {})}>
          {(() => {
            const item = (
              <>
                {result?.preview_image && (
                  <img
                    src={flattenToAppURL(result.preview_image.download)}
                    alt=""
                  />
                )}
                <div>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
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

TeaserHeroBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(TeaserHeroBody);
