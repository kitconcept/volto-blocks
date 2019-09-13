import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Message } from 'semantic-ui-react';

import imageGridTemplate1 from './image-grid-1.svg';
import imageGridTemplate2 from './image-grid-2.svg';
import imageGridTemplate3 from './image-grid-3.svg';
import imageGridTemplate4 from './image-grid-4.svg';

const TemplateChooser = props => {
  return (
    <div classaName="template-chooser">
      <Message>
        <Grid columns="4">
          <Grid.Column>
            <Button
              className="template-chooser-item"
              onClick={() => props.onSelectTemplate(1)}
            >
              <img src={imageGridTemplate1} alt="" />
              <div className="template-chooser-title">1 image</div>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              className="template-chooser-item"
              onClick={() => props.onSelectTemplate(2)}
            >
              <img src={imageGridTemplate2} alt="" />
              <div className="template-chooser-title">2 images</div>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              className="template-chooser-item"
              onClick={() => props.onSelectTemplate(3)}
            >
              <img src={imageGridTemplate3} alt="" />
              <div className="template-chooser-title">3 images</div>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              className="template-chooser-item"
              onClick={() => props.onSelectTemplate(4)}
            >
              <img src={imageGridTemplate4} alt="" />
              <div className="template-chooser-title">4 images</div>
            </Button>
          </Grid.Column>
        </Grid>
      </Message>
    </div>
  );
};

TemplateChooser.propTypes = {
  onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateChooser;
