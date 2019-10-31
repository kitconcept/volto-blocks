/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAsDataURL } from 'promise-file-reader';
import {
  Button,
  Card,
  Dimmer,
  Image,
  Input,
  Grid,
  Loader,
  Message,
  Ref,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import { settings } from '~/config';

import { Icon, EditTextBlock } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';

import configSVG from '@plone/volto/icons/configuration.svg';
import addSVG from '@plone/volto/icons/add.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

import { CheckboxWidget, BlockModal } from '../../components';

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

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
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
    this.onChangeRichText = this.onChangeRichText.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onChangeModalSettings = this.onChangeModalSettings.bind(this);
    this.state = {
      uploading: false,
      modalOpened: false,
    };

    if (!this.props.data.cards) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        cards: [
          {
            id: uuid(),
            url: '',
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
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        cards: setArrayImmutable(
          this.props.data.cards,
          this.state.uploadedImageCardIndex,
          {
            ...this.props.data.cards[this.state.uploadedImageCardIndex],
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
      cards: setArrayImmutable(this.props.data.cards, index, {
        ...this.props.data.cards[index],
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

    const cards = reorder(
      this.props.data.cards,
      source.index,
      destination.index,
    );

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      cards,
    });
  };

  /**
   * Change RichText Card handler
   * @method onChangeRichText
   * @param {object} editorState Editor state.
   * @param {number} index Editor card index
   * @returns {undefined}
   */
  onChangeRichText(text, index) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      cards: setArrayImmutable(this.props.data.cards, index, {
        ...this.props.data.cards[index],
        text,
      }),
    });
  }

  /**
   * Change Modal settings Card handler
   * @method onChangeModalSettings
   * @param {string} id Editor state.
   * @param {*} value Editor card index
   * @returns {undefined}
   */
  onChangeModalSettings(id, value) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      [id]: value || null,
    });
  }

  addNewCard = e => {
    e.stopPropagation();
    const newCardsState = [
      ...this.props.data.cards,
      {
        id: uuid(),
        url: '',
      },
    ];
    if (this.props.data.cards.length < 4) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        cards: newCardsState,
      });
    }
  };

  selectCard = (e, index) => {
    e.stopPropagation();
    this.setState({ currentSelectedCard: index });
  };

  removeCard = (e, index) => {
    e.stopPropagation();
    const newCardsState = this.props.data.cards.filter(
      (item, i) => i !== index,
    );
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      cards: newCardsState,
    });
  };

  clearCard = (e, index) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      cards: setArrayImmutable(this.props.data.cards, index, {
        ...this.props.data.cards[index],
        url: '',
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
          this.props.onSelectBlock(this.props.block);
          this.setState({ currentSelectedCard: null });
        }}
        className={cx('block cards', {
          selected: this.props.selected,
          'centered-text': this.props.data.centeredText,
        })}
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
        {this.props.selected && this.state.currentSelectedCard === null && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.onAlignBlock('center')}
                active={
                  this.props.data.align === 'center' || !this.props.data.align
                }
              >
                <Icon name={imageFitSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.onAlignBlock('full')}
                active={this.props.data.align === 'full'}
              >
                <Icon name={imageFullSVG} size="24px" />
              </Button>
            </Button.Group>
            <div className="separator" />
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.addNewCard}
                disabled={this.props.data.cards.length >= 4}
              >
                <Icon name={addSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.setState({ modalOpened: true })}
              >
                <Icon name={configSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={uuid()} direction="horizontal">
            {provided => (
              <Ref innerRef={provided.innerRef}>
                <Card.Group
                  centered
                  {...provided.droppableProps}
                  itemsPerRow={
                    this.props.data.expandCards
                      ? this.props.data.cards.length
                      : 4
                  }
                >
                  {this.props.data.cards &&
                    this.props.data.cards.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {provided => (
                          <Ref innerRef={provided.innerRef}>
                            <Card
                              className={cx({
                                'no-borders': this.props.data.noBorders,
                              })}
                              key={item.id}
                              onClick={e => this.selectCard(e, index)}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {this.state.currentSelectedCard === index &&
                                !item.url && (
                                  <div className="toolbar">
                                    <Icon name={imageSVG} size="24px" />
                                    <form
                                    // TODO: refactor
                                    // onKeyDown={e =>
                                    //   this.onKeyDownVariantMenuForm(e, index)
                                    // }
                                    >
                                      <Input
                                        onChange={e =>
                                          this.onChangeUrl(e, index)
                                        }
                                        placeholder={this.props.intl.formatMessage(
                                          messages.ImageBlockInputPlaceholder,
                                        )}
                                      />
                                    </form>
                                    <Button.Group>
                                      <label className="ui button basic icon">
                                        <Icon name={folderSVG} size="24px" />
                                        <input
                                          type="file"
                                          onChange={e =>
                                            this.onUploadImage(e, index)
                                          }
                                          style={{ display: 'none' }}
                                        />
                                      </label>
                                    </Button.Group>
                                    <div className="separator" />
                                    <Button.Group>
                                      <Button
                                        icon
                                        basic
                                        onClick={e => this.removeCard(e, index)}
                                      >
                                        <Icon
                                          name={trashSVG}
                                          size="24px"
                                          color="#e40166"
                                        />
                                      </Button>
                                    </Button.Group>
                                  </div>
                                )}
                              {this.state.currentSelectedCard === index &&
                                item.url && (
                                  <div className="toolbar">
                                    <Button.Group>
                                      <Button
                                        icon
                                        basic
                                        onClick={e => this.clearCard(e, index)}
                                      >
                                        <Icon name={clearSVG} size="24px" />
                                      </Button>
                                    </Button.Group>
                                    <div className="separator" />
                                    <Button.Group>
                                      <Button
                                        icon
                                        basic
                                        onClick={e => this.removeCard(e, index)}
                                      >
                                        <Icon
                                          name={trashSVG}
                                          size="24px"
                                          color="#e40166"
                                        />
                                      </Button>
                                    </Button.Group>
                                  </div>
                                )}
                              {item.url ? (
                                <Image
                                  src={
                                    item.url.includes(settings.apiPath)
                                      ? `${flattenToAppURL(
                                          item.url,
                                        )}/@@images/image`
                                      : item.url
                                  }
                                  alt=""
                                />
                              ) : (
                                <div className="image-placeholder">
                                  <Message>
                                    {this.state.uploading &&
                                      this.state.currentSelectedCard ===
                                        index && (
                                        <Dimmer active>
                                          <Loader indeterminate>
                                            Uploading image
                                          </Loader>
                                        </Dimmer>
                                      )}
                                    <center>
                                      <Icon
                                        name={imageSVG}
                                        size="100px"
                                        color="#b8c6c8"
                                      />
                                    </center>
                                  </Message>
                                </div>
                              )}
                              {!this.props.data.hideText && (
                                <Card.Content
                                  // This prevents propagation of ENTER
                                  onKeyDown={e => e.stopPropagation()}
                                >
                                  <EditTextBlock
                                    {...this.props}
                                    data={this.props.data.cards[index]}
                                    block={item.id}
                                    detached
                                    index={0}
                                    selected={false}
                                    onSelectBlock={() => {}}
                                    onFocusPreviousBlock={() => {}}
                                    onFocusNextBlock={() => {}}
                                    onAddBlock={() => {}}
                                    onDeleteBlock={() => {}}
                                    onMutateBlock={() => {}}
                                    onChangeBlock={(block, data) =>
                                      this.onChangeRichText(data.text, index)
                                    }
                                  />
                                </Card.Content>
                              )}
                            </Card>
                          </Ref>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Card.Group>
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
                    onChange={this.onChangeModalSettings}
                  />
                  <CheckboxWidget
                    id="hideText"
                    title="Hide card text"
                    value={this.props.data.hideText}
                    onChange={this.onChangeModalSettings}
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
