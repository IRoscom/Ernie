const { message } = require('../../../config.json');
const sendMessage = require('../../helpers/sendMessage');

module.exports = async (client) => {
    if(message) new sendMessage(client).send()
    console.log('Запустился')
}