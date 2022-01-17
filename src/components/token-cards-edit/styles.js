import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {},
    title: {
      padding: theme.spacing(0, 2),
    },
    list: {
      '& > div + div': {
        marginTop: theme.spacing(1),
      },
    },
    listItem: {
      padding: 0,
      borderRadius: 2 * theme.shape.borderRadius,
      '&.Mui-selected': {
        boxShadow: `0 0 3px 2px ${theme.palette.primary.main}`,
      }
    },
  });

export default styles;
