import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';

import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { getQueryStringResults } from '@package/actions';

import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

const messages = defineMessages({
  NoResults: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
});

const ListingItem = ({ data, properties, tile, intl }) => {
  const querystringResults = useSelector(
    state => state.equerystring.subrequests,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getQueryStringResults(data, tile));
  }, [dispatch, data, tile]);

  const folderItems = properties.is_folderish ? properties.items : [];
  const listingItems = data.query
    ? (querystringResults &&
        querystringResults[tile] &&
        querystringResults[tile].items) ||
      []
    : folderItems;

  return (
    <>
      {listingItems.length > 0 ? (
        <List>
          {listingItems.map(item => {
            // const image = get(item, 'image.scales.mini.download', '').replace(
            //   settings.apiPath,
            //   '',
            // );
            // const url = item['@id'].replace(settings.apiPath, '');
            return (
              <List.Item key={item.UID}>
                {/* {image && <Image avatar src={image} alt={item.title} />} */}
                <List.Content>
                  <List.Header>
                    <Link to={item['@id']}>{item.title}</Link>
                  </List.Header>
                  <List.Description>{item.description}</List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      ) : (
        <div className="listing">
          <FormattedMessage
            id="No results found."
            defaultMessage="No results found."
          />
        </div>
      )}
    </>
  );
};

ListingItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ListingItem);
