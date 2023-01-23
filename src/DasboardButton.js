import React, { Component } from "react";
    import Button from "@material-ui/core/Button";
    import PropTypes from "prop-types";
    import classNames from "classnames";
    import { withStyles } from "@material-ui/core/styles";
    import purple from "@material-ui/core/colors/purple";

    const styles = theme => ({
      container: {
        display: "flex",
        flexWrap: "wrap"
      },
      margin: {
        margin: theme.spacing.unit
      },
      cssRoot: {
        backgroundColor: "white",
        color:"rgb(5, 161, 252)",
        alignItems:"left",
        textTransform:"capitalize",
        width:"100%",
        justifyContent: "flex-start", 
        paddingBottom: "5%", 
        paddingTop: "5%",
        "&:active": {
          backgroundColor: purple[700]
        },
        "&:focus": {
            backgroundColor: purple[700]
          }
      },
      bootstrapRoot: {
        backgroundColor: "white",
        color:"rgb(5, 161, 252)",
        alignItems:"left",
        textTransform:"capitalize",
        width:"100%",
        justifyContent: "flex-start", 
        paddingBottom: "5%", 
        paddingTop: "5%",
        "&:hover": {
          backgroundColor: "#0069d9",
          borderColor: "#0062cc"
        },
        "&:active": {
          boxShadow: "none",
          backgroundColor: "#0062cc",
          borderColor: "#005cbf"
        },
        "&:focus": {
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
        }
      }
    });

    class MyButton extends Component {
      state = {
        bgButton: {
            backgroundColor: "white",
            color:"rgb(5, 161, 252)",
            alignItems:"left",
            textTransform:"capitalize",
            width:"100%",
            justifyContent: "flex-start", 
            paddingBottom: "5%", 
            paddingTop: "5%",
            "&:active": {
              backgroundColor: purple[700]
            },
            "&:focus": {
                backgroundColor: purple[700]
              }
          }
      };
      handleClick = () => {
        const { classes } = this.props;
        this.setState({ bgButton: classes.cssRoot });
      };
      render() {
        const { classes } = this.props; //this gives you access to all styles defined above, so in your className prop for your HTML tags you can put classes.container, classes.margin, classes.cssRoot, or classes.bootstrapRoot in this example. 
        const { bgButton } = this.state;
        return (
          <div className={classes.container}>
            <Button
              className={classNames(bgButton)}
              startIcon={this.props.icon}
              onClick={this.handleClick}
            >
              {this.props.label}
            </Button>
          </div>
        );
      }
    }
MyButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyButton);