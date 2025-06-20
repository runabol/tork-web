module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPresets: {
    parserOpts: {
      headerPattern: /^(\w+):\s(\[\w+\])\s-\s(\w+)$/,
      headerCorrespondence: ['type', 'scope', 'subject', 'body'],
    },
  },
  rules: {
    'subject-case': [2, 'always', ['sentence-case']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
