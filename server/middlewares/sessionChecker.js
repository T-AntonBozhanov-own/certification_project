const {HTTP_CODE} = require('../constants/httpCodes')

const sessionChecker = (req, res, next) => {    
        console.log(`Session Checker: ${req.session.id}`.green);
        console.log(req.session);
        if (req.session.user) {
            console.log('Found User Session');
            next();
        } else {
            console.log('No User Session Found');
            res.status(HTTP_CODE.UNAUTHORIZED).send({error: 'Unauthorized'});
        }
};

module.exports = sessionChecker