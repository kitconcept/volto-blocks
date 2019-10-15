import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Grid, Segment } from 'semantic-ui-react';
import TeaserData from '../TeaserGrid/TeaserData';
import TeaserHeroVariations from './TeaserHeroVariations';

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
      </Segment>
    </>
  );
};

TeaserHeroData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
  onChangeTile: PropTypes.func.isRequired,
};

export default injectIntl(TeaserHeroData);
