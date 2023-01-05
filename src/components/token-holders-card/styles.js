import { createStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      width: "50%",
      padding: "5px",
    },
    card: {
      backgroundColor: '#F0F0F0',
      marginBottom: "8px",
      padding: "2px 5px 5px 5px"
    },
    receiver: {
      fontSize: "18px"
    },
    timeAndDate: {
      opacity: .6
    },
    description: {
      opacity: .8
    }
  });

export default styles;