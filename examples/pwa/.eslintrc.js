module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: process.cwd()
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	env: {
		browser: true,
		'jest/globals': true
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'react',
		'react-hooks',
		'jest',
		'jsx-a11y',
		'prettier'
	],
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier'
	],
	rules: {
		// Vanilla rules
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'comma-dangle': 'off',
		'implicit-arrow-linebreak': 'off',
		'max-len': [
			'error',
			{
				code: 120,
				ignoreComments: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true
			}
		],
		'no-extra-semi': 'off',
		'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'r'] }],
		'no-tabs': 'off',
		'no-underscore-dangle': 'off',
		'no-unused-expressions': [
			'warn',
			{
				allowShortCircuit: true,
				allowTernary: true
			}
		],
		'no-use-before-define': 'off',
		semi: ['error', 'always'],
		'prefer-arrow-callback': 'off',
		// @typescript-eslint
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-use-before-define': 'error',
		'@typescript-eslint/prefer-interface': 'off',
		// import
		'import/export': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never'
			}
		],
		'import/first': 'off',
		'import/named': 'off',
		'import/no-extraneous-dependencies': 'warn',
		'import/prefer-default-export': 'off',
		// prettier
		'prettier/prettier': 'error',
		// react-hooks
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		// react
		'react/jsx-boolean-value': 1,
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/prop-types': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.jsx', '.tsx', '.js', '.ts']
			}
		]
	},
	overrides: [
		{
			// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
			// enable the rule specifically for TypeScript files
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': ['error'],
				'@typescript-eslint/explicit-module-boundary-types': ['error']
			}
		},
		{
			files: ['sdk/**/*'],
			rules: {
				'@typescript-eslint/no-var-requires': 0
			}
		}
	]
};
