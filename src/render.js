import {readFile, walk} from 'fs-promise';
import marked from 'marked';
import {relative, sep} from 'path';

export const directory =
    (dirname) => walk(dirname)
        .then((entries) => entries
            .map((entry) => ({
                path: relative(dirname, entry.path)
                    .split(sep)
                    .join('/'),
            }))
            .filter(({path}) => Boolean(path))
        );

export const markdown =
    (filename) => readFile(filename)
        .then((data) => marked(data.toString()));
