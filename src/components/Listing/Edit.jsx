import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';

import { Icon, SidebarPortal } from '@plone/volto/components';

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
    getQueryStringResults: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Component did mount. Search items if the query is set.
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { data, getQueryStringResults, selected, tile } = this.props;
    if (selected) {
      this.node.current.focus();
    }
    if (data.query) {
      getQueryStringResults(data.query, tile);
    }
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    const { data, getQueryStringResults, selected, tile } = this.props;
    if (!prevProps.selected && selected) {
      this.node.current.focus();
    }
    if (prevProps.data.query !== data.query) {
      if (data.query) {
        // getQueryStringResults(data.query, tile);
      }
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    // this.props.resetSearchContent(this.props.tile);
  }

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      data,
      onChangeTile,
      onSelectTile,
      properties,
      selected,
      tile,
    } = this.props;

    return (
      <div
        role="presentation"
        onClick={() => onSelectTile(tile)}
        className={cx('tile listing', {
          selected,
        })}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node.current,
          )
        }
        ref={this.node}
      >
        <FormattedMessage id="Results preview" defaultMessage="Results preview">
          {message => <p className="items-preview">{message}</p>}
        </FormattedMessage>
        <ListingItem data={data} properties={properties} tile={tile} />
        <SidebarPortal selected={selected}>
          <ListingSidebar data={data} tile={tile} onChangeTile={onChangeTile} />
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
