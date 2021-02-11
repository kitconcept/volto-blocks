import express from 'express';
import { getContent } from '@plone/volto/actions';

function jsonExporter(req, res, next) {
  const { store } = req.app.locals;
  res.set(
    'Content-Disposition',
    `attachment;filename="${req.path
      .replace('/export', '')
      .replace(/\//g, '.')}.json"`,
  );
  res.set('Content-Type', 'application/json');

  store
    .dispatch(getContent(req.path.replace('/export', '')))
    .then((content) => {
      const {
        blocks,
        blocks_layout,
        title,
        description,
        review_state,
      } = content;
      res.send(
        JSON.stringify(
          {
            '@type': content['@type'],
            blocks,
            blocks_layout,
            title,
            description,
            review_state,
          },
          null,
          '\t',
        ),
      );
    })
    .catch((error) => console.log(error));
}

function jsonExporterMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/export'], jsonExporter);
  middleware.id = 'jsonExport';
  return middleware;
}

export default [jsonExporterMiddleware()];
