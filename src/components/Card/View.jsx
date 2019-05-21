/**
 * View image tile.
 * @module components/manage/Tiles/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';
import redraft from 'redraft';
import { settings } from '~/config';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => (
  <div
    className={cx('tile __card', {
      detached,
    })}
  >
    {(() => {
      const card = (
        <>
          {data.url && (
            <img
              src={`${flattenToAppURL(data.url)}/@@images/image`}
              alt={data.alt || ''}
              className="card-image"
            />
          )}
          <div className="card-title">
            {data.text && (
              <h2>
                {redraft(
                  data.text,
                  settings.ToHTMLRenderers,
                  settings.ToHTMLOptions,
                )}
              </h2>
            )}
          </div>
        </>
      );
      if (data.external) {
        const isReallyExternal =
          (data.external.startsWith('http') ||
            data.external.startsWith('https')) &&
          !data.external.includes(settings.apiPath);

        if (isReallyExternal) {
          return <a href={data.external}>{card}</a>;
        } else {
          return (
            <Link to={data.external.replace(settings.apiPath, '')}>{card}</Link>
          );
        }
      } else if (data.href) {
        return <Link to={data.href}>{card}</Link>;
      } else {
        return card;
      }
    })()}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
