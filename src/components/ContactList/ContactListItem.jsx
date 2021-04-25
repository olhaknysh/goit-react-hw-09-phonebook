import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  contact: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  button: {
    marginLeft: 10,
  },
});

const ContactListItem = ({ id, name, number, onDelete }) => {
  const classes = useStyles();
  const handleDelete = () => onDelete(id);

  return (
    <li className={classes.contact}>
      <p>
        {name} : {number}
      </p>
      <button className={classes.button} type="button" onClick={handleDelete}>
        X
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  oonDelete: PropTypes.func,
};

export default ContactListItem;
