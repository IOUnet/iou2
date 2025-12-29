import { createStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

const styles = (theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
    },
    mainLink: {
      marginRight: 'auto',
    },
    title: {
      color: theme.palette.common.white,
      letterSpacing: '0.4px',
    },
    button: {
      margin: 0,
      width: theme.spacing(3),
      height: theme.spacing(3),
      '& path': {
        fill: alpha(theme.palette.common.white, 0.74),
      },
    },
    button_active: {
      '& path': {
        fill: theme.palette.secondary.main,
      },
    },
    toolbar: {
      '& > * + *': {
        marginLeft: theme.spacing(3),
      },
    },
    text: {
      color: theme.palette.common.white,
      fontSize: '0.9rem',
    },
    flexSpacer: {
      flex: 1,
    },
    badgeRow: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1.5),
      position: 'relative',
    },
    chainBadge: {
      borderColor: alpha(theme.palette.common.white, 0.4),
      color: theme.palette.common.white,
      textTransform: 'none',
      padding: theme.spacing(0.5, 1.5),
    },
    walletPill: {
      padding: theme.spacing(1, 1.5),
      borderRadius: 999,
      background: alpha(theme.palette.common.white, 0.12),
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 160,
    },
    walletText: {
      color: theme.palette.common.white,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    walletSub: {
      color: alpha(theme.palette.common.white, 0.7),
      fontSize: '0.8rem',
      lineHeight: 1.2,
    },
    walletMenu: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[4],
      padding: theme.spacing(1),
      minWidth: 180,
      zIndex: 10,
    },
    menuButton: {
      justifyContent: 'flex-start',
      textTransform: 'none',
    },
    sheetOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.modal,
      padding: theme.spacing(2),
    },
    sheetCard: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(3),
      maxWidth: 360,
      width: '100%',
      boxShadow: theme.shadows[6],
    },
    chainList: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      margin: `${theme.spacing(1)} 0`,
    },
    chainRow: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    sheetActions: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  });

export default styles;
