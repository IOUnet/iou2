import { createStyles } from '@mui/styles';

const styles = (theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0.5),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    text: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });

export default styles;
