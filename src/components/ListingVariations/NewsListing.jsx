import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { EffectiveDate } from '@kitconcept/volto-blocks/components';

const NewsListingTemplate = ({
  items,
  linkMore,
  isEditMode,
  data,
  columns,
}) => {
  let link = null;
  let href = linkMore?.href || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink
        to={flattenToAppURL(href)}
        condition={!isEditMode}
        className="ui button"
      >
        {linkMore?.title || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkMore?.title || href}</a>;
  }

  return (
    <>
      <div className="news-listing-template">
        <div className="items">
          {items.map((item) => (
            <div key={item.UID} className="event-item">
              <div className="content">
                <div className="listing-item" key={item['@id']}>
                  <ConditionalLink
                    to={flattenToAppURL(item['@id'])}
                    condition={!isEditMode}
                  >
                    <div className="listing-body">
                      <div className="dates">
                        <EffectiveDate item={item} />
                      </div>
                      <h4>{item.title ? item.title : item.id}</h4>
                    </div>
                  </ConditionalLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {link && <div className="block-footer">{link}</div>}
      </div>
    </>
  );
};
NewsListingTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default NewsListingTemplate;
