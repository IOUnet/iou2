import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      marginRight: 0,
      marginLeft: 0,
      userSelect: 'none',
    },
    label: {
      width: '100%',
    },
    labelPlacementStart: {
      marginRight: 0,
      marginLeft: 0,
    },
    checkbox: {
      padding: theme.spacing(1),
      borderRadius: 2 * theme.shape.borderRadius,
    },
  });

export default styles;
