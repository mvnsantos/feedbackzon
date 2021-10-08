
exports.seed = function (knex) {
  // Deletes ALL existing entries

  const created = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo'
  });

  return knex('system').del()
    .then(function () {
      // Inserts seed entries
      return knex('system').insert([
        { id: 1, name: 'Teste', created: created },
        { id: 2, name: 'Contábil', created: created },
        { id: 3, name: 'Fiscal', created: created },
        { id: 4, name: 'Intax', created: created },
        { id: 5, name: 'Analir', created: created },
        { id: 6, name: 'Analir Plus', created: created },
        { id: 7, name: 'Social', created: created }
      ]);
    });
};
