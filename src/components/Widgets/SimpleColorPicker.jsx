import React from 'react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import clearSVG from '@plone/volto/icons/clear.svg';

import loadable from '@loadable/component';
const GithubPicker = loadable(() => import('react-color/lib/Github'));

export default (props) => {
  const { id, value, onChange, availableColors } = props;
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="simple-color-picker-widget"
    >
      <div style={{ paddingTop: '10px' }}>
        <Button.Group>
          <Button
            color={value}
            style={{ backgroundColor: value }}
            onClick={() => setShowPicker(true)}
            size="huge"
            title="Pick color"
          >
            {''}
          </Button>
          <Button
            compact
            style={{ paddingLeft: '8px', paddingRight: '0px' }}
            onClick={() => onChange(id, null)}
          >
            <Icon name={clearSVG} size="18px" color="red" />
          </Button>
        </Button.Group>

        {showPicker ? (
          <GithubPicker
            width="220px"
            triangle="top"
            className="color-picker"
            colors={availableColors}
            color={value || '#000'}
            onChangeComplete={(value) => {
              setShowPicker(false);
              onChange(id, value.hex);
            }}
          />
        ) : (
          ''
        )}
      </div>
    </FormFieldWrapper>
  );
};
