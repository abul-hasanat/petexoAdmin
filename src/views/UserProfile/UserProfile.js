import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { CardActionArea, CardMedia, TextField } from "@material-ui/core";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Tooltip from '@material-ui/core/Tooltip';
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

  export class UserProfile extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        zipCode: "",
        address: "",
        userDetails: "",
        userImage: null,
        uploadedFile: null,
        updateID : (this.props.editStoreID === undefined?"":this.props.editStoreID),
      };
       this.handelChange = this.handelChange.bind(this);
      // this.onSubmit = this.onSubmit.bind(this);
    }

  // const classes = useStyles();

  handelChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
  };
  
  
	changeFirstName = (event) => {
		this.setState({
			firstName: event.target.value,
		});
	};
	changeLastName = (event) => {
		this.setState({
			lastName: event.target.value,
		});
	};
	changeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};
	changephone = (event) => {
		this.setState({
			phone: event.target.value,
		});
	};
	changeUserDetails = (event) => {
		this.setState({
			userDetails: event.target.value,
		});
	};

	changecity = (event) => {
		this.setState({
			city: event.target.value,
		});
	};
	changezipCode = (event) => {
		this.setState({
			zipCode: event.target.value,
		});
	};
	changeaddress = (event) => {
		this.setState({
			address: event.target.value,
		});
	};
	changecity = (event) => {
		this.setState({
			city: event.target.value,
		});
	};
	changestate = (event) => {
		this.setState({
			state: event.target.value,
		});
  };
  


  changeProfileImage = (event) => {
		this.setState({
			userImage: event.target.files[0],
			uploadedFile: URL.createObjectURL(event.target.files[0]),
		});
	};

  fetchUserDetails = (user_id) => {
   
		axios
			.get(process.env.REACT_APP_API+"/user/" +  (this.state.updateID === ""? userInfo.UserID:this.state.updateID) , {
				headers: {
					"content-type": "application/json",
				},
			})
			.then((res) => {
				// console.log(res);
				this.setState({
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					email: res.data.email,
					phone: res.data.phone,
					state: res.data.state,
					city: res.data.city,
					zipCode: res.data.zipCode,
					address: res.data.address,
					userImage: res.data.userImage,
					userDetails: res.data.userDetails,
					uploadedFile: res.data.userImage,
				});
				var imagestr = this.state.userImage;
				imagestr = imagestr.replace("public", "");
				this.setState({ uploadedFile: process.env.REACT_APP_API + imagestr });
			})
			.catch((err) => console.log(err));
	};


  UpdateProfileHandler = (e) => {

		e.preventDefault();

		const formData = new FormData();
		formData.append("userImage", (this.state.userImage === undefined?"":this.state.userImage));
		//formData.append("userImage", URL.createObjectURL( this.state.uploadedFile));
		formData.append("_id", (this.state.updateID === ""? userInfo.UserID:this.state.updateID));
		formData.append("firstName", this.state.firstName);
		formData.append("lastName", this.state.lastName);
		formData.append("email", this.state.email);
		formData.append("state", this.state.state);
		formData.append("city", this.state.city);
		formData.append("phone", this.state.phone);
		formData.append("zipCode", this.state.zipCode);
		formData.append("address", this.state.address);
		formData.append("userDetails", this.state.userDetails);

		//update-profile
		axios
			.post(
				process.env.REACT_APP_API+"/user/update/" + (this.state.updateID === ""? userInfo.UserID:this.state.updateID),
				//"http://process.env.REACT_APP_API:5000/user/add",
				formData,
				{
					headers: {
						// "content-type": "application/json",
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((res) => {
				console.log("This is the Responds" + res);
				this.setState({ msg: res.data.message });
        this.setState({ userImage: res.data.results.userImage });
        window.location.reload(false);
			})
			.catch((err) => console.log(err));
	};

  componentDidMount() {
    this.fetchUserDetails(userInfo.UserID);
    // this.fetchUserDetails( "5f06f15be4fd1611bcdbbb10");
   
	}




  render() {
    const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
             


              <GridContainer>
                <GridItem  style={{fontSize : 20}} xs={12} sm={12} md={6}>
                  <CustomInput
                    
                    // labelText="First Name" 
                    labelText ={
                      <div>
                        First Name 
                        <Tooltip title="Write your First Name Here" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="first-name"
                    value={this.state.firstName}
                    onChange={this.changeFirstName}
                  
                    formControlProps={{
                      fullWidth: true
                    }}
                    
                  />
                 
                
                </GridItem> 

                {/* <GridItem style={{marginTop:50}}  xs={2} sm={1} md={1}>
                <Tooltip title="Add" aria-label="add">
      
      <ContactSupportIcon/>
    
    </Tooltip>
                </GridItem>  */}
                
              
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText= {
                      <div>
                       Last Name
                        <Tooltip title="Write your First Name Here" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="last-name"
                    value={this.state.lastName}
                    onChange={this.changeLastName}

                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
              </GridContainer>


              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  
                  <CustomInput
                    labelText= {
                      <div>
                      Email address
                        <Tooltip title="Write your First Name Here" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }

                    // labelText="Email address"
                   
                    id="email"
							    	name="email"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />


                </GridItem>  
                 
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
               labelText= {
                <div>
               Phone
                  <Tooltip title="Write your Phone Number Here" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
                </div>
              }
                    // labelText="Phone"
                    id="phone"
                  	value={this.state.phone}
							    	onChange={this.changephone}

                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
               
              </GridContainer>



              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    // labelText="State"

                    labelText= {
                      <div>
                     State
                        <Tooltip title=" your postal State" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="State"
                    value={this.state.state}
								onChange={this.changestate}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    // labelText="City"
                    labelText= {
                      <div>
                     City
                        <Tooltip title=" your postal City" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="City"
                    value={this.state.city}
                    onChange={this.changecity}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
               
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    // labelText="Postal Code"
                    labelText= {
                      <div>
                     Postal Code
                        <Tooltip title=" your Postal Code" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="ZipCode"
                    value={this.state.zipCode}
                    onChange={this.changezipCode}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                
                  <CustomInput
                    // labelText="Address"
                    labelText= {
                      <div>
                   Address
                        <Tooltip title=" your Postal Address" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }

                    id="address"
                    value={this.state.address}
                    onChange={this.changeaddress}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2
                    }}
                  />
                </GridItem>
              </GridContainer>


              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                  <CustomInput
                    // labelText="About me"
                     // labelText="Address"
                     labelText= {
                      <div>
                   About me
                        <Tooltip title="Say something about yourself" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="about-me"
                    value={this.state.userDetails}
                    onChange={this.changeUserDetails}
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

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                 
                 <TextField
                 id="outlined-full-width"
                 label= "Image Upload"
                // style={{margin:8}}
                 name="upload-photo"
                 type="file"
                // fullWidth
                 margin="normal"
                 InputLabelProps = {{
                   shrink: true
                 }}
                 variant="outlined"
                 onChange={this.changeProfileImage}
                 />

                



                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                 <Card>
<CardActionArea>
  <CardMedia
  component = "img"
  alt="contemplative reptil"
  height= "150"
  width = "200"
  title = "contemplative reptil"
  src={this.state.uploadedFile}
  />

 
</CardActionArea>
                 </Card>
               
                </GridItem>

              </GridContainer>

            </CardBody>


            <CardFooter>
              <Button  onClick={this.UpdateProfileHandler} color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={this.state.uploadedFile} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              {/* <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6> */}
                <h4 className={classes.cardTitle}>{this.state.firstName} {this.state.lastName}</h4>
                <p className={classes.description}>
                Email: {this.state.email} <br/>
                Phone: {this.state.phone} <br/>
                Address: {this.state.state}, {this.state.city},{this.state.address}
               
              </p>
             
               
              <p className={classes.description}>
                
                {this.state.userDetails}
              </p>
              {/* <Button color="primary" round>
                Follow
              </Button> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )};
}


UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);