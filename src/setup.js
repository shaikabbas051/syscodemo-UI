import * as firebase from "firebase";
import config from "./config.js";
firebase.initializeApp(config);
const myDB = firebase.firestore();
export default myDB;
