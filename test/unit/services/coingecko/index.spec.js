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

  describe('getCoinPrice', () => {
    it('should get coin price by code', async () => {
      const coinCode = 'ETH';
      const price = await CoinGeckoService.getCoinPrice(coinCode);
      expect(price).to.be.a('string');
    });

    it('should fail to get coin price by code', async () => {
      const coinCode = 'DummyCode';
      expect(CoinGeckoService.getCoinPrice(coinCode)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });
});
