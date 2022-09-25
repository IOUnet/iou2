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
      padding: "5px 0 5px 5px"
    },
    rating: {
      opacity: .6
    },
    rating_positive: {
      color: '#fa0a0a',
    },
    sender: {
      fontSize: "18px"
    },
    timeAndDate: {
      opacity: .6
    },
    feedback: {
      opacity: .8
    },
  });

export default styles;