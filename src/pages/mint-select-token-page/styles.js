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
    listSection: {
      padding: theme.spacing(1, 0.5),
    },
  });

export default styles;
