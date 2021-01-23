

// import React, { Component } from 'react';

// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/styles";
// import ConfirmDialog from "../../components/popup/ConfirmDialog.js"

// 	const styles = {
// 		paper: {
		 
// 		  marginTop: 4,
// 		  display: 'flex',
// 		  flexDirection: 'column',
// 		  alignItems: 'center',
// 		},
// 		avatar: {
// 		  margin: 1,
		 
// 		   backgroundColor:  "#d60606"
// 		},
// 		form: {
// 		  width: '100%', 
		
// 		  marginTop: 3,
// 		},
// 		submit: {
		 
// 		},
// 		  }
	

	 
// 	class Signout extends Component {


// constructor(props) {
// 	super(props);
	

// 	this.state = {
// 		email: "",
// 		password: "",
// 		error: "",
// 		emailError: "",
// 		passwordError: "",
// 		show_progress: false,
// 		isOpen : false,
// 		message : "",
// 		type : "success",
// 		 //------
// 		 dialogIsOpen : true, 
// 		 title : "Are you use to logout?", 
// 		 subTitle: "", 
	
	
// 	}

// 	this.handleRowClick = this.handleRowClick.bind(this);
// 	this.onRowDelete = this.onRowDelete.bind(this)
// }  


// handleRowClick = ()=>{
// 	this.setState({

// 	 dialogIsOpen : false

// 	})
	
// 	window.location.assign('http://localhost:3001/admin/dashboard');
// 	//  window.location.reload(false);	
//   }


//   onRowDelete = ( id, btntext )=>{

// 	this.setState({
// 	  Checkstatus: 1,
// 	});

// 	this.setState({
// 	  dialogIsOpen : false, 	  
// 	})
	

// 	localStorage.removeItem("token");	
// 	localStorage.removeItem("UserData");	
		
	
// 	window.location.assign('http://process.env.REACT_APP_API:3000/admin/dashboard');
// 	 window.location.reload(false);	


//   }






// // componentDidMount() {
// //     console.log("Compoenent clicked")
      
// //     localStorage.removeItem("UserData");		
	
// //        window.location.assign('http://process.env.REACT_APP_API:3000/admin/dashboard');
// // 		window.location.reload(false);	
		
			
// //   }





// render() {
// 	// const { classes } = this.props;
	

//   return (
// <div>
// <ConfirmDialog onRowClick={this.handleRowClick } deleteClick={()=>{this.onRowDelete("id", "abc")}} dialogIsOpen={this.state.dialogIsOpen} title={this.state.title} subTitle={this.state.subTitle}/>

// </div>
//   );
// }
// }

// Signout.propTypes = {
// 	classes: PropTypes.object.isRequired,
//   };
  
//   export default withStyles(styles)(Signout);

import React, { Component } from 'react';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
// import ConfirmDialog from "../../components/popup/ConfirmDialog.js";

import Snack from "./snack.png"


// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



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
	
		  function valueLabelFormat(value) {
			const [coefficient, exponent] = value
			  .toExponential()
			  .split('e')
			  .map((item) => Number(item));
			return `${Math.round(coefficient)} of ${exponent}`;
		  }

	 
class Signout extends Component {


constructor(props) {
	super(props);
	

	this.state = {
	
		show_progress: false,
		isOpen : false,
		message : "",
		type : "success",
		// checked : false,
		value : 0,
		 //------
		 dialogIsOpen : true, 
		 title : "Are you use to logout?", 
		 subTitle: "", 
	
	
	}

	this.handleChange = this.handleChange.bind(this);
	this.onRowDelete = this.onRowDelete.bind(this)
}  

// const handleChange = () => {
//     setChecked((prev) => !prev);
//   };

handleChange = (event, newValue)=>{
	this.setState({

	 dialogIsOpen : false,
	//  checked : true,
	 value  : newValue
	})
	if(this.state.value >5){
		window.location.assign('https://admin.karukaj.com.bd/key/admin-token');
	 window.location.reload(false);	
		localStorage.removeItem("UserData");	
		localStorage.removeItem("token");	
	
	
	}
	console.log("Logged out value is "+ this.state.value )
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
		
	
	window.location.assign('http://process.env.REACT_APP_API:3001/admin/dashboard');
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
	let classes = this.props
//   let checked = this.state
  return (
	<div>
		 <GridContainer>
		 <GridItem xs={12} sm={12} md={4}>
		 </GridItem>
		
        <GridItem xs={12} sm={12} md={4}>
	<List  className={classes.root}>
	<ListItem>
	  <ListItemAvatar>
		{/* <Avatar> */}
		  {/* <ImageIcon /> */}
		  <img  src={Snack} alt=""></img>
		  {/* <Snack/> */}
		{/* </Avatar> */}
	  </ListItemAvatar>
	  {/* <ListItemText primary="Photos" secondary="Jan 9, 2014" /> */}
	</ListItem>
	{/* <FormControlLabel
	 style={{width:500}}
	  label="Are you sure to logout?"
        control={<Switch checked={checked} onChange={this.handleChange} />}
      
      /> */}

<Typography style={{fontSize:16, fontWeight:"bold"}} id="non-linear-slider" gutterBottom>
        Are you sure to logged out ? Make it 50% plus for logout.
      </Typography>
      <Slider
        value={this.state.value}
        min={0}
        step={1}
        max={10}
        scale={(x) => x ** 10}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={this.handleChange}
        valueLabelDisplay= {this.state.value}  //"auto"
        aria-labelledby="non-linear-slider"
      />

  </List>

  </GridItem>
  <GridItem xs={12} sm={12} md={4}>
  </GridItem>
  </GridContainer>
{/* <ConfirmDialog onRowClick={this.handleRowClick } deleteClick={()=>{this.onRowDelete("id", "abc")}} dialogIsOpen={this.state.dialogIsOpen} title={this.state.title} subTitle={this.state.subTitle}/> */}

</div>
  );
}
}

Signout.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Signout);