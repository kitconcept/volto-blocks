import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';

import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

const TeaserData = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const blockID = data.id || block;
  const prevDataHref = React.useRef(data?.href);

  React.useEffect(() => {
    if (data.href && !data.title && !data.description && !data.preview_image) {
      dispatch(getContent(data.href, null, blockID)).then((resp) => {
        onChangeBlock(blockID, {
          ...data,
          migrated: true,
          ...(!data.title && { title: resp.title }),
          ...(!data.description && { description: resp.description }),
          ...(!data.preview_image && { preview_image: resp.preview_image }),
        });
      });
    }
    // The data changes, since we are subscribed (its parent TeaserBody) to the store change,
    // then on select it triggers a change anyways)
    if (data.href && data.href !== prevDataHref.current && data?.migrated) {
      dispatch(getContent(data.href, null, blockID)).then((resp) => {
        onChangeBlock(blockID, {
          ...data,
          title: resp.title,
          description: resp.description,
          preview_image: resp.preview_image,
        });
      });
    }
    prevDataHref.current = data.href;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.href]);

  return (
    <>
      <Segment className="form sidebar-image-data">
        <TextWidget
          id={`source-${data.index}`}
          title={intl.formatMessage(messages.Source)}
          required={false}
          value={data.href}
          icon={data.href ? clearSVG : navTreeSVG}
          iconAction={
            data.href
              ? () => {
                  onChangeBlock(block, {
                    ...data,
                    href: '',
                    title: '',
                    description: '',
                    preview_image: '',
                    headline: '',
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
        {data?.href && (
          <>
            <TextWidget
              id={`headline-${data.index}`}
              title={intl.formatMessage(messages.Headline)}
              required={false}
              value={data.headline}
              icon={data.headline && clearSVG}
              iconAction={() => {
                onChangeBlock(block, {
                  ...data,
                  headline: '',
                });
              }}
              onChange={(name, value) => {
                onChangeBlock(block, {
                  ...data,
                  headline: value,
                });
              }}
            />
            <TextWidget
              id={`title-${data.index}`}
              title={intl.formatMessage(messages.title)}
              required={false}
              value={data.title}
              icon={data.title && clearSVG}
              iconAction={() =>
                onChangeBlock(block, {
                  ...data,
                  title: '',
                })
              }
              onChange={(name, value) => {
                onChangeBlock(block, {
                  ...data,
                  title: value,
                });
              }}
            />
            <TextWidget
              id={`description-${data.index}`}
              title={intl.formatMessage(messages.description)}
              required={false}
              value={data.description}
              icon={data.description && clearSVG}
              iconAction={() =>
                onChangeBlock(block, {
                  ...data,
                  description: '',
                })
              }
              onChange={(name, value) => {
                onChangeBlock(block, {
                  ...data,
                  description: value,
                });
              }}
            />
          </>
        )}
        <CheckboxWidget
          id="openLinkInNewTab"
          title={intl.formatMessage(messages.openLinkInNewTab)}
          value={data.openLinkInNewTab ? data.openLinkInNewTab : false}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              openLinkInNewTab: value,
            });
          }}
        />
      </Segment>
    </>
  );
};

TeaserData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default withObjectBrowser(TeaserData);
