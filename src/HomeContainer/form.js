import React, { Component } from "react";
import "./style.css";
import {
  Input,
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
// import Input from "react-speech-recognition-input";
import { withStyles } from "@material-ui/core/styles";
import "react-table/react-table.css";
import axios from "axios";
import myDB from "../setup";
const url =
  "https://us-central1-syscodemo-iuqlqw.cloudfunctions.net/nodeserver/";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      application: "",
      aprovername: "",
      phoneNumber: ""
    };
  }
  handleClick = () => {
    var data = {
      name: this.state.name,
      comment: this.state.comment,
      status: "Pending",
      application: this.state.application,
      phoneNumber: "+91" + this.state.phoneNumber.toString(),
      approvername: this.state.approvername
    };
    myDB
      .collection("vendors")
      .add(data)
      .then(snapshot => {
        data.id = snapshot.id;
        axios({
          method: "POST",
          url: url + "call",
          data: data,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(result => console.log(result))
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
      });
    this.props.history.push("/list");
  };
  render() {
    return (
      <div className={"formContainer"}>
        <div className={""}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Raise a request
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ marginTop: "100px" }}>
          <div>
            <TextField
              id="standard-required"
              label="Name"
              margin="normal"
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
              value={this.state.name}
              className={"formInput"}
            />
          </div>
          <div>
            <TextField
              id="standard-required"
              label="Application"
              margin="normal"
              className={"formInput"}
              value={this.state.application}
              onChange={e => {
                this.setState({ application: e.target.value });
              }}
            />
          </div>
          <div>
            <TextField
              id="standard-required"
              label="Approver Name"
              margin="normal"
              className={"formInput"}
              value={this.state.approvername}
              onChange={e => {
                this.setState({ approvername: e.target.value });
              }}
            />
          </div>
          <div>
            <TextField
              id="standard-required"
              label="Approver Phone Number"
              margin="normal"
              className={"formInput"}
              type="number"
              value={this.state.phoneNumber}
              onChange={e => {
                this.setState({ phoneNumber: e.target.value });
              }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Comment"
              placeholder="comment"
              multiline
              margin="normal"
              variant="outlined"
              onChange={e => {
                this.setState({ comment: e.target.value });
              }}
              value={this.state.comment}
              className={"formInput"}
            />
          </div>
          <div>
            <div className={"buttonparent"}>
              <Button
                color={"primary"}
                variant="contained"
                onClick={() => this.handleClick()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles()(Home);
