const moment = require('moment');
const errors = require('../../../helpers/errors');
const { isDateOlderThanXUnits } = require('../../../helpers/utils');
const Models = require('../../../models/pg');
const logger = require('../../../modules/logger');
const CoinGeckoService = require('../../coingecko/index');

const CoinController = {
  async getCoinByCode(coinCode) {
    const code = coinCode.toUpperCase();
    // Check if coin already exists
    const coin = await Models.Coin.findByCoinCode(code);
    errors.assertExposable(coin, 'unknown_coin_code');

    // Fetch coin price if needed
    let { price, priceLastUpdatedAt } = coin;
    let lastUpdateOlderThanOneHourAgo;
    if (priceLastUpdatedAt) lastUpdateOlderThanOneHourAgo = isDateOlderThanXUnits(priceLastUpdatedAt, 1, 'hours');

    if (lastUpdateOlderThanOneHourAgo || !price) {
      try {
        const price = await CoinGeckoService.getCoinPrice(coin);
        coin.price = price;
        coin.priceLastUpdatedAt = moment();
        await coin.save();
      } catch (error) {
        logger.error('Failed to fetch the coin price', { error });
        // TODO: Check if we need to fail the endpoint if fetching the price fails
      }
    }

    return coin.filterKeys();
  },

  async createCoin(coinObj) {
    const code = coinObj.code.toUpperCase();
    // Check if coin already exists
    let coin = await Models.Coin.findByCoinCode(code);
    errors.assertExposable(!coin, 'conflict_coin_code');

    // TODO: Add coin name validation using CoinGecko if needed

    // Fetch coin price
    try {
      const price = await CoinGeckoService.getCoinPrice(coinObj);
      coinObj = {
        ...coinObj,
        price,
        priceLastUpdatedAt: moment(),
      };
    } catch (error) {
      logger.error('Failed to fetch the coin price', { error });
      // TODO: Check if we need to fail the endpoint if fetching the price fails
    }

    // Create new coin
    coin = await Models.Coin.createCoin(coinObj);
    return coin.filterKeys();
  },
};

module.exports = CoinController;
