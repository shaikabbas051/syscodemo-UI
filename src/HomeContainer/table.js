import React, { Component } from "react";
import {
  Typography,
  Toolbar,
  TableRow,
  TableCell,
  TableHead,
  Checkbox,
  TableSortLabel,
  TableBody,
  Table,
  Paper,
  Tooltip,
  IconButton
} from "@material-ui/core";
import RefreshTwoTone from "@material-ui/icons/RefreshTwoTone";

import { withStyles } from "@material-ui/core/styles";
class MyTAble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      data1: this.props.data1,
      selected: this.props.selected
    };
  }
  componentWillReceiveProps = newprops => {
    this.setState({ selected: newprops.selected, data1: newprops.data1 });
  };
  handleCheckbox = (e, i) => {
    this.props.handleCheckbox(e, i);
  };
  onSelectAllClick = e => {
    this.props.onSelectAllClick(e);
  };
  handleDateChange = date => {};
  render() {
    return (
      <div
        className={
          window.innerWidth < 550 ? "myreacttable letsscroll" : "myreacttable"
        }
      >
        <Paper className={this.props.root}>
          <Toolbar>
            <div className={this.props.classes.title}>
              <Typography className={"tabletitle"}>
                Delivery Information Portal
              </Typography>
            </div>
            <div className={this.props.classes.spacer} />
            <div className={this.props.classes.actions}>
              <Tooltip title="Refresh Data">
                <IconButton
                  aria-label="Filter list"
                  onClick={this.props.getData}
                >
                  <RefreshTwoTone />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
          <Table className={this.props.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={
                      this.state.data1.length === this.state.selected.length &&
                      this.state.selected.length !== 0
                    }
                    onChange={this.onSelectAllClick}
                    color={"primary"}
                  /> */}
                </TableCell>
                {this.state.data.map(row => (
                  <TableCell
                    key={row.id}
                    align={row.numeric ? "right" : "left"}
                    padding={row.disablePadding ? "none" : "default"}
                  >
                    <TableSortLabel className={"rowtitle"}>
                      {row.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {// stableSort(data, getSorting(order, orderBy))
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              this.state.data1.map((n, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={this.state.selected.includes(i)}
                    tabIndex={-1}
                    key={n.id}
                    selected={this.state.selected.includes(i)}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        checked={this.state.selected.includes(i)}
                        onChange={event => this.handleCheckbox(event, i)}
                        color={"primary"}
                      /> */}
                    </TableCell>

                    <TableCell align="centre">{n.name}</TableCell>
                    <TableCell align="centre">{n.application}</TableCell>
                    <TableCell align="centre">{n.comment}</TableCell>
                    <TableCell align="centre">{n.status}</TableCell>
                  </TableRow>
                );
              })}
              {/* {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
const tablestyles = theme => ({
  root: {
    width: "100%",
    marginTop: "20px"
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tabletitle: {},
  grid: {
    width: "60%"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});
export default withStyles(tablestyles)(MyTAble);
