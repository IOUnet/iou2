import { createStyles, } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      minHeight: '100vh',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  });

export default styles;
