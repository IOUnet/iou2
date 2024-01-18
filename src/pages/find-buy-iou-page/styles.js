import { createStyles } from "@material-ui/core/styles";

const styles = (theme) =>
  createStyles({
    pageTitle: {
      marginTop: theme.spacing(0.5),
      padding: theme.spacing(0, 2),
    },
    controlsSection: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2, 4),
      "& > * + *": {
        marginTop: theme.spacing(4),
      },
      radio: {
        "&$checked": {
          color: "#5193b1",
        },
        "& secondary": {
          color: "#5193b1",
        },
      },
    },
    textField_green: {
      "& label.Mui-focused": {
        color: "#1BB55C",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#1BB55C",
        },
      },
    },
    textField_italic: {
      "& input": {
        fontStyle: "italic",
      },
    },
    checkbox_label: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.primary.main,
      fontWeight: "600",
      letterSpacing: "0.01em",
    },
    actionSection: {
      marginTop: "auto",
      padding: theme.spacing(2, 2),
    },
    selectSection: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1, 2),
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      "& button": {
        width: theme.spacing(15),
        paddingTop: theme.spacing(4.125),
        paddingBottom: theme.spacing(4.125),
      },
      radio: {
        "&$checked": {
          color: "#5193b1",
        },
        "& secondary": {
          color: "#5193b1",
        },
      },
    },
    listSection: {
      padding: theme.spacing(1, 0.5),
    },
    radio: {
      "&$checked": {
        color: "#5193b1",
      },
    },
  });

export default styles;
