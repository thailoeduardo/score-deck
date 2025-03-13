module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat',   // Nova funcionalidade
          'fix',    // Correção de bug
          'docs',   // Documentação
          'style',  // Formatação (sem mudança no código)
          'refactor', // Refatoração (sem mudança na lógica)
          'perf',   // Melhorias de desempenho
          'test',   // Testes adicionados/alterados
          'chore',  // Alterações no build ou ferramentas
          'release' // Lançamento de nova versão
        ]
      ],
      'type-empty': [2, 'never'], // Tipo não pode estar vazio
      'subject-empty': [2, 'never'], // Assunto não pode estar vazio
      'subject-case': [0], // Permite qualquer formatação no assunto
    }
  };
