import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { CardActionArea, CardMedia, TextField } from "@material-ui/core";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import axios from "axios";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


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


//  var userInfo = JSON.parse(localStorage.getItem("UserData"));

  export class Category extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        CatList: [],
        SubCatList: [],
        CatName: "",
        SubCatName: "",
        SubCat: "",
        SubCatID: "",      
         SubSubCatName: "",
       showCategory: true,
       showSubCategory: true,
       showSubSubCategory: false,
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
  
  
	changeCatName = (event) => {
		this.setState({
			CatName: event.target.value,
		});
	};

	SubsubCategory = (event) => {
		this.setState({
			SubCat: event.target.value,
     
		});
	};

  ChangeSubsubCategory = (event) => {
		this.setState({
		
      SubSubCatName :  event.target.value,
		});
	};

	
  
	

  changeProfileImage = (event) => {
		this.setState({
			userImage: event.target.files[0],
			uploadedFile: URL.createObjectURL(event.target.files[0]),
		});
	};


  UpdateProfileHandler = (e) => {

		e.preventDefault();

		const formData = new FormData();
		formData.append("userImage", (this.state.userImage === undefined?"":this.state.userImage));
		formData.append("CatName", this.state.CatName);
		

		//update-profile
		axios
			.post(
				process.env.REACT_APP_API+"/category/add/",
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


    UpdateSubCategory = (e) => {

		e.preventDefault();

		const formData = new FormData();
		formData.append("userImage", (this.state.userImage === undefined?"":this.state.userImage));
		formData.append("SubCatName", this.state.SubCatName);
		

		//update-profile
		axios
			.post(
				process.env.REACT_APP_API+"/category/add/"+this.state.CatName,
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



  UpdateSubSubCategory = (e) => {

		e.preventDefault();
    console.log('sub cttt'+ this.state.SubCat)
    
   
		const formData = new FormData();
		formData.append("userImage", (this.state.userImage === undefined?"":this.state.userImage));
		formData.append("SubSubCatName", this.state.SubSubCatName);
		

		//update-profile
		axios
			.post(
				process.env.REACT_APP_API+"/category/add/"+this.state.CatName+'/'+this.state.SubCat,
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




    fetchCategory = (e) => {
     
         axios
           .get(process.env.REACT_APP_API + "/category")
     
           .then((res) => {
           
             var CategoryList = res.data;
          
             this.setState({
               CatList: CategoryList.map((CatList) => CatList), //.CatName),
                 CatName: this.state.CatName,
            
              
             });
            
           
              this.subCategory(this.state.CatName);
           })
           .catch((err) => console.log(err));
       };

    
    
       subCategory = (e) => {
         this.setState({ [e.target.name]: e.target.value });
       if(e){
        this.setState({ 
          CatName : e.target.value,
        //   SubSubCatList : []
        
        });
       }
       
  
    
  
      axios
      
        .get(process.env.REACT_APP_API + "/category/" + (e === undefined?this.state.CatName:e.target.value))
        .then((res) => {
          var SubCategoryList = res.data[0].SubCategory;
          
          console.log(SubCategoryList);
          this.setState({
            SubCatList: SubCategoryList.map(
              (SubCatList) => SubCatList 
            ),
            SubCat: this.state.SubCat,
           
          });
          console.log("Cat Cat " + this.state.CatName);
  
        
        })
        .catch((err) => console.log(err));
    };
  
  

  componentDidMount() {
    this.fetchCategory();
    // this.subCategory();
   
	}




  render() {
    const { classes } = this.props;
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            {/* <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={this.state.uploadedFile} alt="..." />
              </a>
            </CardAvatar> */}
            <CardBody profile>
            <Button  onClick={e=>{this.setState({showCategory: false, showSubCategory:true, showSubSubCategory:true})}} color="primary">Create Category</Button><br/>
            <Button  onClick={e=>{this.setState({showCategory: true, showSubCategory:false, showSubSubCategory:true})}} color="primary">Create Sub-Category</Button><br/>
            <Button  onClick={e=>{this.setState({showCategory: true, showSubCategory:true, showSubSubCategory:false})}} color="primary">Create Sub-Sub-Category</Button><br/>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem hidden={this.state.showCategory} xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Create Category</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
             


              <GridContainer>
               
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText= {
                      <div>
                      Category Name
                        <Tooltip title="WriteCategory Name Here" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="last-name"
                    value={this.state.CatName}
                    onChange={this.changeCatName}

                    formControlProps={{
                      fullWidth: true
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
              <Button  onClick={this.UpdateProfileHandler} color="primary">Save</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem hidden={this.state.showSubCategory} xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Create Sub-Category</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
             


              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth
                      
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                      error = {this.state.CatName_error}
                     
                      
                    >
                     
                      <div style={{fontSize:16}} >
                      Category
      <Tooltip   title="Select the Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  
                      <Select
                        native
                        value={this.state.CatName}
                          onChange={this.subCategory}
                        inputProps={{
                          name: "CatName",
                          id: "CatName",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.CatList.map((e, key) => {
                          return (
                            <option key={key} value={e.CatName}>
                              {e.CatName}
                            </option>
                          );
                        })}

                      </Select>
                    </FormControl>
                  </GridItem>
                
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                    >
                     
                        <div style={{fontSize:16}} >
                         Sub Category
      <Tooltip   title="Select the  Sub Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
                      <Select
                        native
                        value={this.state.SubCat}
                      
                        onChange={this.handelChange}
                        inputProps={{
                          name: "SubCat",
                          id: "SubCat",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.SubCatList.map((e, key) => {
                          return (
                            <option key={key} value={e.SubCat}>
                              {e.SubCat}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
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
              <Button  onClick={this.UpdateSubCategory} color="primary">Save</Button>
            </CardFooter>
          </Card>
        </GridItem>


        <GridItem hidden={this.state.showSubSubCategory} xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">

              <h4 className={classes.cardTitleWhite}>Create Sub-Sub-Category</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
             


              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth
                      
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                      error = {this.state.CatName_error}
                     
                      
                    >
                     
                      <div style={{fontSize:16}} >
                      Category
      <Tooltip   title="Select the Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>
  
                      <Select
                        native
                        value={this.state.CatName}
                          onChange={this.subCategory}
                        inputProps={{
                          name: "CatName",
                          id: "CatName",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.CatList.map((e, key) => {
                          return (
                            <option key={key} value={e.CatName}>
                              {e.CatName}
                            </option>
                          );
                        })}

                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth
                      // required="true"
                      style={{ marginTop: 15 }}
                      className={classes.formControl}
                      error = {this.state.SubCatName_error}
                    >
                     
                         <div style={{fontSize:16}} >
                         Sub Category
      <Tooltip   title="Select the  Sub Category of your item. This is required!!" aria-label="add">

<ContactSupportIcon style={{color:"black"}}/>

</Tooltip>
    </div>

                      <Select
                        native
                      
                           value={this.state.SubCat}
                        //  value={this.props.editData.SubCatName}
                         onChange={this.SubsubCategory}
                        inputProps={{
                          name: "SubCat",
                          id: "SubCat",
                        }}
                      >
                        <option aria-label="None" value="" />

                        {this.state.SubCatList.map((e, key) => {
                          return (
                            <option key={key} value={e.SubCatName}>
                              {e.SubCatName}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                
               
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText= {
                      <div>
                      Sub Sub Category Name
                        <Tooltip title="WriteCategory Name Here" aria-label="add">
      
      <ContactSupportIcon style={{color:"black"}}/>
    
    </Tooltip>
                      </div>
                    }
                    id="last-name"
                    value={this.state.SubSubCatName}
                     onChange={this.ChangeSubsubCategory}

                    formControlProps={{
                      fullWidth: true
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
              <Button  onClick={this.UpdateSubSubCategory} color="primary">Save</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
        
      </GridContainer>
    </div>
  )};
}


Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);