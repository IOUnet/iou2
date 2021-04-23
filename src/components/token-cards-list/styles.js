import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.5, 0),
    },
    title: {
      padding: theme.spacing(0, 1),
      fontSize: '1.5rem',
      lineHeight: 1.25,
    },
    list: {
      padding: theme.spacing(0, 0.5),
      '& > div + div': {
        marginTop: theme.spacing(0.5),
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
