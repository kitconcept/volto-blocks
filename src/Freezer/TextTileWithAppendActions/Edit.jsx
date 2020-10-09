/* eslint-disable */

/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import Editor from 'draft-js-plugins-editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { defineMessages, injectIntl } from 'react-intl';
import { includes, isEqual } from 'lodash';
import cx from 'classnames';

import { settings, blocks } from '~/config';

import { Icon } from '@plone/volto/components';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import MoreBlocksSVG from '@plone/volto/icons/more.svg';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

/**
 * Edit text block class.
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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    detached: PropTypes.bool,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    onAddBlock: PropTypes.func.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onMutateBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    appendActions: PropTypes.node,
    appendSecondaryActions: PropTypes.node,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    detached: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      let editorState;
      if (props.data && props.data.text) {
        editorState = EditorState.createWithContent(
          convertFromRaw(props.data.text),
        );
      } else {
        editorState = EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: settings.richTextEditorInlineToolbarButtons,
      });

      this.state = {
        editorState,
        inlineToolbarPlugin,
        addNewBlockOpened: false,
        customBlocksOpened: false,
      };
    }

    this.onChange = this.onChange.bind(this);
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
    if (!this.props.selected && nextProps.selected) {
      this.node.focus();
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
      });
    }
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.props.selected) {
      this.node.focus();
    }
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    if (
      !isEqual(
        convertToRaw(editorState.getCurrentContent()),
        convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        text: convertToRaw(editorState.getCurrentContent()),
      });
    }
    this.setState({ editorState });
  }

  toggleAddNewBlock = () =>
    this.setState((state) => ({ addNewBlockOpened: !state.addNewBlockOpened }));

  handleClickOutside = (e) => {
    if (this.ref && doesNodeContainClick(this.ref, e)) return;
    this.setState(() => ({
      addNewBlockOpened: false,
      customBlocksOpened: false,
    }));
  };

  openCustomBlockMenu = () =>
    this.setState(() => ({ customBlocksOpened: true }));

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { InlineToolbar } = this.state.inlineToolbarPlugin;

    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectBlock(this.props.block)}
        className={cx('block text', { selected: this.props.selected })}
        ref={(node) => (this.ref = node)}
      >
        {this.props.selected &&
          (this.props.appendSecondaryActions || this.props.appendActions) && (
            <div className="toolbar">
              {this.props.appendActions && <>{this.props.appendActions}</>}
              {this.props.appendSecondaryActions && (
                <>
                  {this.props.appendActions && <div className="separator" />}
                  {this.props.appendSecondaryActions}
                </>
              )}
            </div>
          )}
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={[
            this.state.inlineToolbarPlugin,
            ...settings.richTextEditorPlugins,
          ]}
          blockRenderMap={settings.extendedBlockRenderMap}
          blockStyleFn={settings.blockStyleFn}
          placeholder={this.props.intl.formatMessage(messages.text)}
          handleReturn={() => {
            if (!this.props.detached) {
              const selectionState = this.state.editorState.getSelection();
              const anchorKey = selectionState.getAnchorKey();
              const currentContent = this.state.editorState.getCurrentContent();
              const currentContentBlock = currentContent.getBlockForKey(
                anchorKey,
              );
              const blockType = currentContentBlock.getType();
              if (!includes(settings.listBlockTypes, blockType)) {
                this.props.onSelectBlock(
                  this.props.onAddBlock('text', this.props.index + 1),
                );
                return 'handled';
              }
              return 'un-handled';
            }
            return {};
          }}
          handleKeyCommand={(command, editorState) => {
            if (
              command === 'backspace' &&
              editorState.getCurrentContent().getPlainText().length === 0
            ) {
              this.props.onDeleteBlock(this.props.block, true);
            }
          }}
          onUpArrow={() => {
            const selectionState = this.state.editorState.getSelection();
            const currentCursorPosition = selectionState.getStartOffset();

            if (currentCursorPosition === 0) {
              this.props.onFocusPreviousBlock(this.props.block, this.node);
            }
          }}
          onDownArrow={() => {
            const selectionState = this.state.editorState.getSelection();
            const { editorState } = this.state;
            const currentCursorPosition = selectionState.getStartOffset();
            const blockLength = editorState
              .getCurrentContent()
              .getFirstBlock()
              .getLength();

            if (currentCursorPosition === blockLength) {
              this.props.onFocusNextBlock(this.props.block, this.node);
            }
          }}
          ref={(node) => {
            this.node = node;
          }}
        />
        <InlineToolbar />
        {!this.props.detached &&
          (!this.props.data.text ||
            (this.props.data.text &&
              this.props.data.text.blocks &&
              this.props.data.text.blocks.length === 1 &&
              this.props.data.text.blocks[0].text === '')) && (
            <Button
              basic
              icon
              onClick={this.toggleAddNewBlock}
              className="block-add-button"
            >
              <Icon name={addSVG} className="block-add-button" size="24px" />
            </Button>
          )}
        {this.state.addNewBlockOpened && !this.state.customBlocksOpened && (
          <div className="add-block toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={() =>
                  this.props.onMutateBlock(this.props.block, {
                    '@type': 'image',
                  })
                }
              >
                <Icon name={cameraSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={() =>
                  this.props.onMutateBlock(this.props.block, {
                    '@type': 'video',
                  })
                }
              >
                <Icon name={videoSVG} size="24px" />
              </Button>
            </Button.Group>
            {blocks.customBlocks.length !== 0 && (
              <React.Fragment>
                <div className="separator" />
                <Button.Group>
                  <Button icon basic onClick={this.openCustomBlockMenu}>
                    <Icon name={MoreBlocksSVG} size="24px" />
                  </Button>
                </Button.Group>
              </React.Fragment>
            )}
          </div>
        )}
        {this.state.addNewBlockOpened && this.state.customBlocksOpened && (
          <div className="add-block toolbar">
            {blocks.customBlocks.map((block) => (
              <Button.Group key={block.title}>
                <Button
                  icon
                  basic
                  onClick={() =>
                    this.props.onMutateBlock(this.props.block, {
                      '@type': block.title,
                    })
                  }
                >
                  <Icon name={block.icon} size="24px" />
                </Button>
              </Button.Group>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(Edit);
