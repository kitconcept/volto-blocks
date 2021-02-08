import React from 'react';
import { useIntl } from 'react-intl';
import { styleWrapperSchemaEnhancer } from './schema';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';

const withStyleWrapper = (Component) => ({ ...props }) => {
  const intl = useIntl();

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
        <Component
          {...props}
          // The enhancer is a function that returns a schema enhancer function
          schemaEnhancer={styleWrapperSchemaEnhancer(props.data['@type'], intl)}
        />
      </Container>
    </div>
  );
};

export default withStyleWrapper;
