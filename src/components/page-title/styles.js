import { createStyles, } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      fontSize: '1.5rem',
      lineHeight: 1.167,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });

export default styles;
