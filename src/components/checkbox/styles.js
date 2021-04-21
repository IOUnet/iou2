import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      // width: '100%',
      // height: '100%',
    },
    label: {
      // color: theme.palette.common.white,
      // lineHeight: 1.14,
      // letterSpacing: '1.25px',
    },
    checkbox: {
      padding: theme.spacing(1),
      borderRadius: 2 * theme.shape.borderRadius,
    },
  });

export default styles;
