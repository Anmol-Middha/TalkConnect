const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(){
    userSchema = new Schema({
        email: {type: String, required: true, trim:true, unique:true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    })
    
    userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb){
        const that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });
    
                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });      
    }
    return 
}