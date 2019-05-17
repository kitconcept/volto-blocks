/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import redraft from 'redraft';
import cx from 'classnames';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';

const getCardsLenght = cards =>
  cards.length + cards.filter(item => item.x2).length;

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div
    className={cx('tile cards', {
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
      {data.cards.map(card => (
        <Card
          key={card.id}
          as={card.href ? Link : null}
          className={cx({
            'no-borders': data.noBorders,
            x2: card['x2'],
          })}
          to={card.href || null}
          alt={card.alt || null}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
