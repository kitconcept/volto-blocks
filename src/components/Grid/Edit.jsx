/**
 * Edit image tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import { Icon, SidebarPortal } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

import configSVG from '@plone/volto/icons/configuration.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import textSVG from '@plone/volto/icons/text.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import { CheckboxWidget, TileModal, TileRenderer } from '../../components';

import GridSidebar from './GridSidebar';
import EditProxyItem from './ProxyItem/Edit';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse or type URL',
    defaultMessage: 'Browse or type URL',
  },
});

const setArrayImmutable = (arr, i, value) =>
  Object.assign([...arr], { [i]: value });

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Edit image tile class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    gridType: PropTypes.string,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onUploadImage = this.onUploadImage.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onChangeTileSettings = this.onChangeTileSettings.bind(this);
    this.state = {
      uploading: false,
      modalOpened: false,
    };

    if (!this.props.data.columns) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        columns: [
          {
            id: uuid(),
          },
        ],
      });
    }
  }
  /**
   * Component will receive props
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.node.current.focus();
    }
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        columns: setArrayImmutable(
          this.props.data.columns,
          this.state.uploadedImageCardIndex,
          {
            ...this.props.data.columns[this.state.uploadedImageCardIndex],
            url: nextProps.content['@id'],
          },
        ),
      });

      if (nextProps.selected) {
        this.node.current.focus();
      }
    }

    if (nextProps.selected !== this.props.selected) {
      this.node.current.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @param {Object} target Target object
   * @param {number} index Card index
   * @returns {undefined}
   */
  onUploadImage({ target }, index) {
    const file = target.files[0];
    this.setState({
      uploading: true,
      uploadedImageCardIndex: index,
      // currentSelectedCard: null,
    });
    readAsDataURL(file).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      });
    });
  }

  /**
   * Align tile handler
   * @method onAlignTile
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignTile(align) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      align,
    });
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @param {number} index Card index
   * @returns {undefined}
   */
  onChangeUrl = ({ target }, index) => {
    this.setState({
      url: target.value,
    });
  };

  /**
   * Change url handler
   * @method onCloseModal
   * @param {Object} target Target object
   * @param {number} index Card index
   * @returns {undefined}
   */
  onCloseModal = () => {
    this.setState({
      modalOpened: false,
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {Object} e Event object
   * @param {number} index Card index
   * @returns {undefined}
   */
  onSubmitUrl = (e, index) => {
    e.preventDefault();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: this.state.url,
      }),
    });
  };

  onDragEnd = result => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columns = reorder(
      this.props.data.columns,
      source.index,
      destination.index,
    );

    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns,
    });
  };

  /**
   * Change inner tiles handler
   * @method onChangeTile
   * @param {object} editorState Editor state.
   * @param {number} index Editor card index
   * @returns {undefined}
   */
  onChangeTile(data, index) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...data,
      }),
    });
  }

  /**
   * Change tile settings handler
   * @method onChangeTileSettings
   * @param {string} id Editor state.
   * @param {*} value Editor card index
   * @returns {undefined}
   */
  onChangeTileSettings(id, value) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      [id]: value || null,
    });
  }

  addNewColumn = (e, type) => {
    e.stopPropagation();
    const newColumnsState = [
      ...this.props.data.columns,
      {
        id: uuid(),
        '@type': type,
      },
    ];
    if (this.props.data.columns.length < 4) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        columns: newColumnsState,
      });
    }
  };

  selectCard = (e, index) => {
    e.stopPropagation();
    this.setState({ currentSelectedCard: index });
    this.props.onSelectTile(this.props.tile);
  };

  removeColumn = (e, index) => {
    e.stopPropagation();
    const newColumnsState = this.props.data.columns.filter(
      (item, i) => i !== index,
    );
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: newColumnsState,
    });
  };

  clearColumn = (e, index) => {
    e.stopPropagation();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        [key]: value,
      }),
    });
  };

  handleClickOutside = e => {
    if (this.node.current && doesNodeContainClick(this.node.current, e)) return;
    this.setState(() => ({
      currentSelectedCard: null,
    }));
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDownVariantMenuForm(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitUrl(e, index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  }
  getCardsLenght = cards => cards.length + cards.filter(item => item.x2).length;

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        role="presentation"
        onClick={() => {
          this.props.onSelectTile(this.props.tile);
          // this.setState({ currentSelectedCard: null });
        }}
        className={cx('tile grid', {
          selected: this.props.selected,
          'centered-text': this.props.data.centeredText,
        })}
        tabIndex={0}
        onKeyDown={e => {
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node.current,
          );
        }}
        ref={this.node}
      >
        {this.props.selected &&
          this.state.currentSelectedCard === null &&
          !this.props.gridType && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={e => this.addNewColumn(e, 'text')}
                  disabled={this.props.data.columns.length >= 4}
                >
                  <Icon name={textSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={e => this.addNewColumn(e, 'image')}
                  disabled={this.props.data.columns.length >= 4}
                >
                  <Icon name={imageSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={e => this.addNewColumn(e, '__card')}
                  disabled={this.props.data.columns.length >= 4}
                >
                  <Icon name={imagesSVG} size="24px" />
                </Button>
              </Button.Group>
            </div>
          )}
        {this.props.selected &&
          this.state.currentSelectedCard === null &&
          this.props.gridType && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={e => this.addNewColumn(e, 'image')}
                  disabled={this.props.data.columns.length >= 4}
                >
                  <Icon name={imageSVG} size="24px" />
                </Button>
              </Button.Group>
            </div>
          )}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={uuid()} direction="horizontal">
            {provided => (
              <Ref innerRef={provided.innerRef}>
                <Grid
                  {...provided.droppableProps}
                  columns={
                    this.props.data.columns ? this.props.data.columns.length : 0
                  }
                >
                  {this.props.data.columns &&
                    this.props.data.columns.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {provided => (
                          <Ref innerRef={provided.innerRef}>
                            <Grid.Column
                              key={item.id}
                              onClick={e => this.selectCard(e, index)}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                role="presentation"
                                // This prevents propagation of ENTER
                                onKeyDown={e => e.stopPropagation()}
                              >
                                <EditProxyItem data={item} />
                              </div>
                            </Grid.Column>
                          </Ref>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Grid>
              </Ref>
            )}
          </Droppable>
        </DragDropContext>
        <SidebarPortal selected={this.props.selected}>
          <GridSidebar
            {...this.props}
            onChangeTile={(tile, data) => {
              this.onChangeTile(data, data.index);
            }}
          />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(Edit);
