import * as functions from 'firebase-functions';
import { database, initializeApp } from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const defaultPicturePath = 'https://firebasestorage.googleapis.com/v0/b/webshop-9dc0f.appspot.com/o/default-profile-picture%2Fdefault-profile-picture.jpg?alt=media&token=56abb88b-11b6-414e-92c4-2b978b747fec'

initializeApp(functions.config().firebase);

export const newUser = functions.auth.user().onCreate(async user => {
    await database().ref(`/users/${user.uid}`)
    .set({
        id: user.uid,
        name: user.email.split('@')[0],
        email: user.email,
        admin: false,
        img: defaultPicturePath
    })
    .catch(err => console.log(err))
});
