import React, { Component } from 'react';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import ConfirmDialog from "../../components/popup/ConfirmDialog.js"

	const styles = {
		paper: {
		 
		  marginTop: 4,
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',
		},
		avatar: {
		  margin: 1,
		 
		   backgroundColor:  "#d60606"
		},
		form: {
		  width: '100%', 
		
		  marginTop: 3,
		},
		submit: {
		 
		},
		  }
	

	 
	class Signout extends Component {


constructor(props) {
	super(props);
	

	this.state = {
		email: "",
		password: "",
		error: "",
		emailError: "",
		passwordError: "",
		show_progress: false,
		isOpen : false,
		message : "",
		type : "success",
		 //------
		 dialogIsOpen : true, 
		 title : "Are you use to logout?", 
		 subTitle: "", 
	
	
	}

	this.handleRowClick = this.handleRowClick.bind(this);
	this.onRowDelete = this.onRowDelete.bind(this)
}  


handleRowClick = ()=>{
	this.setState({

	 dialogIsOpen : false

	})
	
	window.location.assign('http://localhost:3001/admin/dashboard');
	//  window.location.reload(false);	
  }


  onRowDelete = ( id, btntext )=>{

	this.setState({
	  Checkstatus: 1,
	});

	this.setState({
	  dialogIsOpen : false, 	  
	})
	

	localStorage.removeItem("token");	
	localStorage.removeItem("UserData");	
		
	
	window.location.assign('http://process.env.REACT_APP_API:3000/admin/dashboard');
	 window.location.reload(false);	


  }






// componentDidMount() {
//     console.log("Compoenent clicked")
      
//     localStorage.removeItem("UserData");		
	
//        window.location.assign('http://process.env.REACT_APP_API:3000/admin/dashboard');
// 		window.location.reload(false);	
		
			
//   }





render() {
	// const { classes } = this.props;
	

  return (
<div>
<ConfirmDialog onRowClick={this.handleRowClick } deleteClick={()=>{this.onRowDelete("id", "abc")}} dialogIsOpen={this.state.dialogIsOpen} title={this.state.title} subTitle={this.state.subTitle}/>

</div>
  );
}
}

Signout.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Signout);