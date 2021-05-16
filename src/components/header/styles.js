import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
    },
    mainLink: {
      marginRight: 'auto',
    },
    title: {
      color: theme.palette.common.white,
      letterSpacing: '0.4px',
    },
    button: {
      margin: 0,
      width: theme.spacing(3),
      height: theme.spacing(3),
      '& path': {
        fill: fade(theme.palette.common.white, 0.74),
      },
    },
    button_active: {
      '& path': {
        fill: theme.palette.secondary.main,
      },
    },
    toolbar: {
      '& > * + *': {
        marginLeft: theme.spacing(3),
      },
    },
  });

export default styles;
