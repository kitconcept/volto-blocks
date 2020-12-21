import React from 'react';
import { styleWrapperSchemaEnhancer } from './schema';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';
import { MaybeWrap } from '..';

const withStyleWrapper = (Component) => ({ ...props }) => {
  return (
    <div
      className={cx({ 'full-width': props.data.useFullBackgroundContainer })}
      style={{ backgroundColor: props.data.bg_color }}
    >
      <MaybeWrap
        as={Container}
        wrap={
          props.data.useFullBackgroundContainer && !props.data.useBigContainer
        }
      >
        <Component {...props} schemaEnhancer={styleWrapperSchemaEnhancer} />
      </MaybeWrap>
    </div>
  );
};

export default withStyleWrapper;
