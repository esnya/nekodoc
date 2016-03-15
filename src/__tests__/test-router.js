describe('router', () => {
    const {directory, markdown} = require('../render');

    jest.unmock('../router');
    const {route} = require('../router');

    let req, res, next;
    beforeEach(() => {
        req = {
            ...require('express/lib/request'),
        };
        res = {
            ...require('express/lib/response'),
        };
        next = jest.fn();
    });

    pit('renders markdown', () => {
        req.url = '/file1.md';
        markdown.mockReturnValue(Promise.resolve('Markdown Data'));

        return route(req, res, next)
            .then(() => {
                expect(next).not.toBeCalled();
                expect(markdown).toBeCalledWith('file1.md');
                expect(res.render).toBeCalledWith('markdown', {
                    path: 'file1.md',
                    data: 'Markdown Data',
                });
            });
    });

    pit('renders directory', () => {
        req.url = '/dir1';
        directory.mockReturnValue(Promise.resolve([
            'file1.md',
            'file2.md',
        ]));
        
        return route(req, res, next)
            .then(() => {
                expect(next).not.toBeCalled();
                expect(directory).toBeCalledWith('dir1');
                expect(res.render).toBeCalledWith('directory', {
                    path: 'dir1',
                    entries: [
                        'file1.md',
                        'file2.md',
                    ],
                });
            });
    });
    
    it('ignores other files', () => {
        req.url = '/file3.png';
        route(req, res, next);
        expect(next).toBeCalled();
    });
});
