import React from 'react';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';

const withStyleWrapper = (Component) => ({ ...props }) => {
  return (
    <div
      className={cx({
        'full-width': props.data.useFullBackgroundContainer,
        [`custom-style-${props.data.bg_color?.replace('#', '')}`]: props.data
          .bg_color,
      })}
    >
      {/* This container is to maintain the style cascade consistent with the `full-width` hack */}
      <Container>
        <Component {...props} />
      </Container>
    </div>
  );
};

export default withStyleWrapper;
