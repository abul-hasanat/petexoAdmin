import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import axios from "axios";


const styles = {
  cardCategoryWhite: {
    // color: "#000000", //"rgba(255,255,255,.62)",
    color: "#FFFFFF",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    // color: "#000000",
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


 var userInfo = JSON.parse(localStorage.getItem("UserData"));

  export class ReviewSetup extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        review : "",
        // updateID : (this.props.editStoreID === undefined?"":this.props.editStoreID),
      };
       this.handelChange = this.handelChange.bind(this);
       this.UpdateProfileHandler = this.UpdateProfileHandler.bind(this)
    }

  // const classes = useStyles();

  handelChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
  };
  

  fetchUserDetails = (user_id) => {
   
		axios
			.get(process.env.REACT_APP_API+"/review/edit-review/" +  this.props.editStoreID , {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((res) => {
				// console.log(res);
				this.setState({
					review: res.data[0].review,
					
				});
			
			
			})
			.catch((err) => console.log(err));
	};


//   UpdateProfileHandler = (e) => {
//     console.log("Review is -------------- "+ this.state.review)
//     e.preventDefault();

//     const formData = new FormData();
//         formData.append("review", "Hello" )  //this.state.review);
//         console.log("Form Data is "+ formData)

// 		axios
// 			.post(
// 				process.env.REACT_APP_API+"/review/update/" + this.props.editStoreID +"/"+ "Hello",
				
// 				formData,
// 				{
// 					headers: {
// 						// "content-type": "application/json",
// 						"Content-Type": "multipart/form-data",
// 					},
// 				}
// 			)
// 			.then((res) => {
				
//         window.location.reload(false);
// 			})
// 			.catch((err) => console.log(err));
// 	};



UpdateProfileHandler = () => {
let btntext =  this.state.review
    axios
			.post(process.env.REACT_APP_API + "/review/edit/" + this.props.editStoreID + "/" + btntext)
			.then((res) => {
				// this.setState({
				// 	msg: res.data.message,
				// });
                    window.location.reload(false)   
				
			})
      .catch((err) => console.log(err));
    
   
};




  componentDidMount() {
    this.fetchUserDetails(userInfo.UserID);
   
   
	}




  render() {
    const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Edit Review</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
             
            <GridContainer> 
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                  <CustomInput
                    labelText="Review"
                    id="review"
                    name="review"   
                    value={this.state.review}
                    onChange={this.handelChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>

             
            </CardBody>


            <CardFooter>
              <Button  onClick={this.UpdateProfileHandler} color="primary">Update Review</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  )};
}


ReviewSetup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewSetup);