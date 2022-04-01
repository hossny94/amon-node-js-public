const path = require('path');
const sinon = require('sinon');
const CoinGeckoService = require(path.join(srcDir, '/services/coingecko/index'));

describe('Service: CoinGecko', () => {
  let sandbox = null;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('getCoinId', () => {
    it('should get coin id by code and name', async () => {
      const coinCode = 'BTC';
      const coinName = 'Bitcoin';
      const id = await CoinGeckoService.getCoinId(coinCode, coinName);
      expect(id).to.be.eq('bitcoin');
    });

    it('should fail to get coin id by dummy code and dummy name', async () => {
      const coinCode = 'DummyCode';
      const coinName = 'DummyName';
      expect(CoinGeckoService.getCoinId(coinCode, coinName)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });

  describe('getCoinPriceById', () => {
    it('should get coin price by coin id', async () => {
      const coinId = 'bitcoin';
      const price = await CoinGeckoService.getCoinPriceById(coinId);
      expect(price).to.be.a('string');
    });

    it('should fail to get coin price by dummy coin id', async () => {
      const coinId = 'dummy';
      expect(CoinGeckoService.getCoinPriceById(coinId)).to.be.rejectedWith(
        Error,
        'Request failed with status code 404'
      );
    });
  });

  describe('getCoinPrice', () => {
    it('should get coin price by code and name', async () => {
      const coinObj = {
        code: 'BTC',
        name: 'Bitcoin',
      };
      const price = await CoinGeckoService.getCoinPrice(coinObj);
      expect(price).to.be.a('string');
    });

    it('should fail to get coin price by dummy code and dummy name', async () => {
      const coinObj = {
        code: 'DummyCode',
        name: 'DummyName',
      };
      expect(CoinGeckoService.getCoinPrice(coinObj)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });
});
