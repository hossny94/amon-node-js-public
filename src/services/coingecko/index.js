const CONFIG = require('../../../config');
const errors = require('../../helpers/errors');
const AxiosService = require('../axios/index');

const CoinGeckoService = {
  async getCoinPrice(coinObj) {
    const { code, name } = coinObj;
    const coinId = await this.getCoinId(code, name);
    return this.getCoinPriceById(coinId);
  },

  async getCoinId(code, name) {
    const url = `${CONFIG.SERVICES.COINGECKO.BASE_URL}/list`;
    const response = await AxiosService.fetch(url);
    if (!response || response.status !== 200) errors.throwError('Failed to fetch coins list from CoinGecko');
    const coinsList = response.data;
    const coins = coinsList.filter((item) => item.symbol.toUpperCase() === code && item.name === name);
    if (coins.length === 0) errors.assertExposable(false, 'unknown_coin_code');
    return coins[0].id;
  },

  async getCoinPriceById(coinId) {
    const url = `${CONFIG.SERVICES.COINGECKO.BASE_URL}/${coinId}`;
    const response = await AxiosService.fetch(url);
    if (!response || response.status !== 200) errors.assertExposable(false, 'unknown_coin_code');
    return response.data.market_data.current_price.usd.toString(); // TODO: Check default currency
  },
};

module.exports = CoinGeckoService;
