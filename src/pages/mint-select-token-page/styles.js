import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    selectSection: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2),
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& button': {
        width: theme.spacing(15),
        paddingTop: theme.spacing(4.125),
        paddingBottom: theme.spacing(4.125),
      },
    },
    text: {
      flexGrow: 1,
      fontSize: '1.5rem',
      lineHeight: 1.167,
    },
    listSection: {},
  });

export default styles;
