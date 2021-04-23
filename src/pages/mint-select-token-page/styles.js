import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    selectSection: {
      alignSelf: 'stretch',
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
  });

export default styles;
