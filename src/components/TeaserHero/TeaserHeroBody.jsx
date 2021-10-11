import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import find from 'lodash/find';
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
  return (
    <>
      {!data.href && (
        <Message>
          <div className="teaser-item default">
            <img
              src={
                find(templates(), (item) => item.variation === data.variation)
                  ?.image
              }
              alt=""
            />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href && (
        <div className={cx('teaser-item', data.variation, {})}>
          {(() => {
            const item = (
              <>
                <div className="grid-image-wrapper">
                  {data.variation !== 'top' && (
                    <img
                      src={flattenToAppURL(
                        `${data.href}/@@images/preview_image/teaser`,
                      )}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  {data.variation === 'top' && (
                    <img
                      src={flattenToAppURL(
                        `${data.href}/@@images/preview_image/larger`,
                      )}
                      alt=""
                      loading="lazy"
                    />
                  )}
                </div>
                <div>
                  <h3>{data?.title}</h3>
                  <p>{data?.description}</p>
                </div>
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

TeaserHeroBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(TeaserHeroBody);
