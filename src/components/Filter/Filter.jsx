import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  filter: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 10,
  },
});

const Filter = ({ onFilterChange }) => {
  const [state, setState] = useState('');
  const classes = useStyles();

  const handleFilterChange = e => {
    const value = e.target.value;
    setState(value);
    onFilterChange(value);
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

Filter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default Filter;
