import { createStyles, fade } from '@material-ui/core/styles';

const styles = (theme) => {
  const currentColor = '#fa0a0a';
  const wL = theme.spacing(6.25);
  const hL = theme.spacing(5.25);
  return createStyles({
    root: {
      width: '100%',
    },
    slider: {},
    slider_disabled: {},
    slider_thumb: {
      '&.Mui-disabled': {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        marginTop: '-5px',
        marginLeft: '-6px',
      },
    },
    slider_rail: {
      backgroundColor: fade(currentColor, 0.6),
    },
    slider_valueLabel: {
      top: '-5px',
      left: '-19px',
      fontSize: '1rem',
      lineHeight: 1,
      letterSpacing: '0.4px',
      '& > span': {
        width: wL,
        height: hL,
        transform: 'none',
        borderRadius: `${wL}px ${wL}px ${wL}px ${wL}px / ${hL}px ${hL}px ${hL}px ${hL}px`,
        '& > span': {
          transform: 'none',
        },
      },
    },
    title: {
      marginBottom: theme.spacing(1),
      lineHeight: 1.333,
      letterSpacing: '0.4px',
    },
    icon: {},
    icon_left: {
      transform: 'rotate(180deg)',
      fill: fade(theme.palette.common.black, 0.6),
    },
    icon_right: {
      fill: fade(currentColor, 0.6),
    },
  });
}

export default styles;
