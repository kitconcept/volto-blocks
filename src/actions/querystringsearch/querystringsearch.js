const GET_QUERYSTRING_RESULTS = 'GET_QUERYSTRING_RESULTS';

/**
 * Get breadcrumbs.
 * @function getBreadcrumbs
 * @param {string} query Query.
 * @returns {Object} Get querystring results action.
 */
export function getQueryStringResults(data, subrequest) {
  return {
    type: GET_QUERYSTRING_RESULTS,
    subrequest,
    request: {
      op: 'post',
      path: '/@querystring-search',
      data,
    },
  };
}
