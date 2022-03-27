import { makeApp } from './app';
import Logger from './utility/log';
import { PORT } from './config';

makeApp().listen(PORT, () => Logger.log('Backend runs on', PORT, '🧑‍🚀'));
