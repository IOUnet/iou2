import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    selectSection: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2),
      '& > * + *': {
        marginLeft: theme.spacing(1),
      },
      '& button': {
        width: theme.spacing(15),
        height: theme.spacing(12),
      },
    },
    text: {
      flexGrow: 1,
      fontSize: '1.5rem',
      lineHeight: 1.167,
    },
    listSection: {
      position: 'relative',
      height: 'calc(100% - 112px - 8px - 8px - 2 * 4px)',
    }
  });

export default styles;
