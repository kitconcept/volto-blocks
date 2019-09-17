import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Message } from 'semantic-ui-react';

const TemplateChooser = ({ templates, onSelectTemplate }) => {
  return (
    <div classaName="template-chooser">
      <Message>
        <Grid columns="4">
          {templates.map((template, index) => (
            <Grid.Column>
              <Button
                className="template-chooser-item"
                onClick={() => onSelectTemplate(index)}
              >
                <img src={template.image} alt="" />
                <div className="template-chooser-title">{template.text}</div>
              </Button>
            </Grid.Column>
          ))}
        </Grid>
      </Message>
    </div>
  );
};

TemplateChooser.propTypes = {
  templates: PropTypes.array.isRequired,
  onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateChooser;
