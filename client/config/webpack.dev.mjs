/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve as _resolve } from 'path';
import { env } from 'process';
require('dotenv').config();
const env_mode = env.NODE_ENV;
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { DefinePlugin } from 'webpack';
import PreactRefreshPlugin from '@prefresh/webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { cwd } from 'process';

console.log(env_mode);
const curProcess = cwd();

export const entry = _resolve(curProcess, 'src');
export const output = {
	path: _resolve(curProcess, './dist'),
	publicPath: '/',
	filename: 'public/js/bundle.js',
};
export const devtool = 'source-map';
export const devServer = {
	contentBase: _resolve(curProcess, 'src/assets'),
	contentBasePublicPath: '/',
	historyApiFallback: true,
	hot: false,
	compress: true,
	writeToDisk: true,
};
export const mode = 'development';
export const module = {
	rules: [
		{
			test: /\.tsx?$/,
			include: /src/,
			exclude: [/node_modules/, /cypress/],
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@emotion/babel-preset-css-prop',
						],
						plugins: [
							'@babel/plugin-transform-runtime',
							'@prefresh/babel-plugin',
							'istanbul',
						],
						compact: false,
						cacheDirectory: true,
						cacheCompression: false,
						sourceMaps: true,
						inputSourceMap: true,
					},
				},
				{
					loader: 'ts-loader',
					options: {
						compilerOptions: {
							target: 'esnext',
							module: 'esnext',
							react: 'preserve',
							lib: ['dom', 'dom.iterable', 'esnext'],
						},
					},
				},
			],
		},
		{
			test: /\.jsx?$/,
			exclude: [/node_modules/, /cypress/],
			include: /src/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/react',
							'@emotion/babel-preset-css-prop',
						],
						plugins: [
							'@babel/plugin-transform-runtime',
							'@prefresh/babel-plugin',
							'istanbul',
						],
						compact: true,
						cacheDirectory: true,
						cacheCompression: true,
						sourceMaps: true,
						inputSourceMap: true,
					},
				},
			],
		},
		{
			test: /\.css?$/,
			use: ['style-loader', 'css-loader'],
		},
		{
			// eslint-disable-next-line security/detect-unsafe-regex
			test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			type: 'asset/resource',
			generator: {
				filename: 'public/fonts/[name].[ext]',
			},
		},
		{
			test: /\.(jpg|jpeg|png|webp)?$/,
			type: 'asset',
			generator: { filename: 'public/images/[name].[ext]' },
		},
		{
			test: /\.gif?$/,
			type: 'asset',
			generator: { filename: 'public/gif/[name].[ext]' },
		},
		{
			test: /\.m4v?$/,
			type: 'asset',
			generator: { filename: 'public/video/[name].[ext]' },
		},
		{
			test: /\.pdf$/,
			type: 'asset',
			generator: { filename: 'public/pdf/[name].[ext]' },
		},
		{
			test: /\.svg$/,
			use: [
				'babel-loader',
				{
					loader: 'react-svg-loader',
					options: {
						svgo: {
							plugins: [{ removeDimensions: true, removeViewBox: false }],
							floatPrecision: 2,
						},
					},
				},
			],
		},
	],
};
export const resolve = {
	alias: {
		react: 'preact/compat',
		'react-dom/test-utils': 'preact/test-utils',
		'react-dom': 'preact/compat',
		icons: _resolve(curProcess, './src/assets/icons'),
		assets: _resolve(curProcess, './src/assets'),
		pictures: _resolve(curProcess, './src/static/Pictures'),
	},
	modules: ['src', 'node_modules'],
	extensions: ['.ts', '.tsx', '.js', '.jsx'],
};
export const plugins = [
	new PreactRefreshPlugin(),
	new ESLintPlugin(),
	new HtmlWebpackPlugin({
		template: _resolve(curProcess, 'src/index.html'),
		filename: 'index.html',
	}),
	new DefinePlugin({
		BACKEND_SERVER_URL: JSON.stringify('http://localhost:5050'),
	}),
	new CleanWebpackPlugin(),
];
