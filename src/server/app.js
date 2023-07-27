import express from 'express';
import * as path from 'node:path';
import * as url from 'node:url';

import registerRoutes from './routes.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = 3000;

app.staticPath = path.join(__dirname, 'static');
app.use(express.static(app.staticPath));

registerRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
