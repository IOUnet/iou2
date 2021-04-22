import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      alignSelf: 'stretch',
      padding: theme.spacing(1, 0.5),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    text: {
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });

export default styles;
