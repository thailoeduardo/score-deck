module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat',   // Funcionalidade nova
          'fix',    // Correção de bug
          'docs',   // Documentação
          'style',  // Apenas formatação (sem mudança no código)
          'refactor', // Refatoração (sem mudança na lógica)
          'perf',   // Melhorias de desempenho
          'test',   // Adiciona/atualiza testes
          'chore',  // Alterações no build ou ferramentas
          'release' // Lançamento de nova versão
        ]
      ],
      'type-empty': [2, 'never'], // Tipo não pode estar vazio
      'subject-empty': [2, 'never'], // Assunto não pode estar vazio
      'subject-case': [0], // Permite qualquer capitalização no assunto
    }
  };
