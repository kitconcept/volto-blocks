import { Accordion, Button, Segment } from 'semantic-ui-react';

import React from 'react';
import { Icon as VoltoIcon, FormFieldWrapper } from '@plone/volto/components';
import { DragDropList } from '../../components';
import ObjectWidget from './ObjectWidget';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import './style.less';

const ObjectListInlineWidget = (props) => {
  const { id, schema, value = [], onChange, schemaExtender } = props;
  const [activeColumn, setActiveColumn] = React.useState(0);

  function handleChangeColumn(e, blockProps) {
    const { index } = blockProps;
    const newIndex = activeColumn === index ? -1 : index;

    setActiveColumn(newIndex);
  }
  const objectSchema = schema(props);
  return (
    <div className="objectlist-widget">
      <FormFieldWrapper {...props}>
        <div className="add-item-button-wrapper">
          <Button
            compact
            icon
            onClick={() => {
              onChange(id, [
                ...value,
                {
                  '@id': uuid(),
                },
              ]);
              setActiveColumn(value.length);
            }}
          >
            <VoltoIcon name={addSVG} size="18px" />
            &nbsp;
            {/* Custom addMessage in schema, else default to english */}
            {objectSchema.addMessage || `Add ${objectSchema.title}`}
          </Button>
        </div>
      </FormFieldWrapper>
      <DragDropList
        childList={value.map((o) => [o['@id'], o])}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }

          const first = value[source.index];
          const second = value[destination.index];
          value[destination.index] = first;
          value[source.index] = second;

          onChange(id, value);
          return true;
        }}
      >
        {({ child, childId, index, draginfo }) => {
          return (
            <div
              ref={draginfo.innerRef}
              {...draginfo.draggableProps}
              key={childId}
            >
              <Accordion key={index} fluid styled>
                <Accordion.Title
                  active={activeColumn === index}
                  index={index}
                  onClick={handleChangeColumn}
                >
                  <button
                    style={{
                      visibility: 'visible',
                      display: 'inline-block',
                    }}
                    {...draginfo.dragHandleProps}
                    className="drag handle"
                  >
                    <VoltoIcon name={dragSVG} size="18px" />
                  </button>

                  <div className="accordion-title-wrapper">
                    {`${objectSchema.title} #${index + 1}`}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        onChange(
                          id,
                          value.filter((v, i) => i !== index),
                        );
                      }}
                    >
                      <VoltoIcon name={deleteSVG} size="20px" color="#e40166" />
                    </button>
                    {activeColumn === index ? (
                      <VoltoIcon name={upSVG} size="20px" />
                    ) : (
                      <VoltoIcon name={downSVG} size="20px" />
                    )}
                  </div>
                </Accordion.Title>
                <Accordion.Content active={activeColumn === index}>
                  <Segment>
                    <ObjectWidget
                      id={`${id}-${index}`}
                      key={`ow-${id}-${index}`}
                      schema={
                        schemaExtender
                          ? schemaExtender(schema, child)
                          : objectSchema
                      }
                      value={child}
                      onChange={(fi, fv) => {
                        const newvalue = value.map((v, i) =>
                          i !== index ? v : fv,
                        );
                        onChange(id, newvalue);
                      }}
                    />
                  </Segment>
                </Accordion.Content>
              </Accordion>
            </div>
          );
        }}
      </DragDropList>
    </div>
  );
};
export default withObjectBrowser(ObjectListInlineWidget);
