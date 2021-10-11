/**
 * View image block.
 * @module components/manage/Blocks/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import redraft from 'redraft';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';

const getCardsLenght = (cards) =>
  cards.length + cards.filter((item) => item.x2).length;

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const { settings } = config;
  function getLinkProps(data) {
    if (data.external) {
      const isReallyExternal =
        (data.external.startsWith('http') ||
          data.external.startsWith('https')) &&
        !data.external.includes(settings.apiPath);

      if (isReallyExternal) {
        return { href: data.external };
      } else {
        return { to: data.external.replace(settings.apiPath, ''), as: Link };
      }
    } else if (data.href) {
      return { to: data.href, as: Link };
    } else {
      return {};
    }
  }

  return (
    <div
      className={cx('block cards', {
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
        shrinked: data['x.5'],
      })}
    >
      <Card.Group
        className={cx({
          centered: data.align === 'center' || data.align === undefined,
          'space-between': data.align === 'space-between',
        })}
        itemsPerRow={data.expandCards ? getCardsLenght(data.cards) : 4}
      >
        {data.cards.map((card) => (
          <Card
            key={card.id}
            className={cx({
              'no-borders': data.noBorders,
              x2: card['x2'],
            })}
            alt={card.alt || null}
            {...getLinkProps(data)}
          >
            <Image
              src={
                card.url.startsWith(settings.apiPath)
                  ? `${flattenToAppURL(card.url)}/@@images/image`
                  : card.url
              }
            />
            {!data.hideText && (
              <Card.Content>
                {card.text &&
                  redraft(
                    card.text,
                    settings.ToHTMLRenderers,
                    settings.ToHTMLOptions,
                  )}
              </Card.Content>
            )}
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
