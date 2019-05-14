import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { settings, tiles } from '~/config';

/**
 * TileRenderer container class.
 * @class Form
 * @extends Component
 */
class TileRenderer extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    edit: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Form
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const EditTile = tiles.defaultTilesEditMap[this.props.type];
    const ViewTile = tiles.defaultTilesViewMap[this.props.type];

    if (!this.props.edit) {
      return <ViewTile {...this.props} onChangeTile={() => {}} />;
    }
    if (this.props.edit) {
      return (
        <EditTile
          {...this.props}
          detached
          index={0}
          onSelectTile={() => {}}
          onFocusPreviousTile={() => {}}
          onFocusNextTile={() => {}}
          onAddTile={() => {}}
          onDeleteTile={() => {}}
          onMutateTile={() => {}}
        />
      );
    }
    return '';
  }
}

export default TileRenderer;
