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

import { settings } from '~/config';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const TextBody = props => {
  const {
    data,
    block,
    onChangeBlock,
    dataName,
    isEditMode,
    noRichText,
    renderAs,
  } = props;

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
      if (renderAs) {
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
      structure: settings.richTextEditorInlineToolbarButtons,
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
              ...settings.richTextEditorPlugins,
            ]}
            blockRenderMap={
              renderAs
                ? extendedBlockRenderMap
                : settings.extendedBlockRenderMap
            }
            blockStyleFn={settings.blockStyleFn}
            placeholder={intl.formatMessage(messages.text)}
          />
          {!noRichText && <InlineToolbar />}
        </>
      );
    } else {
      if (data[dataName]) {
        switch (renderAs) {
          case 'h1':
            return <h1>{data[dataName]}</h1>;
          case 'h2':
            return <h2>{data[dataName]}</h2>;
          case 'h3':
            return <h3>{data[dataName]}</h3>;
          case 'h4':
            return <h4>{data[dataName]}</h4>;
          case 'h5':
            return <h5>{data[dataName]}</h5>;
          case 'h6':
            return <h6>{data[dataName]}</h6>;
          case 'p':
            return <p>{data[dataName]}</p>;
          case 'span':
            return <span>{data[dataName]}</span>;

          default:
            return redraft(
              data[dataName],
              settings.ToHTMLRenderers,
              settings.ToHTMLOptions,
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
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onAddBlock: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onMutateBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  noRichText: PropTypes.bool,
};

export default TextBody;
