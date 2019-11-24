/* eslint-disable */

/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import { Icon } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

import configSVG from '@plone/volto/icons/configuration.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import textSVG from '@plone/volto/icons/text.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import { CheckboxWidget, BlockModal, BlockRenderer } from '../../components';

import GridSidebar from './GridSidebar';

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
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
    createContent: PropTypes.func.isRequired,
    gridType: PropTypes.string,
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
    this.onChangeBlock = this.onChangeBlock.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onChangeBlockSettings = this.onChangeBlockSettings.bind(this);
    this.state = {
      uploading: false,
      modalOpened: false,
    };

    if (!this.props.data.columns) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: [
          {
            id: uuid(),
            '@type': 'image',
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
      this.node.focus();
    }
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method UNSAFE_componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
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
        this.node.focus();
      }
    }

    if (nextProps.selected !== this.props.selected) {
      this.node.focus();
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
    this.props.onChangeBlock(this.props.block, {
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

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns,
    });
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
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...data,
      }),
    });
  }

  /**
   * Change block settings handler
   * @method onChangeBlockSettings
   * @param {string} id Editor state.
   * @param {*} value Editor card index
   * @returns {undefined}
   */
  onChangeBlockSettings(id, value) {
    this.props.onChangeBlock(this.props.block, {
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
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: newColumnsState,
      });
    }
  };

  selectCard = (e, index) => {
    e.stopPropagation();
    this.setState({ currentSelectedCard: index });
    this.props.onSelectBlock(this.props.block);
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
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: setArrayImmutable(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        [key]: value,
      }),
    });
  };

  handleClickOutside = e => {
    if (this.node && doesNodeContainClick(this.node, e)) return;
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

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const isDoubleSized = this.props.data.columns
      ? this.props.data.columns.filter(cols => cols.x2).length
      : 0;

    return (
      <div
        role="presentation"
        onClick={() => {
          this.props.onSelectBlock(this.props.block);
          // this.setState({ currentSelectedCard: null });
        }}
        className={cx('block grid', {
          selected: this.props.selected,
          'centered-text': this.props.data.centeredText,
        })}
        tabIndex={0}
        onKeyDown={e => {
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.block,
            this.node,
          );
        }}
        ref={node => {
          this.node = node;
        }}
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
              {/* <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.setState({ modalOpened: true })}
              >
                <Icon name={configSVG} size="24px" />
              </Button>
            </Button.Group> */}
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
                  className={cx({
                    centered:
                      this.props.data.align === 'center' ||
                      this.props.data.align === undefined,
                    'space-between': this.props.data.align === 'space-between',
                  })}
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
                              width={
                                isDoubleSized
                                  ? item.x2
                                    ? (12 /
                                        (this.props.data.columns.length +
                                          isDoubleSized)) *
                                      2
                                    : 12 /
                                      (this.props.data.columns.length +
                                        isDoubleSized)
                                  : null
                              }
                            >
                              <div
                                // This prevents propagation of ENTER
                                onKeyDown={e => e.stopPropagation()}
                              >
                                {/* <SidebarPortal selected={this.props.selected}>
                                  <GridSidebar
                                    {...this.props}
                                    onChangeBlock={(block, data) => {
                                      debugger;
                                      this.onChangeBlock(data, index);
                                    }}
                                  />
                                </SidebarPortal> */}
                                <BlockRenderer
                                  block={item.id}
                                  edit
                                  type={item['@type']}
                                  selected={
                                    this.state.currentSelectedCard === index
                                  }
                                  onChangeBlock={(block, data) =>
                                    this.onChangeBlock(data, index)
                                  }
                                  data={this.props.data.columns[index]}
                                  openObjectBrowser={
                                    this.props.openObjectBrowser
                                  }
                                  appendActions={
                                    <Button.Group>
                                      <Button
                                        icon
                                        basic
                                        className={cx('text-button', {
                                          selected: this.props.data.columns[
                                            index
                                          ]['x2'],
                                        })}
                                        disabled={
                                          this.props.data.columns.length < 2 ||
                                          (!item.x2 && isDoubleSized)
                                        }
                                        onClick={e =>
                                          this.onChangeColumnSettings(
                                            e,
                                            index,
                                            'x2',
                                            this.props.data.columns[index]['x2']
                                              ? !this.props.data.columns[index][
                                                  'x2'
                                                ]
                                              : true,
                                          )
                                        }
                                      >
                                        x2
                                      </Button>
                                    </Button.Group>
                                  }
                                  appendSecondaryActions={
                                    <Button.Group>
                                      <Button
                                        icon
                                        basic
                                        onClick={e =>
                                          this.removeColumn(e, index)
                                        }
                                      >
                                        <Icon
                                          name={trashSVG}
                                          size="24px"
                                          color="#e40166"
                                        />
                                      </Button>
                                    </Button.Group>
                                  }
                                />
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

        <BlockModal
          open={this.state.modalOpened}
          data={this.props.data}
          onClose={this.onCloseModal}
        >
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor="login">
                    <FormattedMessage id="Options" defaultMessage="Options" />
                  </label>
                </div>
              </Grid.Column>
              <Grid.Column width="8">
                <div className="field-group-wrapper">
                  <CheckboxWidget
                    id="centeredText"
                    title="Center cards text"
                    value={this.props.data.centeredText}
                    onChange={this.onChangeBlockSettings}
                  />
                  <CheckboxWidget
                    id="hideText"
                    title="Hide card text"
                    value={this.props.data.hideText}
                    onChange={this.onChangeBlockSettings}
                  />
                  <CheckboxWidget
                    id="noBorders"
                    title="No card borders"
                    value={this.props.data.noBorders}
                    onChange={this.onChangeBlockSettings}
                  />
                  <CheckboxWidget
                    id="expandCards"
                    title="Use all the available card width"
                    value={this.props.data.expandCards}
                    onChange={this.onChangeBlockSettings}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </BlockModal>
      </div>
    );
  }
}

export default compose(
  withObjectBrowser,
  injectIntl,
  connect(
    state => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(Edit);
