import {  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,  Typography } from "@material-ui/core";
import React, { Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ActionButton from "components/CustomButtons/ActionButton.js";
import NotLisTedLocationIcon from '@material-ui/icons/NotListedLocation';
import FormControl from '@material-ui/core/FormControl';
import { CardActionArea, CardMedia, TextField } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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



  export class ReviewModel extends Component {

    constructor(props) {
		super(props);
console.log("edit date "+ props.editData.review)
console.log("edit date-1 "+ props.editData.review)
		this.state = {
      ReviewdialogIsOpen : props.ReviewdialogIsOpen, 
      review : props.editData.review,
            // subTitle : this.props.subTitle,
            // onRowClick : this.props.onRowClick,
            // deleteClick : this.props.deleteClick

		}
		this.changeHandaler = this.changeHandaler.bind(this);
		
	}



    changeHandaler(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}


  render() {
    const { classes } = this.props;
            const {dialogIsOpen, title, subTitle, onRowClick, deleteClick, editData } = this.state
          
         

    return (
    
        <Dialog fullScreen={true} style={{marginLeft:20, marginRight:20, height:300}} open={this.props.ReviewdialogIsOpen} classes={ {paper: classes.dialog}}>
            {/* <DialogTitle className={classes.DialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotLisTedLocationIcon/>                                                 
                </IconButton>

            </DialogTitle> */}
            {/* <DialogContent className={classes.DialogContent}> */}

            <GridContainer>
        <GridItem xs={12} sm={12} md={12}>

        <FormControl fullWidth  required={true} style={{marginTop:28}}    className={classes.formControl}>
<TextField 
  id="review" 
  name="review"
  label="Review"
 value={this.state.review}
 onChange={this.changeHandaler}
// required = {true}

//  error = {this.state.storeName_error}
//  helperText={(this.state.storeName_error === true ? "Store Name is Required":"")}

InputLabelProps={{
    style: { color: 'Black' },
  }}
//   inputProps={{
//     multiline: true,
//     rows: 10
//   }}
multiline = "true"
rows = "5"

  />
                     </FormControl> 
        </GridItem>
        </GridContainer>
          
          

            {/* </DialogContent> */}

            <DialogActions  className={classes.DialogActions}>
            <ActionButton  onClick={() =>  onRowClick()} color = "secondary"> Cancel </ActionButton> 
           
                     
            <ActionButton  onClick={() =>  deleteClick()} color = "primary"> Save </ActionButton> 
  

            </DialogActions>
        </Dialog>
    )
  }
  }


  ReviewModel.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ReviewModel);