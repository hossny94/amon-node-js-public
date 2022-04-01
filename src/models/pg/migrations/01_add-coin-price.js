'use strict';

module.exports = {
  up: async function (query, transaction) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const sql = `
      ALTER TABLE "Coin"
      ADD "price" VARCHAR(255),
      ADD "priceLastUpdatedAt" DATE,
      ADD CONSTRAINT Coin_code_ukey UNIQUE (code);
    `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  },

  down: async function (query, transaction) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const sql = `
     ALTER TABLE "Coin"
     DROP "price",
     DROP "priceLastUpdatedAt",
     DROP CONSTRAINT Coin_code_ukey;
   `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  },
};
