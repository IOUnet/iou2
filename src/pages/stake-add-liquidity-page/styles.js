import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    selectSection: {
      padding: theme.spacing(1, 0.5),
    },
    dataSection: {
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    dataRow: {},
    dataRow_text: {
      flexShrink: 0,
      marginLeft: theme.spacing(2),
      width: theme.spacing(12),
      paddingBottom: theme.spacing(0.5),
      fontSize: '0.75rem',
      lineHeight: 1.6,
      color: fade(theme.palette.iou.text, 0.54),
    },
    dataRow_digit: {
      flexShrink: 0,
      minWidth: theme.spacing(5),
      paddingBottom: theme.spacing(1),
      fontSize: '1.375rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
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
