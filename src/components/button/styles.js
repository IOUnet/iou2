import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2.75, 2),
      color: theme.palette.common.white,
      lineHeight: 1.14,
      letterSpacing: '1.25px',
      borderRadius: theme.shape.borderRadius,
    },
  });

export default styles;
