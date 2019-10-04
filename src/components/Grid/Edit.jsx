import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';

import { Icon, SidebarPortal } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';

import imageSVG from '@plone/volto/icons/image.svg';
import textSVG from '@plone/volto/icons/text.svg';
import imagesSVG from '@plone/volto/icons/images.svg';
import addSVG from '@plone/volto/icons/add.svg';

import GridSidebar from './GridSidebar';
import TemplateChooser from '../TemplateChooser/TemplateChooser';
import {
  reorderArray,
  replaceItemOfArray,
} from '@kitconcept/volto-tiles/helpers';

import { gridConfig } from './View';

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
    templates: PropTypes.array.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeTile = this.onChangeTile.bind(this);
    this.state = {
      uploading: false,
    };

    // sets defaults
    if (!this.props.data.columns) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        columns: [],
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
    // This is required on upload images, sets the info on data of the new uploaded image.
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        columns: replaceItemOfArray(
          this.props.data.columns,
          this.state.uploadedImageIndex,
          {
            ...this.props.data.columns[this.state.uploadedImageIndex],
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

  updateUploadedImageIndex = index =>
    this.setState({
      uploadedImageIndex: index,
    });

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

    const columns = reorderArray(
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
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...data,
      }),
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
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
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

  onSelectTemplate = templateIndex => {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      columns: this.props.templates[templateIndex].columns,
    });
  };

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
        {!this.props.data.columns?.length && (
          <TemplateChooser
            templates={this.props.templates}
            onSelectTemplate={this.onSelectTemplate}
          />
        )}
        {/* Remaining code from the Uber Grid, useful when we implement the multi-item use case */}
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
                  onClick={e => this.addNewColumn(e, this.props.gridType)}
                  disabled={this.props.data.columns.length >= 4}
                >
                  <Icon name={addSVG} size="24px" />
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
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                role="presentation"
                                // This prevents propagation of ENTER
                                onKeyDown={e => e.stopPropagation()}
                              >
                                {(() => {
                                  const GridTypeComponent =
                                    gridConfig[item['@type']];
                                  return (
                                    <GridTypeComponent
                                      data={item}
                                      isEditMode
                                      index={index}
                                      updateUploadedImageIndex={
                                        this.updateUploadedImageIndex
                                      } // Only for images
                                    />
                                  );
                                })()}
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
            removeColumn={this.removeColumn}
            addNewColumn={this.addNewColumn}
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
