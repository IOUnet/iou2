import { createStyles, } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    menu: {
      height: "100vh",
      position: "absolute",
      zIndex: "1102",
      width: "50%",
      maxWidth: "320px",
      backgroundColor: "white",
      transform: "translateX(-100%)",
      transition: "0.2s",
      listStyleType: "none",
      boxSizing: "content-box",
      fontSize: "1.5rem",
      display: "flex",
      justifyContent: "center"
    },
    menu_active: {
      transform: "translateX(0)",
      transition: "0.4s"
    },
    shadow: {
      maxWidth: "inherit",
      position: "absolute",
      zIndex: "1101",
      width: "100%",
      height: "100vh",
      backgroundColor: "black",
      transition: "0.2s",
      opacity: 0,
      visibility: "hidden"
    },
    shadow_active: {
      transition: "0.4s",
      visibility: "visible",
      opacity: "0.4",
    },
    typography: {
      textAlign: "center",
      cursor: "pointer"
    },
    brand: {
      width: '95px',
      height: 'auto'
    }

  });

export default styles;
