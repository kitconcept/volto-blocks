import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Select from 'react-select';
import { toPairs, groupBy, map } from 'lodash';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import QuerystringWidget, {
  customSelectStyles,
  selectTheme,
  DropdownIndicator,
  Option,
} from './QuerystringWidget';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  SortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  reversedOrder: {
    id: 'Reversed order',
    defaultMessage: 'Reversed order',
  },
  limit: {
    id: 'Results limit',
    defaultMessage: 'Results limit',
  },
  itemBatchSize: {
    id: 'Item batch size',
    defaultMessage: 'Item batch size',
  },
  NoSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
});

const ListingData = ({
  data,
  tile,
  onChangeTile,
  openObjectBrowser,
  required = false,
  intl,
}) => {
  const sortable_indexes = useSelector(
    state => state.querystring.sortable_indexes,
  );
  const [limit, setLimit] = React.useState(data.limit || '');
  const [itemBatchSize, setItemBatchSize] = React.useState(data.b_size || '');

  return (
    <>
      <Segment className="form sidebar-listing-data">
        <QuerystringWidget
          id="source"
          title={intl.formatMessage(messages.Source)}
          required={false}
          value={data.query || []}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              query: value,
            });
          }}
        />

        <Form.Field inline id="field-listingtile-sort-on">
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor="select-listingtile-sort-on">
                    {intl.formatMessage(messages.SortOn)}
                  </label>
                </div>
              </Grid.Column>
              <Grid.Column width="8">
                <Select
                  id="select-listingtile-sort-on"
                  name="select-listingtile-sort-on"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  // placeholder="Select criteria"
                  options={[
                    {
                      label: intl.formatMessage(messages.NoSelection),
                      value: '',
                    },
                    ...map(
                      toPairs(
                        groupBy(
                          toPairs(sortable_indexes),
                          item => item[1].group,
                        ),
                      ),
                      group => ({
                        label: group[0],
                        options: map(group[1], field => ({
                          label: field[1].title,
                          value: field[0],
                        })),
                      }),
                    ),
                  ]}
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  value={{
                    value: data.sort_on || '',
                    label:
                      data.sort_on && sortable_indexes
                        ? sortable_indexes[data.sort_on]?.title
                        : data.sort_on ||
                          intl.formatMessage(messages.NoSelection),
                  }}
                  onChange={field => {
                    onChangeTile(tile, {
                      ...data,
                      sort_on: field.value,
                    });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>

        <CheckboxWidget
          id="listingtile-sort-on-reverse"
          title={intl.formatMessage(messages.reversedOrder)}
          value={data.sort_order ? data.sort_order : false}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              sort_order: value,
            });
          }}
        />

        <TextWidget
          id="limit"
          title={intl.formatMessage(messages.limit)}
          required={false}
          value={limit}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              limit: value,
            });
            setLimit(value);
          }}
        />

        <TextWidget
          id="itembatchsize"
          title={intl.formatMessage(messages.itemBatchSize)}
          required={false}
          value={itemBatchSize}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              b_size: value,
            });
            setItemBatchSize(value);
          }}
        />
      </Segment>
    </>
  );
};

ListingData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default compose(
  withObjectBrowser,
  injectIntl,
)(ListingData);
