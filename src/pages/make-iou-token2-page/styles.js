import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    descriptionSection: {
      padding: theme.spacing(0.5, 2),
      '& > * + *': {
        marginTop: theme.spacing(0.5),
      },
    },
    title: {
      fontSize: '1.5rem',
      lineHeight: 1.167,
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
      display: 'flex',
      justifyContent: 'stretch',
      '& > button:first-child': {
        width: theme.spacing(15),
        flexShrink: 0,
      },
      '& > button:last-child': {
        marginLeft: theme.spacing(2),
      },
    },
  });

export default styles;
