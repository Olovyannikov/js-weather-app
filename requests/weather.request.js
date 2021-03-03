const rp = require('request-promise');

module.exports = async function (city = '') {
    if (!city) {
        throw new Error('Имя города не может быть пустым');
    }

    //?q=${city}&appid=${KEY}

    const KEY = '403d907e1e6af0df1162b67108a8a7e0';
    const uri = `http://api.openweathermap.org/data/2.5/weather`

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'metric'
        },
        json: true,
    }

    try {
        const data = await rp(options);
        return {
            weather: `${data.name}: ${data.main.temp.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
};