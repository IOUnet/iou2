import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    top_tagline: {
      display: 'flex',
      padding: theme.spacing(1, 2, 2, 2.5),
      '& > *': {
        fontSize: theme.spacing(2.25),
        lineHeight: 1.167,
      },
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    brand: {
      width: '95px',
      height: 'auto',
    },
    button_group: {
      padding: theme.spacing(2.5, 4.25, 0.5, 4.25),
      '& button': {
        width: theme.spacing(16),
        height: theme.spacing(11.5),
      },
    },
    bottom_tagline: {
      padding: theme.spacing(1, 4),
      '& > *': {
        fontSize: theme.spacing(3),
        lineHeight: 1.167,
      },
    },
  });

export default styles;