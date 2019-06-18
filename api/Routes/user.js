const express = require('express');
const router = express.Router();
const {google} = require('googleapis');

const Scope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

const googleConfig = {
    cliendId: "760894743226-g62tkfeqdg19o05ssstl1629oodsrm7b.apps.googleusercontent.com",
    clientSecret: "mivbQO5VsXwIB-c47Gm20Nco",
    redirect: "https://localhost:8080/google-auth"
};

router.post('/', (req, res)=>{
    const OAuth = new google.auth.OAuth2(
        googleConfig.cliendId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
    const url = OAuth.generateAuthUrl({
        access_type: 'offline',
        propmt: 'consent',
        scope: Scope
    })
    res.send(url);
});

router.post('/signin', (req, res)=>{
    const code = req.cost;
    
});

module.exports = router;