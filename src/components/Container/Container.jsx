import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 40,
  },
});

const Container = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Container;
