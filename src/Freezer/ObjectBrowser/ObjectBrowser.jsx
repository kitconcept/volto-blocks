/* eslint-disable */

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ObjectBrowserInner from './ObjectBrowserInner';

const DEFAULT_TIMEOUT = 500;

const ObjectBrowser = (props) => {
  return (
    <CSSTransition
      in={props.objectBrowserIsOpen}
      timeout={DEFAULT_TIMEOUT}
      classNames="object-browser-container"
      unmountOnExit
    >
      <ObjectBrowserInner {...props} />
    </CSSTransition>
  );
};

export default ObjectBrowser;
