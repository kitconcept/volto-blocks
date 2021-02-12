import React from 'react';
import PropTypes from 'prop-types';
import { TextWidget } from '@plone/volto/components';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Segment, Grid, Form } from 'semantic-ui-react';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import AlignButtonBlock from './AlignButtonBlock';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  ButtonTitle: {
    id: 'ButtonTitle',
    defaultMessage: 'Button Title',
  },
  ButtonLink: {
    id: 'ButtonLink',
    defaultMessage: 'Button Link',
  },
});

const ButtonData = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  resetSubmitUrl,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const blockID = data.id || block;

  React.useEffect(() => {
    if (data.href) {
      dispatch(getContent(data.href, null, blockID));
    }
  }, [dispatch, data, blockID]);

  return (
    <Segment className="form sidebar-button-data">
      <TextWidget
        id="button-title"
        title={intl.formatMessage(messages.ButtonTitle)}
        required={true}
        value={data.title}
        onChange={(name, value) => {
          onChangeBlock(block, {
            ...data,
            title: value,
          });
        }}
      />
      <TextWidget
        id="button-link"
        title={intl.formatMessage(messages.ButtonLink)}
        required={false}
        value={data.href ? flattenToAppURL(data.href) : ''}
        icon={data.href ? clearSVG : navTreeSVG}
        iconAction={
          data.href
            ? () => {
                onChangeBlock(block, {
                  ...data,
                  href: '',
                });
              }
            : () => openObjectBrowser({ mode: 'link' })
        }
        onChange={(name, value) => {
          onChangeBlock(block, {
            ...data,
            href: value,
          });
        }}
      />
      <Form.Field inline className="button-align" required={required}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor="field-align">
                  <FormattedMessage id="Alignment" defaultMessage="Alignment" />
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8" className="align-tools">
              <AlignButtonBlock
                align={data.align}
                onChangeBlock={(block, data) => {
                  if (data.align === 'full') {
                    onChangeBlock(block, {
                      ...data,
                    });
                  } else {
                    onChangeBlock(block, {
                      ...data,
                    });
                  }
                }}
                data={data}
                block={block}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </Segment>
  );
};

ButtonData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default withObjectBrowser(ButtonData);
