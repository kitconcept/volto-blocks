import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { bindActionCreators, compose } from 'redux';
import Editor from 'draft-js-plugins-editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { includes, isEqual } from 'lodash';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import { settings } from '~/config';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
// import { ObjectBrowser } from '@kitconcept/volto-blocks/components';

import clearSVG from '@plone/volto/icons/clear.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

class EditCardBlock extends Component {
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
        uploading: false,
        objectBrowserIsOpen: false,
      };
    }
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.editor.focus();
    }
  }

  /**
   * Component will receive props
   * @method UNSAFE_componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
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
        url: nextProps.content['@id'],
      });
    }

    if (!this.props.selected && nextProps.selected) {
      this.node.focus();
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
      });
    }

    if (nextProps.selected !== this.props.selected) {
      this.editor.focus();
    }
  }

  toggleObjectBrowser = () => {
    this.setState({
      objectBrowserIsOpen: !this.state.objectBrowserIsOpen,
    });
  };

  closeObjectBrowser = () => this.setState({ objectBrowserIsOpen: false });

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChangeText = (editorState) => {
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
  };

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage = ({ target }) => {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then((data) => {
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
  };

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
        className={cx('block __card', {
          selected: this.props.selected,
        })}
        onKeyDown={(e) =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.block,
            this.node,
            { disableArrowUp: true, disableArrowDown: true },
          )
        }
        ref={(node) => {
          this.node = node;
        }}
      >
        {this.props.selected && !!this.props.data.url && (
          <div className="toolbar">
            {this.props.appendActions && <>{this.props.appendActions}</>}
            {this.props.detached && this.props.appendActions && (
              <div className="separator" />
            )}
            <Button.Group>
              <Button icon basic onClick={this.toggleObjectBrowser}>
                <Icon name={folderSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={() =>
                  this.props.onChangeBlock(this.props.block, {
                    ...this.props.data,
                    url: '',
                  })
                }
              >
                <Icon name={clearSVG} size="24px" color="#e40166" />
              </Button>
            </Button.Group>
            {this.props.appendSecondaryActions && (
              <>{this.props.appendSecondaryActions}</>
            )}
          </div>
        )}
        {this.props.selected && !this.props.data.url && (
          <div className="toolbar">
            <Button.Group>
              <Button basic icon onClick={this.toggleObjectBrowser}>
                <Icon name={folderSVG} size="24px" />
              </Button>
              <label className="ui button basic icon">
                <Icon name={uploadSVG} size="24px" />
                <input
                  type="file"
                  onChange={this.onUploadImage}
                  style={{ display: 'none' }}
                />
              </label>
            </Button.Group>
            {this.props.appendSecondaryActions && (
              <>
                <div className="separator" />
                {this.props.appendSecondaryActions}
              </>
            )}
          </div>
        )}
        {this.props.data.url ? (
          <p>
            <img
              className="card-image"
              src={
                this.props.data.url.includes(settings.apiPath)
                  ? `${flattenToAppURL(this.props.data.url)}/@@images/image`
                  : this.props.data.url
              }
              alt={this.props.data.alt || ''}
            />
          </p>
        ) : (
          <div>
            <Message>
              {this.state.uploading && (
                <Dimmer active>
                  <Loader indeterminate>Uploading image</Loader>
                </Dimmer>
              )}
              <center>
                <Icon name={imageSVG} size="100px" color="#b8c6c8" />
              </center>
            </Message>
          </div>
        )}
        <Editor
          ref={(node) => {
            this.editor = node;
          }}
          onChange={this.onChangeText}
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
        />
        <InlineToolbar />
        <ObjectBrowser
          objectBrowserIsOpen={this.state.objectBrowserIsOpen}
          closeBrowser={this.closeObjectBrowser}
          block={this.props.block}
          onChangeBlock={this.props.onChangeBlock}
          data={this.props.data}
        />
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
      pathname: state.router.location.pathname,
    }),
    (dispatch) => bindActionCreators({ createContent }, dispatch),
  ),
)(Edit);
