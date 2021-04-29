import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    dataSection: {
      padding: theme.spacing(0.5, 2),
      '& > * + *': {
        marginTop: theme.spacing(0.5),
      },
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
      display: 'flex',
      justifyContent: 'flex-end',
      '& > button': {
        width: theme.spacing(15),
      },
    },
  });

export default styles;
