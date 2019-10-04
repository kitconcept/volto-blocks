import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Message } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const TemplateChooser = ({ templates, onSelectTemplate, intl }) => {
  return (
    <div classaName="template-chooser">
      <Message>
        <Grid columns={templates.length}>
          {templates.map((template, index) => (
            <Grid.Column key={template.id}>
              <Button
                className="template-chooser-item"
                onClick={() => onSelectTemplate(index)}
              >
                <img src={template.image} alt="" />
                <div className="template-chooser-title">
                  {intl.formatMessage({
                    id: template.id,
                    defaultMessage: template.title,
                  })}
                </div>
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

export default injectIntl(TemplateChooser);
