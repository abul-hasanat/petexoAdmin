import React, { Component }  from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

var userInfo = JSON.parse(localStorage.getItem("UserData"));


const useStyles = makeStyles(styles);

// export default function Dashboard() {
  export class Dashboard extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
           item : "",
           review : "",
           pandingItem : "",
          FeaturedgItem : ""
        
      
      };
      //  this.handelChange = this.handelChange.bind(this);
    
    }






  //  sortArray = type => {
    
  //   axios
  //     .get(process.env.REACT_APP_API + "/dashboard/iteminfo/123/123") 
  //   .then((res) => {
               
  //     this.setState({
  //       item : res.data.results.item[0].ItemCount 
  //     })
  //     console.log(this.state.dashboardData)	  
  //     console.log("DATA WILL BE " + this.state.item)	  		
  //   })
  //   .catch((err) => console.log(err));

   
  // };

  componentDidMount(){
    // this.sortArray()
    axios
    .get(process.env.REACT_APP_API + "/dashboard/store/iteminfo/123/123") 
  .then((res) => {
             
    this.setState({
      item : res.data.results.item[0].TotalItem ,
      review : (res.data.results.Review[0] === undefined?0:res.data.results.Review[0].totalReview) ,
      pandingItem :res.data.results.item[0].PendingItem ,
     FeaturedgItem : res.data.results.item[0].FeaturedItem ,
    })
    console.log(this.state.dashboardData)	  
    console.log("DATA WILL BE " + this.state.item)	  		
  })
  .catch((err) => console.log(err));
  }[0]

  // useEffect(() => {
  //  sortArray()

  //   // sortArray(sortType);
  // }, 1);


  render() {
    const { classes } = this.props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Item</p>
              <h3 className={classes.cardTitle}>
                {this.state.item}
              {/* {this.state.dashboardData.results.item.ItemCount} */}
                {/* {this.state.dashboardData.results.item[0].ItemCount} */}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Post more Item
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Total Review</p>
              <h3 className={classes.cardTitle}> {this.state.review}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours  - 
               
                49
             
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Pending Items</p>
              <h3 className={classes.cardTitle}> {this.state.pandingItem}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Support Tickets
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Featured Items</p>
              <h3 className={classes.cardTitle}> {this.state.FeaturedgItem}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Make Featured Item
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Visitors</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 style= {{color: "#FFFFFF"}} className={classes.cardTitleWhite}>Store Stats</h4>
              <p style= {{color: "#FFFFFF"}} className={classes.cardCategoryWhite}>
                Total Listings with review details
              </p>
            </CardHeader>
            <CardBody>
              <Table
             
                tableHeaderColor="warning"
                tableHead={["ID", "Category", "Total Item", "Total Review",  "Average Rating",]}
                tableData={[
                  ["1", "Dakota Rice", "4", "10", "3.5"],
                  ["2", "Minerva Hooper", "2", "14", "5"],
                  ["3", "Sage Rodriguez", "7", "0", "4"],
                  // ["4", "Philip Chaney", "1", "4", "1"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        

{/*         
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>

            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>

            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}


        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Pending Tasks</h4>
              <p className={classes.cardCategory}>Stores, Items, Reviews</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}


      </GridContainer>
{/*       
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
         
            tabs={[
              {
                
                // color: "#000000",
                tabName: "Bugs",
             
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Store Stats</h4>
              <p className={classes.cardCategoryWhite}>
                Total Listings with review details
              </p>
            </CardHeader>
            <CardBody>
              <Table
             
                tableHeaderColor="warning"
                tableHead={["ID", "Category", "Total Item", "Total Review",  "Average Rating",]}
                tableData={[
                  ["1", "Dakota Rice", "4", "10", "3.5"],
                  ["2", "Minerva Hooper", "2", "14", "5"],
                  ["3", "Sage Rodriguez", "7", "0", "4"],
                  ["4", "Philip Chaney", "1", "4", "1"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer> */}
    </div>
  );
              };
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);