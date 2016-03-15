import {directory, markdown} from './render';

export const route = (req, res, next) => {
    const path = decodeURI(req.url).substr(1);
    if (path.match(/^.*\.md$/)) {
        return markdown(path)
            .then((data) => res.render('markdown', {path, data}))
            .catch(next);
    } else if (!path.match(/\.[^/]+$/)) {
        return directory(path)
            .then((entries) => res.render('directory', {path, entries}))
            .catch(next);
    }

    return next();
};
