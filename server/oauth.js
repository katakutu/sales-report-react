"use strict";


module.exports = {
    login: function(req, res, next) {
        res.redirect('/');
    },
    logout: function(req, res, next) {
        res.redirect('/');
    },
    redirect: function(req, res, next) {
         res.redirect('/');
    },
    userInfo: function(req, res, next) {
         res.json({
            user_id: 12345
         });
    },
};