import React from 'react';
import { useSelector } from 'react-redux';
import { parse } from 'date-fns';

const EffectiveDate = ({ item }) => {
  const language = useSelector((state) => state.intl.locale);

  return (
    <>
      {item?.EffectiveDate !== 'None' && item?.effective ? (
        <span className="day">
          {new Intl.DateTimeFormat(language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(parse(item.effective))}
        </span>
      ) : (
        <span className="day"></span>
      )}
    </>
  );
};

export default EffectiveDate;
