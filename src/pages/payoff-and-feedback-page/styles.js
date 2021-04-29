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
        marginTop: theme.spacing(4),
      },
    },
    numberInput: {
      display: 'flex',
      alignItems: 'flex-end',
      '& > p': {
        marginLeft: theme.spacing(1),
        flexShrink: 0,
        fontSize: '0.75rem',
        lineHeight: 2,
      },
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
    },
  });

export default styles;
