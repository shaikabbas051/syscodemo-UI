import React, { Component } from "react";
import "./style.css";
import {
  AppBar,
  Button,
  Modal,
  FormControl,
  NativeSelect,
  Typography,
  Toolbar,
  Grid,
  withWidth,
  Item,
  IconButton
} from "@material-ui/core";
import Input from "react-speech-recognition-input";
import { withStyles } from "@material-ui/core/styles";
import "react-table/react-table.css";
import * as firebase from "firebase";
import config from "../config.js";
import axios from "axios";
import MyTAble from "./table.js";
import DateFnsUtils from "@date-io/date-fns";
import { Call, CalendarToday, Mic, Message } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DateTimePicker } from "material-ui-pickers";
// firebase.initializeApp(config);
// const myDB = firebase.firestore();
import myDB from "../setup";

const url = "https://3286cf8a.ngrok.io/";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [
        { label: "Name" },
        { label: "Application" },
        { label: "Comment" },
        { label: "Status" }
      ],
      data1: [],
      selected: [],
      open: false,
      open5: false,
      selectValue: "",
      ressons: ["Traffic", "Deliver tomorrow"],
      scheduleDate: new Date(),
      recordedMsg: "there will be delay in delivery"
    };
  }
  componentWillMount() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    // myDB.collection("users").onSnapshot(snapshot => {
    //   let data = [];
    //   snapshot.forEach(function(doc) {
    //     let obj = doc.data();
    //     obj.id = doc.id;
    //     data.push(obj);
    //     console.log(data);
    //   });
    //   console.log(data);
    //   this.setState({ data1: data });

    // });
    const dbref = myDB.collection("vendors");
    dbref.onSnapshot(snap => {
      let data = [];
      snap.forEach(function(doc) {
        let obj = doc.data();
        obj.id = doc.id;
        data.push(obj);
        console.log(data);
      });
      this.setState({ data1: data });
    });
  }
  getdata = () => {
    return myDB
      .collection("vendors")
      .get()
      .then(snapshot => {
        console.log(snapshot);
        let data = [];
        snapshot.forEach(item => {
          let obj = item.data();
          obj.id = item.id;
          data.push(obj);
        });
        this.setState({ data1: data, selected: [] });
      })
      .catch(error => {
        console.log(error);
      });
  };
  onSelectAllClick = e => {
    let checked = e.target.checked;
    if (checked) {
      let data = [];
      this.state.data1.map((item, i) => {
        data.push(i);
      });
      this.setState({ selected: data });
    } else {
      this.setState({ selected: [] });
    }
  };
  makeCall = () => {
    let data = [];
    this.state.selected.map(item => {
      data.push(this.state.data1[item]);
    });
    // data.map(async item => {
    //   let result = await axios({
    //     method: "POST",
    //     url: url + "call",
    //     data: item,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   console.log(result);
    // });
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
  };
  handleCheckbox = (e, i) => {
    let checked = e.target.checked;
    if (checked) {
      this.setState({ selected: [...this.state.selected, i] });
    } else {
      let arr = this.state.selected.filter(item => {
        return item != i;
      });
      this.setState({ selected: arr });
    }
  };
  handleModal = () => {
    this.setState({ open: false });
  };
  handleModal1 = () => {
    this.setState({ open1: false });
  };
  handleModal5 = () => {
    this.setState({ open5: false });
  };

  handleSelect = e => {
    this.setState({ selectValue: e.target.value });
  };
  openModal = () => {
    if (this.state.selected.length) {
      this.setState({ open: true });
    }
  };
  sendDelay = () => {
    // this.state.selected.map(item => {
    //   let data = this.state.data1[item];
    //   data.message = this.state.ressons[this.state.selectValue];
    //   let result = axios({
    //     method: "post", //you can set what request you want to be
    //     url: url + "delaymsg",
    //     data: data,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   console.log(result);
    // });
    let data = [];
    this.state.selected.map(item => {
      let obj = this.state.data1[item];
      let querydata = {
        name: obj.name,
        phoneNumber: obj.phoneNumber,
        message: this.state.ressons[this.state.selectValue],
        id: obj.id
      };
      data.push(querydata);
    });
    console.log(data);
    axios({
      method: "POST", //you can set what request you want to be
      url: url + "delaymsg",
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleDateChange = date => {
    this.setState({ scheduleDate: date });
  };
  schedule = () => {
    let data = [];
    if (this.state.selected.length) {
      this.state.selected.map(async item => {
        let obj = this.state.data1[item];
        obj.schedule = this.state.scheduleDate;
        data.push(obj);
      });
    }
    // data.map(async item => {
    //   let result = await axios({
    //     method: "post", //you can set what request you want to be
    //     url: url + "schedule",
    //     data: item,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   console.log(result);
    // });
    axios({
      method: "post", //you can set what request you want to be
      url: url + "schedule",
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  scheduleModal = () => {
    if (this.state.selected.length) {
      this.setState({ open1: true });
    }
  };
  recordModal = () => {
    if (this.state.selected.length) {
      this.setState({ open5: true });
    }
  };

  changingstate = e => {
    this.setState({ value: e.target.value });
  };

  keypress(e) {
    if (e.keypress === "Enter") {
      e.preventDefault();
      this.setState({ value: "" });
    }
  }

  reset() {
    this.setState({
      value: ""
    });
  }
  sendRecord = () => {
    let data = [];
    if (this.state.selected.length) {
      this.state.selected.map(async item => {
        let obj = this.state.data1[item];
        obj.message = this.state.recordedMsg;
        data.push(obj);
      });
    }
    // data.map(async item => {
    //   let result = await axios({
    //     method: "post", //you can set what request you want to be
    //     url: url + "record",
    //     data: item,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   console.log(result);
    // });
    axios({
      method: "POST",
      url: url + "record",
      data: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className={"homeContainer"}>
        <div className={""}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Approval logs
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={"homeBody"}>
          <MyTAble
            handleCheckbox={this.handleCheckbox}
            onSelectAllClick={this.onSelectAllClick}
            data={this.state.data}
            data1={this.state.data1}
            selected={this.state.selected}
            handleDateChange={this.handleDateChange}
            getData={this.getdata}
          />
          <div />
          {this.state.selected.length ? (
            this.state.width > 549 ? (
              <div className={"submitDiv"}>
                <Button
                  style={{ marginTop: "2%" }}
                  variant="contained"
                  color="primary"
                  // onClick={this.getdata}
                  className={"submitButton"}
                  onClick={this.recordModal}
                >
                  Record
                </Button>
                <Button
                  style={{ marginTop: "2%" }}
                  variant="contained"
                  color="primary"
                  onClick={this.openModal}
                  className={"submitButton"}
                >
                  Delay Resonse
                </Button>
                <Button
                  style={{ marginTop: "2%" }}
                  variant="contained"
                  color="primary"
                  className={"submitButton"}
                  onClick={this.scheduleModal}
                >
                  Schedule
                </Button>
                <Button
                  style={{ marginTop: "2%" }}
                  variant="contained"
                  color="primary"
                  onClick={this.makeCall}
                  className={"submitButton"}
                >
                  Trigger Call
                </Button>
              </div>
            ) : (
              <div className={"submitDiv"}>
                <IconButton aria-label="Filter list" onClick={this.makeCall}>
                  <Call />
                </IconButton>
                <IconButton
                  aria-label="Filter list"
                  onClick={this.scheduleModal}
                >
                  <CalendarToday />
                </IconButton>
                <IconButton aria-label="Filter list" onClick={this.recordModal}>
                  <Mic />
                </IconButton>
                <IconButton aria-label="Filter list" onClick={this.openModal}>
                  <Message />
                </IconButton>
              </div>
            )
          ) : null}
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleModal}
            >
              <div style={getModalStyle()} className={this.props.classes.paper}>
                <Typography variant="subtitle1" id="simple-modal-description">
                  Select any reason.
                </Typography>
                <FormControl className={this.props.classes.formControl}>
                  <NativeSelect
                    value={this.state.age}
                    onChange={this.handleSelect}
                    name="age"
                    className={this.props.classes.selectEmpty}
                  >
                    <option value="">None</option>
                    {this.state.ressons.map((item, i) => {
                      return <option value={i}>{item}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.sendDelay}
                  className={this.props.classes.sendButton}
                >
                  Send
                </Button>
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open1}
              onClose={this.handleModal1}
            >
              <div style={getModalStyle()} className={this.props.classes.paper}>
                <Typography variant="subtitle1" id="simple-modal-description">
                  Pick a time
                </Typography>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  style={this.props.classes.muipicker}
                >
                  <Grid
                    container
                    className={this.props.classes.grid}
                    // justify="space-around"
                  >
                    <DateTimePicker
                      value={this.state.scheduleDate}
                      onChange={this.handleDateChange}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.schedule}
                  className={this.props.classes.sendButton}
                >
                  Schedule
                </Button>
              </div>
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open5}
              onClose={this.handleModal5}
            >
              <div style={getModalStyle()} className={this.props.classes.paper}>
                <Typography>Record Your Voice</Typography>
                <Input
                  onChange={value => this.setState({ recordedMsg: value })}
                  onEnd={value => {
                    console.log(value);
                  }}
                />

                <Typography>
                  {value => {
                    console.log(value);
                  }}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.sendRecord}
                  className={this.props.classes.sendButton}
                >
                  Send Message
                </Button>
              </div>
            </Modal>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

const mainstyle = theme => ({
  button: {
    marginRight: "10px",
    marginBottom: "10px"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: "block"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },

  muipicker: {
    display: "block",
    width: "fit-content"
  },
  grid: {
    width: "100%",
    display: "block"
  }
});
function getModalStyle() {
  const top = 30;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
export default withStyles(mainstyle)(Home);
