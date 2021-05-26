import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { setFilter } from '../../redux/filter/filter-actions';

const useStyles = createUseStyles({
  filter: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  label: {
    marginBottom: 10,
  },
});

const Filter = () => {
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFilterChange = e => {
    const value = e.target.value;

    dispatch(setFilter(value));
    setState(value);
  };

  return (
    <>
      <label className={classes.filter}>
        <span className={classes.label}>Find contacts by name</span>
        <input value={state} onChange={handleFilterChange} type="text" />
      </label>
    </>
  );
};

export default Filter;
