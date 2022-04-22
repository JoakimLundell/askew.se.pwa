//import firebase from "firebase/app"
//import 'firebase/auth'
//import "firebase/database";

// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

//import { onUnmounted, ref, computed } from 'vue';

const config = {
    apiKey: "AIzaSyDnbrcpmpergeZENH2u3k-fUtT5Kf4qjjo",
    authDomain: "askew-server.firebaseapp.com",
    databaseURL: "https://askew-server.firebaseio.com",
    projectId: "askew-server",
    storageBucket: "askew-server.appspot.com",
    messagingSenderId: "856345091020"
}

/* new
const config = {
    apiKey: "AIzaSyCS3E5vnqDCFcF7fxZ7Ze_9bIrU5hfmutU",
    authDomain: "askew-185ae.firebaseapp.com",
    projectId: "askew-185ae",
    storageBucket: "askew-185ae.appspot.com",
    messagingSenderId: "153117153329",
    appId: "1:153117153329:web:7594fc4991296c391a9d10"
}
*/

firebase.initializeApp(config);
const auth = firebase.auth();
const database = firebase.database();

export {
    auth, database};
