import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';

import { SidebarPortal } from '@plone/volto/components';

import ListingSidebar from './ListingSidebar';
import ListingItem from './ListingItem';

class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);

    if (!this.props.data.query) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        query: [],
        tile: this.props.tile,
      });
    }
  }

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data, onChangeTile, properties, selected, tile } = this.props;

    return (
      <>
        {data?.query?.length === 0 && (
          <FormattedMessage
            id="Contained items"
            defaultMessage="Contained items"
          >
            {message => <p className="items-preview">{message}</p>}
          </FormattedMessage>
        )}
        {data?.query?.length > 0 && (
          <FormattedMessage
            id="Results preview"
            defaultMessage="Results preview"
          >
            {message => <p className="items-preview">{message}</p>}
          </FormattedMessage>
        )}
        <ListingItem data={data} properties={properties} tile={tile} />
        <SidebarPortal selected={selected}>
          <ListingSidebar data={data} tile={tile} onChangeTile={onChangeTile} />
        </SidebarPortal>
      </>
    );
  }
}

export default injectIntl(Edit);
