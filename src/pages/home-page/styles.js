import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    top_tagline: {
      display: 'flex',
      padding: theme.spacing(1, 2, 2, 2.5),
      '& > *': {
        fontSize: '1.125rem',
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
    },
    button_group_container: {
      justifyContent: 'flex-end',
    },
    button_group_item: {
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        width: theme.spacing(16),
        height: theme.spacing(11.5),
      },
    },
    bottom_tagline: {
      marginTop: 'auto',
      padding: theme.spacing(1, 4),
      '& > *': {
        fontSize: '1.5rem',
        lineHeight: 1.167,
      },
    },
  });

export default styles;
