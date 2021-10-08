var bcrypt = require('bcryptjs');
const { EnumRoles } = require('../../config/enumRoles')

exports.seed = function (knex) {
  // Deletes ALL existing entries

  const created = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  });

  return knex('feature').del()
    .then(function () {
      // Inserts seed entries
      return knex('feature').insert([
        { id: 2, name: 'Conciliação automática', systemId: 2, created: created },
        { id: 3, name: 'Assinatura digital', systemId: 3, created: created },
        { id: 4, name: 'Consolidar valores matriz e filiais', systemId: 3, created: created },
        { id: 5, name: 'Conciliação - Ações em lote', systemId: 2, created: created },

      ]);
    });
};
