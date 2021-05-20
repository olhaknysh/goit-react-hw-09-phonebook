import { createUseStyles } from 'react-jss';

import image from '../../utils/images/phonebook..png';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img width="200" src={image} alt="" />
      <h1>Welcome to awesome PhoneBook!</h1>
    </div>
  );
};

export default HomePage;
