import React from 'react';
import { Button } from 'semantic-ui-react';
import cx from 'classnames';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

const View = ({ data, isEditMode }) => {
  let link = data?.href ? (
    isInternalURL(data.href) ? (
      <ConditionalLink to={flattenToAppURL(data.href)} condition={!isEditMode}>
        <Button className={(cx('button'), data.align)}>{data.title}</Button>
      </ConditionalLink>
    ) : (
      <a href={flattenToAppURL(data.href)}>
        <Button className={(cx('button'), data.align)}>{data.title}</Button>
      </a>
    )
  ) : (
    <Button className={cx({ noLink: !data.href })}>{data.title}</Button>
  );

  return <div className={cx(`block button align ${data.align}`)}>{link}</div>;
};

export default View;
