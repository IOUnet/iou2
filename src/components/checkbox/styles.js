import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {},
    label: {
      userSelect: 'none',
    },
    checkbox: {
      padding: theme.spacing(1),
      borderRadius: 2 * theme.shape.borderRadius,
    },
  });

export default styles;
