import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      color: fade(theme.palette.common.black, 0.87),
      '& input': {
        padding: theme.spacing(1.75),
        lineHeight: 1.5,
      },
      '& label': {
        top: '-4px',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -1px) scale(0.75)',
      },
    },
  });

export default styles;
