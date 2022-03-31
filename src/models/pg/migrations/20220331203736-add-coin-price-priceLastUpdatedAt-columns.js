'use strict';

module.exports = {
  up: async (query, transaction) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const sql = `
      ALTER TABLE "Coin"
      ADD price VARCHAR(255);
      ADD priceLastUpdatedAt DATE;
    `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  },
};
