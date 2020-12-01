import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import ObjWidgt from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

const ObjectBrowserWidget = (props) =>
  compose(injectIntl, withObjectBrowser)((props) => <ObjWidgt {...props} />);
export default ObjectBrowserWidget;
