import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    cardSection: {
      padding: theme.spacing(1, 0.5),
    },
    dataSection: {
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    valueInfo: {
      alignSelf: 'flex-end',
      paddingBottom: theme.spacing(0.75),
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginTop: theme.spacing(2.5),
      },
    },
  });

export default styles;
