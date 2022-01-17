import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    cardSection: {
      padding: theme.spacing(1, 0.5),
    },
    QRSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& button': {
        flexShrink: 0,
        width: theme.spacing(16),
        padding: theme.spacing(0.75),
      },
      '& $text span': {
        fontSize: '1rem',
      },
    },
    QRSection_text: {
      padding: 0,
    },
    qr_ico: {
      width: theme.spacing(15.5),
      height: 'auto',
    },
    dataSection: {
      padding: theme.spacing(2, 2),
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    numberInput: {
      display: 'flex',
      alignItems: 'flex-end',
      '& > p': {
        marginLeft: theme.spacing(1),
        flexShrink: 0,
        fontSize: '0.75rem',
        lineHeight: 2,
      },
    },
    actionSection: {
      marginTop: 'auto',
      padding: theme.spacing(2, 2),
    },
  });

export default styles;
