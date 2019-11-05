import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { defineMessages, useIntl } from 'react-intl';
import { isEqual } from 'lodash';
import redraft from 'redraft';

import { settings } from '~/config';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const TextBody = props => {
  const { data, block, onChangeBlock, dataName, isEditMode } = props;

  let initialEditorState, initialInlineToolbarPlugin;

  if (!__SERVER__) {
    if (props?.data?.[dataName]) {
      initialEditorState = EditorState.createWithContent(
        convertFromRaw(props.data[dataName]),
      );
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
        [dataName]: convertToRaw(currentEditorState.getCurrentContent()),
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
            blockRenderMap={settings.extendedBlockRenderMap}
            blockStyleFn={settings.blockStyleFn}
            placeholder={intl.formatMessage(messages.text)}
          />
          <InlineToolbar />
        </>
      );
    } else {
      return data[dataName]
        ? redraft(
            data[dataName],
            settings.ToHTMLRenderers,
            settings.ToHTMLOptions,
          )
        : '';
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
};

export default TextBody;
