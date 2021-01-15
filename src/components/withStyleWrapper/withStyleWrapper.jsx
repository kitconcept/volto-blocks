import React from 'react';
import { useIntl } from 'react-intl';
import { styleWrapperSchemaEnhancer } from './schema';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';
import { MaybeWrap } from '..';

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
      <MaybeWrap
        as={Container}
        wrap={
          props.data.useFullBackgroundContainer && !props.data.useLargeContainer
        }
      >
        <Component
          {...props}
          schemaEnhancer={styleWrapperSchemaEnhancer(intl)}
        />
      </MaybeWrap>
    </div>
  );
};

export default withStyleWrapper;
