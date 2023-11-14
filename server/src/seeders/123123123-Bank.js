module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [
      {
        cardNumber: '4564654564564564',
        name: 'SquadHelp',
        expiry: '11/22',
        cvc: '453',
        balance: 0,
      },
      {
        cardNumber: '4111111111111111',
        name: 'yriy',
        expiry: '09/23',
        cvc: '505',
        balance: 5000,
      },
      {
        cardNumber: '1234654598744564',
        name: 'SquadHelp',
        expiry: '11/25',
        cvc: '453',
        balance: 0,
      },
      {
        cardNumber: '433234234524423',
        name: 'Daniyl',
        expiry: '09/24',
        cvc: '505',
        balance: 5000,
      },
      {
        cardNumber: '5311682367886379',
        name: 'Vitaliy',
        expiry: '10/24',
        cvc: '425',
        balance: 3500,
      }
    ], {});
  },

};
