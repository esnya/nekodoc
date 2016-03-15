describe('render', () => {
    const fs = require('fs-promise');
    const marked = require('marked');

    jest.unmock('../render');
    const {directory, markdown} = require('../render');

    pit('renders directory', () => {
        fs.walk.mockReturnValue(Promise.resolve([
            {path: 'dir1/file1.md'},
            {path: 'dir1/dir2/file2.md'},
        ]));

        return directory('dir1')
            .then((entries) => {
                expect(fs.walk).toBeCalledWith('dir1');
                expect(entries).toEqual([
                    {path: 'file1.md'},
                    {path: 'dir2/file2.md'},
                ]);
            });
    });

    pit('renders markdwon', () => {
        fs.readFile = jest.fn().mockReturnValue(Promise.resolve(new Buffer('# Markdown')));
        marked.mockReturnValue('<h1>Markdown</h1>');

        return markdown('file1.md')
            .then((data) => {
                expect(fs.readFile).toBeCalledWith('file1.md')
                expect(marked).toBeCalledWith('# Markdown');
                expect(data).toEqual('<h1>Markdown</h1>');
            });
    });
});
