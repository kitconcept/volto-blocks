import React from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { CheckboxWidget } from '@plone/volto/components';
import TeaserData from '../Grid/TeaserData';
import TeaserHeroVariations from './TeaserHeroVariations';

const messages = defineMessages({
  isPadded: {
    id: 'ispadded',
    defaultMessage: 'Add padding',
  },
});

const TeaserHeroData = ({
  data,
  tile,
  onChangeTile,
  required = false,
  intl,
}) => {
  return (
    <>
      <TeaserData data={data} tile={tile} onChangeTile={onChangeTile} />
      <Segment className="form sidebar-image-data">
        <Form.Field inline>
          <Grid>
            <Grid.Row>
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor="field-align">
                    <FormattedMessage
                      id="Variation"
                      defaultMessage="Variation"
                    />
                  </label>
                </div>
              </Grid.Column>
              <Grid.Column width="8" className="align-tools">
                <TeaserHeroVariations
                  variation={data.variation}
                  onChangeTile={onChangeTile}
                  data={data}
                  tile={tile}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>

        <CheckboxWidget
          id="isPadded"
          title={intl.formatMessage(messages.isPadded)}
          value={data.isPadded ? data.isPadded : false}
          onChange={(name, value) => {
            onChangeTile(tile, {
              ...data,
              isPadded: value,
            });
          }}
        />
      </Segment>
    </>
  );
};

TeaserHeroData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TeaserHeroData);
