import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Segment } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

import { Icon, TextWidget } from '@plone/volto/components';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { reorderArray } from '@kitconcept/volto-blocks/helpers';
import trashSVG from '@plone/volto/icons/delete.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

const MultiSourceWidget = props => {
  const { data, block, onChangeBlock, openObjectBrowser } = props;
  const intl = useIntl();

  const onDragEnd = result => {
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

    const newlist = reorderArray(
      data.hrefList,
      source.index,
      destination.index,
    );

    onChangeBlock(block, {
      ...data,
      hrefList: newlist,
    });
  };

  const removeItem = (e, index) => {
    e.stopPropagation();
    const newlist = data.hrefList.filter((item, i) => i !== index);
    onChangeBlock(block, {
      ...data,
      hrefList: newlist,
    });
  };

  return (
    <>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id="source"
          title={intl.formatMessage(messages.Source)}
          required={false}
          // No value, since it appears in the next section
          value={''}
          icon={navTreeSVG}
          iconAction={() =>
            openObjectBrowser({
              mode: 'link',
              onSelectItem: url =>
                onChangeBlock(block, {
                  ...data,
                  hrefList: [...(data.hrefList || []), { url, id: uuid() }],
                }),
            })
          }
        />
      </Segment>
      <Segment className="form sidebar-image-data">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={uuid()} direction="vertical">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.hrefList &&
                  data.hrefList.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="data-items-listing"
                        >
                          {item.url}
                          <Button.Group>
                            <Button
                              icon
                              basic
                              onClick={e => removeItem(e, index)}
                            >
                              <Icon
                                name={trashSVG}
                                size="20px"
                                color="#e40166"
                              />
                            </Button>
                          </Button.Group>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Segment>
    </>
  );
};

MultiSourceWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withObjectBrowser(MultiSourceWidget);
