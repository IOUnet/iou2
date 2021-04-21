import { createStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      height: '100vh',
      padding: 0,
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

export default styles;
