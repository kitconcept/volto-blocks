import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Segment } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { isObject, mapValues } from 'lodash';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon, TextWidget } from '@plone/volto/components';
import { getContent } from '@plone/volto/actions';
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

// This prevents any server information be saved in the object by recursivelly call
// `flattenToAppURL` in every `download` property
export const recursiveFlattenToAppURL = (obj) =>
  mapValues(obj, (value, key) => {
    if (key === 'download') {
      return flattenToAppURL(value);
    } else if (isObject(value)) {
      return recursiveFlattenToAppURL(value);
    } else {
      return value;
    }
  });

const MultiSourceWidget = (props) => {
  const { data, block, onChangeBlock, openObjectBrowser } = props;
  const intl = useIntl();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // This is the "updater", ensures the data is correct on edit -> select the block
    if (data.hrefList?.length > 0) {
      Promise.all(
        data.hrefList.map((item) =>
          dispatch(getContent(item.url, null, item.id)),
        ),
      ).then((result) => {
        onChangeBlock(block, {
          ...data,
          hrefList: data.hrefList.map((oldItem, index) => ({
            ...oldItem,
            title: result[index].title,
            nav_title: result[index]?.nav_title,
            description: result[index].description,
            // We get all the object, for being ready for scrset implementations
            preview_image: result[index].preview_image
              ? recursiveFlattenToAppURL(result[index].preview_image)
              : null,
          })),
        });
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const getSelectedContent = ({ url, blockID }) =>
    dispatch(getContent(url, null, blockID));

  const onDragEnd = (result) => {
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
              onSelectItem: (url) => {
                const selectedItem = { url, id: uuid() };
                // We get the full content on the fly (no store) then grab the desired
                // values, store them in the formData
                getSelectedContent(selectedItem).then((resp) => {
                  onChangeBlock(block, {
                    ...data,
                    hrefList: [
                      ...(data.hrefList || []),
                      {
                        ...selectedItem,
                        title: resp.title,
                        nav_title: resp?.nav_title,
                        description: resp.description,
                        preview_image: resp.preview_image
                          ? recursiveFlattenToAppURL(resp.preview_image)
                          : null,
                      },
                    ],
                  });
                });
              },
            })
          }
        />
      </Segment>
      <Segment className="form sidebar-teaser-data">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={uuid()} direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.hrefList &&
                  data.hrefList.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
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
                              onClick={(e) => removeItem(e, index)}
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
