import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      borderRadius: 2 * theme.shape.borderRadius,
      backgroundColor: '#F0F0F0',
      color: theme.palette.iou.text,
    },
    content: {
      padding: theme.spacing(1.5, 2),
      '&:last-child': {
        paddingBottom: theme.spacing(1.5),
      },
    },
    title: {
      lineHeight: 1.25,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    token_data: {
      display: 'flex',
      marginTop: theme.spacing(0.5),
      '& > div + div': {
        marginLeft: theme.spacing(1),
      }
    },
    description: {
      flexGrow: 1,
      color: fade(theme.palette.iou.text, 0.54),
      '& > p': {
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.005em',
      }
    },
    data: {
      width: theme.spacing(8.75),
      '& > p': {
        fontSize: '0.75rem',
        lineHeight: 1.333,
        fontWeight: theme.typography.fontWeightMedium,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
  });

export default styles;
