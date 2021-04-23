import { createStyles, } from '@material-ui/core/styles';

const headerHight = '56px';
const styles = () =>
  createStyles({
    root: {
      height: '100vh',
      padding: 0,
    },
    main: {
      position: 'relative',
      height: `calc(100% - ${headerHight})`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      // overflowY: 'scroll',
    },
  });

export default styles;
