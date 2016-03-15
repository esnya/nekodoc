describe('AppServer', () => {
    const express = require('express');
    const app = {
        ...require('express/lib/application'),
    };
    express.mockReturnValue(app);

    jest.mock('http');
    const {Server} = require('http');

    const {Logger} = require('log4js/lib/logger');
    require('log4js')
        .getLogger
        .mockReturnValue(new Logger());

    const {route} = require('../router');

    jest.unmock('../server');
    const {AppServer} = require('../server');

    let server;
    it('inherits http.Server', () => {
        server = new AppServer({
            host: 'localhost',
            port: 8888,
        });

        expect(Server.mock.instances.length).toBe(1);
        expect(server).toBe(Server.mock.instances[0]);
    });

    it('listens as HTTP server', () => {
        expect(server.listen.mock.calls.length).toBe(1);

        const call = server.listen.mock.calls[0];

        expect(call[0]).toEqual({
            host: 'localhost',
            port: 8888,
        });

        server.logger.info.mockClear();
        server.address.mockReturnValue({
            address: '127.0.0.1',
            port: 8888,
        });
        call[1]();

        expect(server.logger.info)
            .toBeCalledWith('Listening on 127.0.0.1 8888');
    });

    it('uses router', () => {
        expect(app.use).toBeCalledWith(route);
    });
});
