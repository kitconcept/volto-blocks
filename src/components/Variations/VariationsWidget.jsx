import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import config from '@plone/volto/registry';
import { find } from 'lodash';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

const Select = loadable(() => import('react-select'));

const messages = defineMessages({
  Variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

const VariationsWidget = ({ data, block, onChangeBlock }) => {
  const intl = useIntl();
  const variations = config.blocks?.blocksConfig?.[data['@type']]?.variations;
  let value = data.variation || 'default';
  value = find(variations, { id: value });

  if (variations && Object.keys(variations).length > 1) {
    return (
      <Form.Field inline required={true} id="field-template">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor="select-listingblock-template">
                  {intl.formatMessage(messages.Variation)}
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Select
                id="select-listingblock-template"
                name="select-listingblock-template"
                className="react-select-container"
                classNamePrefix="react-select"
                options={variations.map((item) => {
                  return {
                    value: item.id,
                    label: intl.formatMessage({
                      id: item.title,
                      defaultMessage: item.title,
                    }),
                  };
                })}
                styles={customSelectStyles}
                theme={selectTheme}
                components={{ DropdownIndicator, Option }}
                value={{
                  value: value.id,
                  label: intl.formatMessage({
                    id: value.title,
                    defaultMessage: value.title,
                  }),
                }}
                onChange={(field) => {
                  onChangeBlock(block, {
                    ...data,
                    variation: field.value,
                  });
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    );
  }

  return <></>;
};

VariationsWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default VariationsWidget;
