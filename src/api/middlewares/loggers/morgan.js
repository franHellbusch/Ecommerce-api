const logger = require('morgan');
const configuration = require('../../common/configuration');

const morgan = () => {
    return logger(configuration.morgan);
}

module.exports = morgan