import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// import { useState } from "react";
import React, { Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';


const styles = {
  root:{
      // minWidth:0,
       margin: 9 
       //  theme.spacing(0.5)
  },
  secondary : {
      backgroundColor : "#eb3434",   //theme.palette.secondary.light,
      '& .MuiButton-label':{
          color: "#0d0d0d"  ,   //theme.palette.secondary.main,
      }

  },
  primary : {
      backgroundColor : "#07a309", //theme.palette.primary.light,
      '& .MuiButton-label':{
          color: "#0d0d0d", //theme.palette.primary.main,
      }
      
  }
}



  export class Notification extends Component {

    
  render() {
    // const { classes } = this.props;
        const {isOpen, message, type, closeNotifi   }  = this.props;

      
    return (
    <Snackbar

    open={isOpen}
    autoHideDuration= {3000}
    anchorOrigin={{vertical:"top", horizontal:"right"}}
     onClose = {()=> closeNotifi()}
  
    >
      <Alert severity={type}   onClose = {()=> closeNotifi()}   >
       {message}
      </Alert>
    </Snackbar>
    )
  }
  }


  Notification.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Notification);