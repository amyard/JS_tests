const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const app = require('express')();


const config = {
    apiKey: "AIzaSyBTs7lmJONMxOaSnyOisrAIePpC8ir-PbY",
    authDomain: "socialape-259334.firebaseapp.com",
    databaseURL: "https://socialape-259334.firebaseio.com",
    projectId: "socialape-259334",
    storageBucket: "socialape-259334.appspot.com",
    messagingSenderId: "113657043612",
    appId: "1:113657043612:web:0c906d1102a9a2217a2b59",
    measurementId: "G-R6F99VW19N"
};


const firebase = require('firebase');
firebase.initializeApp(config)

const db =  admin.firestore()




app.get('/screams', (req, res)=> {
    db.collection('screams').orderBy('createdAt','desc').get().then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(screams);
    })
    .catch(err=>console.error(err));
})




app.post('/scream', (req, res) => {
    
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    db.collection('screams').add(newScream).then(doc=> {
        res.json({message: `document ${doc.id} created successfully`})
    }).catch(err=> {
        res.status(500).json({error:'something went wrong'});
        console.error(err);
    });
});


// signup route
app.post('/signup', (req, res)=>{
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }

    // TODO validate data
    // new user already exists
    db.doc(`/users/${newUser.handle}`).get().then(doc=> {
        if(doc.exists){
            return res.status(400).json({handle: 'this handle is already taken'});
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.status(201).json({token})
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({error:err.code});
    })

    // firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    //     .then(data=> {
    //         return res.status(201).json({message: `user ${data.user.id} signed up successfully`});
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //         return res.status(500).json({error:err.code});
    //     })
});



exports.api = functions.region('europe-west1').https.onRequest(app);