import React, { useState,useEffect  } from "react";
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
import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'



import {
  dailySalesChart,
  emailsSubscriptionChart,

  MembershipSubscriptionChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });


 const useStyles = makeStyles(styles);


export default function Dashboard() {

  const classes = useStyles();
  const [dashboardData, setdashboardData] = useState([]);
  const [totalStore, settotalStore] = useState(0);
  const [totalUser, settotalUser] = useState(0);
  const [pandingItem, setpandingItem] = useState(0);
 
  const [storeData, setstoreData] = useState([]);
  const [id, setid] = useState(1);


  

  function  activeItem (){
    var typeid = 2;
    var id2 = 1
  
      axios
        .get(process.env.REACT_APP_API + "/dashboard/iteminfo/" + typeid + "/" + id2 )
        .then((res) => {
            setdashboardData(res.data.results.item[0].ItemCount)
            settotalStore(res.data.results.store[0].StoreCount)
            settotalUser(res.data.results.user[0].UserCount)
            setpandingItem(res.data.results.pandingItem[0].pandingCount)
          
        })
        .catch((err) => console.log(err));
      };
      

      function  storeList (){
       
      
          axios
            .get(process.env.REACT_APP_API + "/dashboard/admin/storedetails" )
            .then((res) => {
              setstoreData(res.data.results.item)
               
              
            })
            .catch((err) => console.log(err));
          };
          
          useEffect(() => {
            activeItem();
            storeList();
          },[id]);
      

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Items</p>
              <h3 className={classes.cardTitle}>
                {dashboardData}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Approve more Item
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
              <p className={classes.cardCategory}>Total Store</p>
              <h3 className={classes.cardTitle}>{totalStore}</h3>
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
              <p className={classes.cardCategory}>Panding Item</p>
              <h3 className={classes.cardTitle}>{pandingItem}</h3>
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
              <p className={classes.cardCategory}>Total User</p>
              <h3 className={classes.cardTitle}>{totalUser}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Profile Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
              <h4 className={classes.cardTitle}>User By Months</h4>
            
            </CardBody>
           
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

<GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={MembershipSubscriptionChart.data2}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Membership Status</h4>
              {/* <p className={classes.cardCategory}>Last Campaign Performance</p> */}
            </CardBody>
            {/* <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>



      </GridContainer>
      <GridContainer>
{/*         
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
           
             headerColor="primary"
            style={{ color: "#FFFFFF"}}
            tabs={[
              {
                textColor: "secondary",
                tabName: "Membership",
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
                tabName: "Featured Item",
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
                tabName: "Item Approval",
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
        </GridItem> */}

        
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 style= {{color: "#FFFFFF"}} className={classes.cardTitleWhite}>Stors Stats</h4>
              <p style= {{color: "#FFFFFF",}} className={classes.cardCategoryWhite}>
                Seller lists with their total listings
              </p>
            </CardHeader>


            <TableContainer style={{minWidth:300}}  component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
       
            <TableCell style={{fontWeight:"bold"}} align="center">Name</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Store</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Membership</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Total Item</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Total Review</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Average Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storeData.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="center">{row.store.storeName}</TableCell>
              <TableCell align="center">{(row.membership.membershipID === 4?"Premium":row.membership.membershipID === 3?"Standard":row.membership.membershipID === 2?"Basic":"Free")}</TableCell>
              <TableCell align="center">{row.Item}</TableCell>
              <TableCell align="center">{row.Review}</TableCell>
              <TableCell align="center">{row.ReviewRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
