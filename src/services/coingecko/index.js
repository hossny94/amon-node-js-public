const CONFIG = require('../../../config');
const errors = require('../../helpers/errors');
const AxiosService = require('../axios/index');

const CoinGeckoService = {
  async getCoinPrice(code) {
    const coinId = await this.getCoinId(code);
    return this.getCoinPriceById(coinId);
  },

  async getCoinId(coinCode) {
    const url = `${CONFIG.SERVICES.COINGECKO.BASE_URL}/list`;
    const response = await AxiosService.fetch(url);
    if (!response || response.status !== 200) errors.throwError('Failed to fetch coins list from CoinGecko');
    const coinsList = response.data;
    const coin = coinsList.filter((item) => item.symbol.toUpperCase() === coinCode)[0];
    if (!coin || !coin.id) errors.throwError('Unknown coin code');
    return coin;
  },

  async getCoinPriceById(coinId) {
    const url = `${CONFIG.SERVICES.COINGECKO.BASE_URL}/${coinId}`;
    const response = await AxiosService.fetch(url);
    if (!response || response.status !== 200) errors.throwError('Failed to fetch coin price from CoinGecko');
    return response.data.market_data.current_price.usd; // TODO: Check default currency
  },
};

module.exports = CoinGeckoService;