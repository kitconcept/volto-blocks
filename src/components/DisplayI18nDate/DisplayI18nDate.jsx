import React from 'react';
import { useSelector } from 'react-redux';
import { parse } from 'date-fns';

const DisplayI18nDate = ({ date }) => {
  const language = useSelector((state) => state.intl.locale);

  return (
    <>
      {new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(parse(date))}
    </>
  );
};

export default DisplayI18nDate;
