/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { defineMessages, useIntl } from 'react-intl';
import { isEqual } from 'lodash';

import { settings } from '~/config';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const Textbody = props => {
  const { data, block, onChangeBlock } = props;

  let initialEditorState, initialInlineToolbarPlugin;

  if (!__SERVER__) {
    if (props?.data?.text) {
      initialEditorState = EditorState.createWithContent(
        convertFromRaw(props.data.text),
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

  // React.useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.focus();
  //   }
  // }, [props.data.text]);

  React.useEffect(() => {
    onChangeBlock: block,
      {
        ...data,
        text: convertToRaw(editorState.getCurrentContent()),
      };
  }, [editorState]);

  function onChange(currentEditorState) {
    // if (
    //   !isEqual(
    //     convertToRaw(currentEditorState.getCurrentContent()),
    //     convertToRaw(editorState.getCurrentContent()),
    //   )
    // ) {
    //   onChangeBlock:(block, {
    //     ...data,
    //     text: convertToRaw(currentEditorState.getCurrentContent()),
    //   });
    // }
    setEditorState(currentEditorState);
  }

  if (__SERVER__) {
    return <div />;
  } else {
    const { InlineToolbar } = inlineToolbarPlugin.current;

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
          // handleReturn={() => {
          //   if (!this.props.detached) {
          //     const selectionState = editorState.getSelection();
          //     const anchorKey = selectionState.getAnchorKey();
          //     const currentContent = editorState.getCurrentContent();
          //     const currentContentBlock = currentContent.getBlockForKey(
          //       anchorKey,
          //     );
          //     const blockType = currentContentBlock.getType();
          //     if (!includes(settings.listBlockTypes, blockType)) {
          //       this.props.onSelectBlock(
          //         this.props.onAddBlock('text', this.props.index + 1),
          //       );
          //       return 'handled';
          //     }
          //     return 'un-handled';
          //   }
          //   return {};
          // }}
          // onUpArrow={() => {
          //   const selectionState = editorState.getSelection();
          //   const currentCursorPosition = selectionState.getStartOffset();

          //   if (currentCursorPosition === 0) {
          //     this.props.onFocusPreviousBlock(this.props.block, this.node);
          //   }
          // }}
          // onDownArrow={() => {
          //   const selectionState = editorState.getSelection();
          //   const currentCursorPosition = selectionState.getStartOffset();
          //   const blockLength = editorState
          //     .getCurrentContent()
          //     .getFirstBlock()
          //     .getLength();

          //   if (currentCursorPosition === blockLength) {
          //     props.onFocusNextBlock(this.props.block, this.node);
          //   }
          // }}
        />
        <InlineToolbar />
      </>
    );
  }
};

Textbody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
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

export default Textbody;
