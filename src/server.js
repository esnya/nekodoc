import express from 'express';
import {Server} from 'http';
import {getLogger} from 'log4js';
import path from 'path';
import {route} from './router';

export class AppServer extends Server {
    constructor(config) {
        const app = express();
        app.set('view engine', 'jade');
        app.set('views', path.join(__dirname, '../views'));
        app.use(route);
        app.use(express.static('.'));

        super(app);

        this.logger = getLogger('[server]');
        this.app = app;
        this.listen(config, () => this.onListen());
    }

    onListen() {
        const {
            address,
            port,
        } = this.address();

        this.logger.info(`Listening on ${address} ${port}`);
    }
}
