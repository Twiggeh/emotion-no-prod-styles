// Libraries
import express from 'express';
import { dirname, join, resolve } from 'path';
import { URL } from 'url';
const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));
export const PROJECT_ROOT = resolve(__dirname, '../../');
const port = 5000;
const app = express();
app.get('/public/*', (req, res) => {
	res.sendFile(join(PROJECT_ROOT, 'client', 'dist', req.url));
});
app.get('*', (req, res) => {
	console.log(__dirname);
	res.sendFile(join(PROJECT_ROOT, 'client', 'dist', 'index.html'));
});
// Start up server
app.listen(port, () => {
	console.log(`Dev server is listening on port ${port}`);
});
