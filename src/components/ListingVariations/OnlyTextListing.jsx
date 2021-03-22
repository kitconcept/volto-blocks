import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const OnlyTextTemplate = ({ items, linkMore, isEditMode }) => {
  let link = null;
  let href = linkMore?.href || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkMore?.title || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkMore?.title || href}</a>;
  }

  return (
    <>
      <div className="only-text-listing">
        <div className="items">
          {items.map((item) => (
            <div className="listing-item" key={item['@id']}>
              <ConditionalLink
                to={flattenToAppURL(item['@id'])}
                condition={!isEditMode}
              >
                <div className="listing-body">
                  <h4>{item.title ? item.title : item.id}</h4>
                  <p>{item.description}</p>
                </div>
              </ConditionalLink>
            </div>
          ))}
        </div>

        {link && <div className="ui button">{link}</div>}
      </div>
    </>
  );
};
OnlyTextTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default OnlyTextTemplate;
