import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { format, parse } from 'date-fns';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const NewsListingTemplate = ({
  items,
  linkMore,
  isEditMode,
  data,
  columns,
}) => {
  let link = null;
  let href = linkMore?.href || '';

  const language = useSelector((state) => state.intl.locale);

  var deLocale = require('date-fns/locale/de');
  var enLocale = require('date-fns/locale/en');

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
                        {item?.effective || item?.created ? (
                          <span className="day">
                            {language === 'de'
                              ? format(
                                  parse(item?.effective || item?.created),
                                  'DD. MMMM YYYY',
                                  {
                                    locale: deLocale,
                                  },
                                )
                              : format(
                                  parse(item?.effective || item?.created),
                                  'do MMMM YYYY',
                                  {
                                    locale: enLocale,
                                  },
                                )}
                          </span>
                        ) : (
                          <span className="day">No date</span>
                        )}
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
