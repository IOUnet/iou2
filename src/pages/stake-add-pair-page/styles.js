import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    infoSection: {
      padding: theme.spacing(1, 2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    title: {
      fontSize: '1.5rem',
      lineHeight: 1.167,
    },
    selectSection: {
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
    },
  });

export default styles;
