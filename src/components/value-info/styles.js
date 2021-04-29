import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'stretch',
    },
    label: {
      width: theme.spacing(11),
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.75rem',
      lineHeight: 1.6,
      color: fade(theme.palette.iou.text, 0.54),
    },
    value: {
      paddingLeft: theme.spacing(1),
      minWidth: theme.spacing(5),
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.375rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
  });

export default styles;
