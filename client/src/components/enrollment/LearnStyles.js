import { makeStyles } from "@material-ui/core/styles";

export const learnStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1300,
    margin: "auto",
    marginTop: theme.spacing(12),
  }),
  heading: {
    marginBottom: theme.spacing(3),
    fontWeight: 200,
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  card: {
    padding: "24px 40px 20px",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  details: {
    margin: "16px",
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  avatar: {
    color: "#9b9b9b",
    border: "1px solid #bdbdbd",
    background: "none",
  },
  media: {
    height: 180,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "0.9em",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "0.2em",
    marginTop: 5,
  },
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
  drawer: {
    width: 240,
    height: "100%",
    // flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    height: "100%",
    marginTop: 0,
    backgroundColor: "#616161",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  selectedDrawer: {
    backgroundColor: "#e9e3df",
  },
  unselected: {
    backgroundColor: "#ffffff",
  },
  check: {
    color: "#38cc38",
  },
  subhead: {
    fontSize: "1.2em",
  },
  progress: {
    textAlign: "center",
    color: "#dfdfdf",
    "& span": {
      color: "#fffde7",
      fontSize: "1.15em",
    },
  },
  para: {
    whiteSpace: "pre-wrap",
  },
}));
