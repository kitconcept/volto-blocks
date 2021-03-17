/* eslint no-console: 0 */
import express from 'express';
import { run } from 'node-jq';
import { getContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';

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
      return run(
        `. | .blocks[].columns[]?.href[]?."@id"? |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `. | .blocks[].hrefList[]?.href |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .href? | strings) |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .href? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .preview_image? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .url? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .url? | strings) |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
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
