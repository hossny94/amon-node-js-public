const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');

const CoinController = {
  async getCoinByCode(coinCode) {
    const coin = await Models.Coin.findByCoinCode(coinCode);

    errors.assertExposable(coin, 'unknown_coin_code');

    return coin.filterKeys();
  },

  async createCoin(coinObj) {
    const code = coinObj.code.toUpperCase();
    // Check if coin already exists
    let coin = await Models.Coin.findByCoinCode(code);
    errors.assertExposable(!coin, 'conflict_coin_code');

    coin = await Models.Coin.createCoin(coinObj);
    return coin.filterKeys();
  },
};

module.exports = CoinController;
