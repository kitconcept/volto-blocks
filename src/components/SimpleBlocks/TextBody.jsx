import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import redraft from 'redraft';

import { defineMessages, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import config from '@plone/volto/registry';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import loadable from '@loadable/component';

const Editor = loadable(() => import('draft-js-plugins-editor'));

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

export class TextBodyComponent extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    dataName: PropTypes.string.isRequired,
    isEditMode: PropTypes.bool,
    selected: PropTypes.bool,
    block: PropTypes.string,
    onAddBlock: PropTypes.func,
    onChangeBlock: PropTypes.func,
    noRichText: PropTypes.bool,
    renderAs: PropTypes.elementType,
  };

  constructor(props) {
    super(props);

    const { settings } = config;
    const ElementType = props.renderAs;

    this.draftConfig = settings.richtextEditorSettings(props);

    const { EditorState, convertFromRaw } = props.draftJs;
    const createInlineToolbarPlugin = props.draftJsInlineToolbarPlugin.default;
    const { stateFromHTML } = props.draftJsImportHtml;

    if (!__SERVER__) {
      let editorState;
      if (props?.data?.[this.props.dataName]) {
        if (ElementType) {
          editorState = EditorState.createWithContent(
            stateFromHTML(props.data[this.props.dataName]),
          );
        } else {
          editorState = EditorState.createWithContent(
            convertFromRaw(props.data[this.props.dataName]),
          );
        }
      } else {
        editorState = EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: config.settings.richTextEditorInlineToolbarButtons,
      });

      this.state = {
        editorState,
        inlineToolbarPlugin,
      };
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    const { convertToRaw } = this.props.draftJs;

    if (
      !isEqual(
        convertToRaw(editorState.getCurrentContent()),
        convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        [this.props.dataName]: (() => {
          if (this.props.renderAs) {
            return editorState.getCurrentContent().getPlainText();
          } else {
            return convertToRaw(editorState.getCurrentContent());
          }
        })(),
      });
    }
    this.setState({ editorState });
  }

  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { DefaultDraftBlockRenderMap } = this.props.draftJs;
    const { InlineToolbar } = this.state.inlineToolbarPlugin;
    const ElementType = this.props.renderAs;
    const { Map } = this.props.immutableLib;

    const blockRenderMap = Map({
      unstyled: {
        element: this.props.renderAs,
      },
    });

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
      blockRenderMap,
    );

    if (this.props.isEditMode) {
      return (
        <>
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={[
              this.state.inlineToolbarPlugin,
              ...this.draftConfig.richTextEditorPlugins,
            ]}
            blockRenderMap={
              this.props.renderAs
                ? extendedBlockRenderMap
                : this.draftConfig.extendedBlockRenderMap
            }
            blockStyleFn={this.draftConfig.blockStyleFn}
            placeholder={this.props.intl.formatMessage(messages.text)}
            customStyleMap={this.draftConfig.customStyleMap}
            onUpArrow={(e) => {
              e.stopPropagation();
            }}
            onDownArrow={(e) => {
              e.stopPropagation();
            }}
            handleReturn={(e) => {
              e.stopPropagation();
            }}
          />
          {!this.props.noRichText && <InlineToolbar />}
        </>
      );
    } else {
      if (this.props.data[this.props.dataName]) {
        if (ElementType) {
          return (
            <ElementType>{this.props.data[this.props.dataName]}</ElementType>
          );
        } else {
          return redraft(
            this.props.data[this.props.dataName],
            this.draftConfig.ToHTMLRenderers,
            this.draftConfig.ToHTMLOptions,
          );
        }
      } else {
        return '';
      }
    }
  }
}

export const TextBody = compose(
  injectIntl,
  injectLazyLibs([
    'draftJs',
    'draftJsLibIsSoftNewlineEvent',
    'draftJsFilters',
    'draftJsImportHtml',
    'draftJsInlineToolbarPlugin',
    'draftJsBlockBreakoutPlugin',
    'draftJsCreateInlineStyleButton',
    'draftJsCreateBlockStyleButton',
    'immutableLib',
  ]),
)(TextBodyComponent);

const Preloader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Editor.load().then(() => setLoaded(true));
  }, []);
  return loaded ? <TextBody {...props} /> : null;
};

export default Preloader;
