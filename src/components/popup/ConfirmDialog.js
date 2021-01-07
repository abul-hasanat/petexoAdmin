import {  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,  Typography } from "@material-ui/core";
import React, { Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ActionButton from "components/CustomButtons/ActionButton.js";
import NotLisTedLocationIcon from '@material-ui/icons/NotListedLocation';

const styles = {
  root:{
 
       margin: 9 
  
  },
 dialog: {
     padding: 2,
position : "absolute",
  top: 5


 },
 DialogContent:{
     textAline : "center"
 },

 DialogTitle:{
    textAline : "center"
},
 DialogActions:{
     justifyContent: "center"
 },

 titleIcon:{
     backgroundColor : "#e6b3b9",
     color :  "#eb3434",
     "&:hover":{
        backgroundColor : "#e6b3b9",
        cursor: "default"
     },
     "& .MuiSvgIcon-root":{
         fontSize : "8rem"    
     }  
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



  export class ConfirmDialog extends Component {


  render() {
    const { classes } = this.props;
           const {dialogIsOpen, title, subTitle, onRowClick, deleteClick } = this.props
          
         

    return (
    
        <Dialog open={dialogIsOpen} classes={ {paper: classes.dialog}}>
            <DialogTitle className={classes.DialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotLisTedLocationIcon/>                                                 
                </IconButton>

            </DialogTitle>
            <DialogContent className={classes.DialogContent}>
                <Typography variant="h6">
                    {title} 
                    {dialogIsOpen} 

                </Typography>

                <Typography variant="subtitle2">
                    {subTitle}

                </Typography>

            </DialogContent>
            <DialogActions  className={classes.DialogActions}>
            <ActionButton  onClick={() =>  onRowClick()} color = "primary"> No </ActionButton> 
           
                     
            <ActionButton  onClick={() =>  deleteClick()} color = "secondary"> Yes </ActionButton> 
  

            </DialogActions>
        </Dialog>
    )
  }
  }


  ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ConfirmDialog);