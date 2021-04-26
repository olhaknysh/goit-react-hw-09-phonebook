import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setFilter } from '../../redux/filter/filter-actions';

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

    onFilterChange(value);
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

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(setFilter(filter)),
});

Filter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
