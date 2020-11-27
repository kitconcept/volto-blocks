import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { format, parse } from 'date-fns';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const EventListingTemplate = ({
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
  const backgroundColor = (item) => {
    if (item.kind_of_event) {
      if (item.kind_of_event[0].title === 'Wissenschaftlicher Termin') {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className="event-listing-template">
        <div className="items">
          {items.map((item) => (
            <div key={item.UID} className="event-item">
              <div
                className={cx('date-circle', {
                  darkBlue: backgroundColor(item),
                })}
              >
                <div className="dates">
                  {item?.start ? (
                    <span className="day">
                      {language === 'de'
                        ? format(parse(item?.start), 'DD', {
                            locale: deLocale,
                          })
                        : format(parse(item?.start), 'do', {
                            locale: enLocale,
                          })}
                    </span>
                  ) : item?.effective ? (
                    <span className="day">
                      {language === 'de'
                        ? format(parse(item?.effective), 'DD', {
                            locale: deLocale,
                          })
                        : format(parse(item?.effective), 'do', {
                            locale: enLocale,
                          })}
                    </span>
                  ) : (
                    <span className="day"></span>
                  )}
                  {item?.start ? (
                    <span
                      className={cx('month-year ', {
                        lightBlue: backgroundColor(item),
                      })}
                    >
                      {language === 'de'
                        ? format(parse(item?.start), 'MMM YY', {
                            locale: deLocale,
                          })
                        : format(parse(item?.start), 'MMMM YYYY', {
                            locale: enLocale,
                          })}
                    </span>
                  ) : item?.effective ? (
                    <span
                      className={cx('month-year', {
                        lightBlue: backgroundColor(item),
                      })}
                    >
                      {language === 'de'
                        ? format(parse(item?.effective), 'MMM YY', {
                            locale: deLocale,
                          })
                        : format(parse(item?.effective), 'MMMM YYYY', {
                            locale: enLocale,
                          })}
                    </span>
                  ) : (
                    <span className="month-year"></span>
                  )}
                </div>
              </div>

              <div className="content">
                <div className="listing-item" key={item['@id']}>
                  <ConditionalLink
                    to={flattenToAppURL(item['@id'])}
                    condition={!isEditMode}
                  >
                    <div className="listing-body">
                      <div
                        className="institute"
                        style={{ height: '15px' }}
                      ></div>
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
EventListingTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default EventListingTemplate;
