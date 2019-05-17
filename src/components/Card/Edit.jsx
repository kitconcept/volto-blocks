/**
 * Edit Hero tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import { settings } from '~/config';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import ObjectBrowser from '@package/components/ObjectBrowser/ObjectBrowser';

import clearSVG from '@plone/volto/icons/clear.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import folderSVG from '@plone/volto/icons/folder.svg';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

const blockTitleRenderMap = Map({
  unstyled: {
    element: 'h2',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  blockTitleRenderMap,
);

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
export default class EditCardTile extends Component {
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

    if (!__SERVER__) {
      let titleEditorState;
      if (props.data && props.data.title) {
        titleEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.title),
        );
      } else {
        titleEditorState = EditorState.createEmpty();
      }
      this.state = {
        uploading: false,
        titleEditorState,
        currentFocused: 'title',
        objectBrowserIsOpen: false,
      };
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.titleEditor.focus();
    }
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
        url: nextProps.content['@id'],
      });
    }

    if (
      nextProps.data.title &&
      this.props.data.title !== nextProps.data.title &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.title);
      this.setState({
        titleEditorState: nextProps.data.title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (
      nextProps.data.description &&
      this.props.data.description !== nextProps.data.description &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.description);
      this.setState({
        descriptionEditorState: nextProps.data.description
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (nextProps.selected !== this.props.selected) {
      if (this.state.currentFocused === 'title') {
        this.titleEditor.focus();
      } else {
        this.descriptionEditor.focus();
      }
    }
  }

  toggleObjectBrowser = () => {
    this.setState({
      objectBrowserIsOpen: !this.state.objectBrowserIsOpen,
    });
  };

  closeObjectBrowser = () => this.setState({ objectBrowserIsOpen: false });

  /**
   * Change Title handler
   * @method onChangeTitle
   * @param {object} titleEditorState Editor state.
   * @returns {undefined}
   */
  onChangeTitle(titleEditorState) {
    this.setState({ titleEditorState }, () => {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        title: titleEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    this.setState({
      uploading: true,
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx('tile __card', {
          selected: this.props.selected,
        })}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node,
            { disableArrowUp: true, disableArrowDown: true },
          )
        }
        ref={node => {
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
                  this.props.onChangeTile(this.props.tile, {
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
              <label className="ui button basic icon">
                <Icon
                  name={folderSVG}
                  size="24px"
                  onClick={this.toggleObjectBrowser}
                />
              </label>
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
          ref={node => {
            this.titleEditor = node;
          }}
          onChange={this.onChangeTitle}
          editorState={this.state.titleEditorState}
          blockRenderMap={extendedBlockRenderMap}
          handleReturn={() => true}
          placeholder={this.props.intl.formatMessage(messages.title)}
          blockStyleFn={() => 'title-editor'}
          onUpArrow={() => {
            const selectionState = this.state.titleEditorState.getSelection();
            const { titleEditorState } = this.state;
            if (
              titleEditorState
                .getCurrentContent()
                .getBlockMap()
                .first()
                .getKey() === selectionState.getFocusKey()
            ) {
              this.props.onFocusPreviousTile(this.props.tile, this.node);
            }
          }}
          onDownArrow={() => {
            const selectionState = this.state.titleEditorState.getSelection();
            const { titleEditorState } = this.state;
            if (
              titleEditorState
                .getCurrentContent()
                .getBlockMap()
                .last()
                .getKey() === selectionState.getFocusKey()
            ) {
              this.setState(() => ({ currentFocused: 'description' }));
              this.descriptionEditor.focus();
            }
          }}
        />
        <ObjectBrowser
          objectBrowserIsOpen={this.state.objectBrowserIsOpen}
          closeBrowser={this.closeObjectBrowser}
          tile={this.props.tile}
          onChangeTile={this.props.onChangeTile}
          data={this.props.data}
        />
      </div>
    );
  }
}
