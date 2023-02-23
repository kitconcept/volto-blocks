import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { Map } from 'immutable';
import {
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  EditorState,
} from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { defineMessages, useIntl } from 'react-intl';
import { isEqual } from 'lodash';
import redraft from 'redraft';
import { stateFromHTML } from 'draft-js-import-html';

import config from '@plone/volto/registry';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const TextBody = (props) => {
  const {
    data,
    block,
    onChangeBlock,
    dataName,
    isEditMode,
    noRichText,
    renderAs,
  } = props;

  const draftConfig = config.settings.richtextEditorSettings(props);

  const ElementType = renderAs;

  const blockRenderMap = Map({
    unstyled: {
      element: renderAs,
    },
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap,
  );

  let initialEditorState, initialInlineToolbarPlugin;

  if (!__SERVER__) {
    if (props?.data?.[dataName]) {
      if (ElementType) {
        initialEditorState = EditorState.createWithContent(
          stateFromHTML(props.data[dataName]),
        );
      } else {
        initialEditorState = EditorState.createWithContent(
          convertFromRaw(props.data[dataName]),
        );
      }
    } else {
      initialEditorState = EditorState.createEmpty();
    }

    initialInlineToolbarPlugin = createInlineToolbarPlugin({
      structure: config.settings.richTextEditorInlineToolbarButtons,
    });
  }

  const [editorState, setEditorState] = React.useState(initialEditorState);
  const inlineToolbarPlugin = React.useRef(initialInlineToolbarPlugin);
  const editorRef = React.useRef(null);
  const intl = useIntl();

  function onChange(currentEditorState) {
    if (
      !isEqual(
        convertToRaw(currentEditorState.getCurrentContent()),
        convertToRaw(editorState.getCurrentContent()),
      )
    ) {
      onChangeBlock(block, {
        ...data,
        [dataName]: (() => {
          if (renderAs) {
            return currentEditorState.getCurrentContent().getPlainText();
          } else {
            return convertToRaw(currentEditorState.getCurrentContent());
          }
        })(),
      });
    }
    setEditorState(currentEditorState);
  }

  if (__SERVER__) {
    return <div />;
  } else {
    const { InlineToolbar } = inlineToolbarPlugin.current;

    if (isEditMode) {
      return (
        <>
          <Editor
            ref={editorRef}
            onChange={onChange}
            editorState={editorState}
            plugins={[
              inlineToolbarPlugin.current,
              ...draftConfig.richTextEditorPlugins,
            ]}
            blockRenderMap={
              renderAs
                ? extendedBlockRenderMap
                : config.settings.extendedBlockRenderMap
            }
            blockStyleFn={config.settings.blockStyleFn}
            placeholder={intl.formatMessage(messages.text)}
            customStyleMap={config.settings.customStyleMap}
            onUpArrow={(e) => {
              // We need to stop propagate the event for not creating a new block while
              // in the widget
              e.stopPropagation();
            }}
            onDownArrow={(e) => {
              // We need to stop propagate the event for not creating a new block while
              // in the widget
              e.stopPropagation();
            }}
            handleReturn={(e) => {
              // We need to stop propagate the event for not creating a new block while
              // in the widget
              e.stopPropagation();
            }}
          />
          {!noRichText && <InlineToolbar />}
        </>
      );
    } else {
      if (data[dataName]) {
        if (ElementType) {
          return <ElementType>{data[dataName]}</ElementType>;
        } else {
          return redraft(
            data[dataName],
            config.settings.ToHTMLRenderers,
            config.settings.ToHTMLOptions,
          );
        }
      } else {
        return '';
      }
    }
  }
};

TextBody.propTypes = {
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

export default TextBody;
