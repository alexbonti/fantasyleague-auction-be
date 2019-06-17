'use strict';
/**
 * Created by Navit
 */

var TokenManager = require('../lib/tokenManager');
var UniversalFunc = require('../utils/universalFunctions');
const AuthBearer = require('hapi-auth-bearer-token');

exports.register = async function (server, options, next) {

    await server.register(AuthBearer)
    //Register Authorization Plugin
    server.auth.strategy('UserAuth', 'bearer-access-token', {
        allowQueryToken: false,
        allowMultipleHeaders: true,
        accessTokenName: 'accessToken',
        validate: async function (request, token, h) {
            let isValid = false;
            let credentials = await TokenManager.decodeToken(token)
            if(credentials && credentials['userData']){
                isValid = true; 
            }
            return { isValid, credentials};
        }
    });
};

exports.name = 'auth-token-plugin'

