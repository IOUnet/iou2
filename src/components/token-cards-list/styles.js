import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
      padding: theme.spacing(1, 0),
    },
    title: {
      padding: theme.spacing(0, 2),
      fontSize: '1.5rem',
      lineHeight: 1.25,
    },
    list: {
      height: 'calc(100% - 1.25 * 1.5rem)',
      padding: theme.spacing(0.5, 0.5),
      '& > div + div': {
        marginTop: theme.spacing(1),
      },
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: theme.spacing(1),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400],
        borderRadius: theme.spacing(0.5),
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: theme.spacing(0.5),
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
