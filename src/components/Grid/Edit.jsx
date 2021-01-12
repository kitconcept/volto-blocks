import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import { Icon, SidebarPortal } from '@plone/volto/components';

import addSVG from '@plone/volto/icons/add.svg';
import { getBaseUrl } from '@plone/volto/helpers';

import GridSidebar from '@kitconcept/volto-blocks/components/Grid/GridSidebar';
import TemplateChooser from '@kitconcept/volto-blocks/components/TemplateChooser/TemplateChooser';
import { BlockWrapperEnhancer } from '@kitconcept/volto-blocks/components';

import {
  reorderArray,
  replaceItemOfArray,
} from '@kitconcept/volto-blocks/helpers';

/**
 * Edit image block class.
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
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    gridType: PropTypes.string,
    templates: PropTypes.func.isRequired,
    sidebarData: PropTypes.func.isRequired,
    itemFixedWidth: PropTypes.string,
  };

  state = {
    selectedColumnIndex: 0,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeBlock = this.onChangeBlock.bind(this);

    // sets defaults
    if (!this.props.data.columns) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: [],
      });
    }
  }

  onChangeGridItem = (index, gridItemData) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...gridItemData,
      }),
    });
  };

  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignBlock(align) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      align,
    });
  }

  onDragEnd = (result) => {
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

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns,
    });

    this.onChangeSelectedColumnItem(destination.index);
  };

  /**
   * Change inner blocks handler
   * @method onChangeBlock
   * @param {object} editorState Editor state.
   * @param {number} index Editor card index
   * @returns {undefined}
   */
  onChangeBlock(data, index) {
    this.props.onChangeBlock(this.props.block, {
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
    if (this.props.data.columns.length < this.props.maxItemsAllowed) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: newColumnsState,
      });
    }
  };

  removeColumn = (e, index) => {
    e.stopPropagation();
    const newColumnsState = this.props.data.columns.filter(
      (item, i) => i !== index,
    );
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: newColumnsState,
    });
  };

  clearColumn = (e, index) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        [key]: value,
      }),
    });
  };

  onSelectTemplate = (templateIndex) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: this.props.templates()[templateIndex].columns,
    });
  };

  onChangeSelectedColumnItem = (index) =>
    this.setState({ selectedColumnIndex: index });

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;

    return (
      <div
        className={cx({
          [data['@type']]: true,
          [data.variation]: data.variation,
          one: data?.columns && data.columns.length === 1,
          two: data?.columns && data.columns.length === 2,
          three: data?.columns && data.columns.length === 3,
          four: data?.columns && data.columns.length === 4,
        })}
      >
        {!this.props.data.columns?.length && (
          <TemplateChooser
            templates={this.props.templates}
            onSelectTemplate={this.onSelectTemplate}
          />
        )}
        {this.props.selected && this.props.gridType && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={(e) => this.addNewColumn(e, this.props.gridType)}
              >
                <Icon name={addSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        <BlockWrapperEnhancer {...this.props}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={uuid()} direction="horizontal">
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <Grid
                    {...provided.droppableProps}
                    centered={this.props.itemFixedWidth}
                    columns={
                      this.props.itemFixedWidth ||
                      this.props.data?.columns?.length ||
                      0
                    }
                  >
                    {this.props.data.columns &&
                      this.props.data.columns.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => {
                            item = { ...item, block: item.id };
                            return (
                              <Ref innerRef={provided.innerRef}>
                                <Grid.Column
                                  key={item.id}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    role="presentation"
                                    // This prevents propagation of ENTER
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={() =>
                                      this.onChangeSelectedColumnItem(index)
                                    }
                                  >
                                    {this.props.render({
                                      item,
                                      index,
                                      path: getBaseUrl(this.props.pathname),
                                      onChangeGridItem: this.onChangeGridItem,
                                      columns: data.columns,
                                    })}
                                  </div>
                                </Grid.Column>
                              </Ref>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Grid>
                </Ref>
              )}
            </Droppable>
          </DragDropContext>
        </BlockWrapperEnhancer>

        <SidebarPortal selected={this.props.selected}>
          <GridSidebar
            {...this.props}
            onChangeBlock={(block, data) => {
              this.onChangeBlock(data, data.index);
            }}
            onChangeFullBlock={this.props.onChangeBlock}
            onChangeSelectedColumnItem={this.onChangeSelectedColumnItem}
            activeColumn={this.state.selectedColumnIndex}
            removeColumn={this.removeColumn}
            addNewColumn={this.addNewColumn}
            sidebarData={this.props.sidebarData}
          />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    {},
  ),
)(Edit);
