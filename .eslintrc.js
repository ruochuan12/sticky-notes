module.exports = {
    // eslint 中文文档
    // https://eslint.cn/docs/user-guide/command-line-interface
    root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	// 这是 JavaScript standard 代码规范的全文。
	// https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html',
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// 不要使用制表符。
		'no-tabs': 'off',
		// 缩进
		'indent': [ 'error', 'tab', {
			'SwitchCase': 1,
			'MemberExpression': 0,
		}],
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		// 使用 debugger
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 分号 关于分号，链接末尾有些扩展阅读 https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
		'semi': [ 'error', 'always' ],
		// 是否允许有多余的行末逗号。
		'comma-dangle': [ 'error', {
			'arrays': 'only-multiline',
			'objects': 'only-multiline',
			'imports': 'only-multiline',
			'exports': 'only-multiline',
			'functions': 'ignore',
		}],
		// 是否允许 扩展原生对象。string除外
		'no-extend-native': [ 'error', { 'exceptions': [ 'String' ]}],
		// 函数声明时括号与函数名间加空格。
		'space-before-function-paren': [ 'error', {
			'anonymous': 'ignore',
			'named': 'ignore',
			'asyncArrow': 'ignore',
		}],
		// 代码块首尾留空格。
		'space-before-blocks': [ 'error', 'never' ],
		// 关键词后面加空格
		'keyword-spacing': [ 'error', {
			'after': true,
			'before': !true,
			'overrides': {
				'if': { 'after': !true },
				'while': { 'after': !true },
				'for': { 'after': !true },
				'else': { 'after': !true },
				'return': { 'after': true },
				'from': { 'after': true, 'before': true },
				'import': { 'after': true },
				'const': { 'after': true },
				'catch': { 'after': !true },
				'try': { 'after': !true },
				'do': { 'after': !true },
				'switch': { 'after': !true },
				'finally': { 'after': !true },
				'with': { 'after': !true },
				'break': { 'after': !true },
				'as': { 'before': true },
			},
		}],
		// else 关键字要与花括号
		'brace-style': [ 'error', 'stroustrup' ],
		// 注释首尾留空格。
		'spaced-comment': [ 'error', 'always' ],
		// 文件末尾留一空行。
		'eol-last': [ 'error', 'always' ],
		// 字符串拼接操作符 (Infix operators) 之间要留空格。
		'space-infix-ops': [ 'error', { 'int32Hint': !true }],
		// 对于变量和函数名统一使用驼峰命名法。
		'camelcase': [ 'error', { 'properties': 'never' }],
		// 代码块中避免多余留白。
		'padded-blocks': [ 'error', 'never' ],
		// 禁止未使用过的变量 (no-unused-vars) http://eslint.cn/docs/rules/no-unused-vars
		// 不要定义未使用的变量。
		// all 检测所有变量，包括全局环境中的变量。这是默认值。
		// args
		/**
		 *	args 选项有三个值：
		 * after-used - 最后一个参数必须使用。如：一个函数有两个参数，你使用了第二个参数，ESLint 不会报警告。
		 * all - 所有命名参数必须使用。
		 * none - 不检查参数。
		 */
		'no-unused-vars': [ 'error', { 'vars': 'all', 'args': 'none' }],
		// 字符串统一使用单引号。
		'quotes': [ 'error', 'single' ],
		// 除了缩进，不要使用多个空格
		'no-multi-spaces': 'error',
		// 逗号后面加空格
		'comma-spacing': [ 'error', { 'before': !true, 'after': true }],
		// 全等
		'eqeqeq': 'error',
	},
};