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

import {
  convertFromRaw,
  convertToRaw,
  Editor,
  DefaultDraftBlockRenderMap,
  EditorState,
} from 'draft-js';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import { includes, isEqual } from 'lodash';

import { settings } from '~/config';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import { ObjectBrowser } from '@kitconcept/volto-tiles/components';

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
    pathname: state.router.location.pathname,
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

    if (!__SERVER__) {
      let editorState;
      if (props.data && props.data.text) {
        editorState = EditorState.createWithContent(
          convertFromRaw(props.data.text),
        );
      } else {
        editorState = EditorState.createEmpty();
      }
      this.state = {
        uploading: false,
        editorState,
        currentFocused: 'title',
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

    if (!this.props.selected && nextProps.selected) {
      this.node.focus();
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
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
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChangeText = editorState => {
    if (
      !isEqual(
        convertToRaw(editorState.getCurrentContent()),
        convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      this.props.onChangeTile(this.props.tile, {
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
          onChange={this.onChangeText}
          editorState={this.state.editorState}
          blockRenderMap={extendedBlockRenderMap}
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