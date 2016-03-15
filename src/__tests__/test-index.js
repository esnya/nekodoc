describe('index', () => {
    const {AppServer} = require('../server');

    jest.unmock('../index');
    const {server} = require('../index');

    it('run server', () => {
        expect(AppServer).toBeCalled();
        expect(server).toBe(AppServer.mock.instances[0]);
    });
});
