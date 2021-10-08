const { EnumRoles } = require('../../config/enumRoles')

exports.seed = function (knex) {
  // Deletes ALL existing entries

  const created = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  });

  return knex('applicationUser').del()
    .then(function () {
      // Inserts seed entries
      return knex('applicationUser').insert([
        {
          userName: 'system', created: created, password: '123', role: EnumRoles.APPLICATION
        },
        {
          userName: 'admin', created: created, password: '123', role: EnumRoles.ADMINISTRATOR
        },
        {
          userName: 'report', created: created, password: '123', role: EnumRoles.REPORT
        }

      ]);
    });
};
