const axios = require('axios');

const AxiosService = {
    async fetch(url) {
        const response = await axios({
            method: 'GET',
            url,
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });

        return response;
    }
}

module.exports = AxiosService;