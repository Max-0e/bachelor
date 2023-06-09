import { makeApp } from './app';
import { PORT } from './config';
import Logger from './utility/log';

makeApp().listen(PORT, () => Logger.log('Backend runs on', PORT, '🧑‍🚀'));
