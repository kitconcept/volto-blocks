import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import teaserHeroTopTemplate from '@kitconcept/volto-blocks/components/TeaserHero/teaserhero-top-template.svg';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
});

const HighlightBody = ({ data, id, isEditMode, intl }) => {
  return (
    <>
      {!data.href && (
        <Message>
          <div className="teaser-item default">
            <img src={teaserHeroTopTemplate} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {data.href && (
        <div className="teaser-item top full-width">
          {(() => {
            const item = (
              <>
                <div className="highlight-image-wrapper">
                  <img
                    src={flattenToAppURL(
                      `${data.href}/@@images/preview_image/larger`,
                    )}
                    alt=""
                  />
                </div>
                <div className="teaser-item-title fix-width-issue">
                  <div className="title">
                    {/* <div className="supertitle">{result['@type']}</div> */}
                    <h3> {data?.title}</h3>
                  </div>
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
                  {/* <div className="corner-button">
                    {intl.formatMessage(messages.moreInfo)}
                  </div> */}
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

HighlightBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(HighlightBody);
