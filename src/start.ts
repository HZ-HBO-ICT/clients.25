// start.js setup from learnnode.com by Wes Bos
import Express, { Application, Request, Response, NextFunction } from 'express';
import * as Dotenv from 'dotenv';
import { errorHandler } from './middleware/errors/errorHandler.js';
import router from './routes.ts';

Dotenv.config({ path: '.env' });

const app: Application = Express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3010;

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// tell our server to use custom router.
app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    //set header before response
    res.status(404).send('Sorry can\'t find that! Please explore more troubleshooting options.');
  } catch (err) {
    next(err);
  }
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🍿 Express running → PORT ${port}`);
});
