import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBxqcIpVfqgV9BMWexmhnpBFNWhmBKxLG0",
    authDomain: "imagix-2b84d.firebaseapp.com",
    projectId: "imagix-2b84d",
    storageBucket: "imagix-2b84d.appspot.com",
    messagingSenderId: "204125306084",
    appId: "1:204125306084:web:b6970a694669b69516c0f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };


// import firebase from 'firebase/compat/app';
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/firestore';

// const firebaseConfig = {
//     apikey: "AIzaSyBxqcIpVfqgV9BMWexmhnpBFNWhmBKxLG0",
//     authDomain: "imagix-2b84d.firebaseapp.com",
//     projectId: "imagix-2b84d",
//     storageBucket: "imagix-2b84d.appspot.com",
//     messagingSenderId: "204125306084",
//     appId: "1:204125306084:web:b6970a694669b69516c0f1",
// };

// firebase.initializeApp(firebaseConfig);


// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const auth = firebase.auth();

// export { projectStorage, projectFirestore, timestamp, auth };
