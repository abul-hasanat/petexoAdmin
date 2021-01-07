import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import ActionButton from "components/CustomButtons/ActionButton.js";
import CloseIcon from "@material-ui/icons/Close";
import { EditOutlined } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

        ) : null}

         
{tableData.length !== 0 ? (
        <TableBody>
  
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.address}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        
        </TableBody>
 ) : null} 


{/* 
      
{tableData.length !== 0 ? (
        <TableBody>
  
          {tableData.map((row) => {
            return (
              <TableRow key={row.name} className={classes.tableBodyRow}>
               
               <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
             
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="Center">
              <ActionButton color = "primary"> <EditOutlined fontSize="small"/>  </ActionButton> 
              <ActionButton color = "secondary"> <CloseIcon fontSize="small"/> </ActionButton>
              </TableCell>

              </TableRow>
            );
          })}
        
        </TableBody>
 ) : null} */}


      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
