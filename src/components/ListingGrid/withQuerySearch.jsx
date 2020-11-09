import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getContent, getQueryStringResults } from '@plone/volto/actions';
import { Pagination } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import { isEqual } from 'lodash';

import { usePrevious } from '@kitconcept/volto-blocks/helpers';
import { blocks, settings } from '~/config';

function withQuerySearch(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      const { data, pathname } = this.props;
      if (data?.query?.length > 0) {
        this.props.getQueryStringResults(
          pathname,
          { ...data, fullobjects: 1 },
          data.block,
        );
      } else if (
        data.template === 'imageGallery' &&
        data?.query?.length === 0
      ) {
        this.props.getQueryStringResults(
          pathname,
          {
            ...data,
            fullobjects: 1,
            query: [
              {
                i: 'path',
                o: 'plone.app.querystring.operation.string.relativePath',
                v: '',
              },
            ],
          },
          data.block,
        );
      }
    }
    componentDidUpdate(nextProps) {
      if (
        nextProps.data.query !== this.props.data.query &&
        nextProps.pathname !== this.props.pathname
      ) {
        const { data, path } = this.props;
        if (data?.query?.length > 0) {
          this.props.getQueryStringResults(
            path,
            { ...data, fullobjects: 1 },
            data.block,
          );
        } else if (
          data.template === 'imageGallery' &&
          data?.query?.length === 0
        ) {
          this.props.getQueryStringResults(
            path,
            {
              ...data,
              fullobjects: 1,
              query: [
                {
                  i: 'path',
                  o: 'plone.app.querystring.operation.string.relativePath',
                  v: '',
                },
              ],
            },
            data.block,
          );
        }
      }
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          querystringResults={this.props.querystringResults}
          {...this.props}
        />
      );
    }
  };
}

export default compose(
  connect(
    (state) => ({
      content: state.content.data,
      querystringResults: state.querystringsearch.subrequests,
      pathname: state.router.location.pathname,
    }),
    {
      getQueryStringResults,
    },
  ),
  withQuerySearch,
);
