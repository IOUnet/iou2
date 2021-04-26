import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      overflowX: 'hidden',
    },
    label: {
      top: '8px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    input: {
      height: 'unset',
      padding: theme.spacing(0.5, 2),
      borderTopLeftRadius: 1.5 * theme.shape.borderRadius,
      borderTopRightRadius: 1.5 * theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.09),
      '& > input': {
        padding: theme.spacing(0.5, 0),
        fontSize: '1.375rem',
        lineHeight: 1.273,
        color: theme.palette.iou.text,
      },
    },
  });

export default styles;
