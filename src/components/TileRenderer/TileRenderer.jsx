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
    mode: PropTypes.oneOf(['view', 'edit']).isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
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

    if (this.props.mode === 'view') {
      return <ViewTile {...this.props} />;
    }
    if (this.props.mode === 'edit') {
      return (
        <EditTile
          {...this.props}
          detached
          selected
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
