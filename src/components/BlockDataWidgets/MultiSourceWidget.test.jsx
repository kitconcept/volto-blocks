import { recursiveFlattenToAppURL } from './MultiSourceWidget';

const preview_image = {
  'content-type': 'image/jpeg',
  download:
    'http://localhost:8080/Plone/objectwithimage/@@images/bd454564-f865-4df7-abbf-f0c43fac0e64.jpeg',
  filename: 'boa-scheller-1367.jpg',
  height: 600,
  scales: {
    banner: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/5dd9a745-7269-4a71-b9b2-9f351b60d42c.jpeg',
      height: 428,
      width: 977,
    },
    highlight: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/94e15180-8ff7-4c58-a6cf-43ce300cfcf5.jpeg',
      height: 600,
      width: 1367,
    },
    icon: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/87fe79f8-e056-44f1-a3d8-86dd60a74de7.jpeg',
      height: 14,
      width: 32,
    },
    large: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/4099f31d-22e8-4b2c-b47d-06a23a308860.jpeg',
      height: 337,
      width: 768,
    },
    mini: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/ade48455-8f5e-483a-97a5-906a7b0a8eab.jpeg',
      height: 87,
      width: 200,
    },
    preview: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/a54e382c-6ed4-4540-9696-a0d94d75af03.jpeg',
      height: 263,
      width: 600,
    },
    teaser: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/cab83a83-a5e8-4892-bf9b-58331c08a974.jpeg',
      height: 198,
      width: 453,
    },
    teaserherotop: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/0c80c234-9665-4322-ad48-3f42c64853c5.jpeg',
      height: 400,
      width: 913,
    },
    thumb: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/f55c7ff0-a883-4595-913d-1f7ae5b78980.jpeg',
      height: 56,
      width: 128,
    },
    tile: {
      download:
        'http://localhost:8080/Plone/objectwithimage/@@images/7ae130be-4606-41a2-ba19-9e5e88c0570f.jpeg',
      height: 28,
      width: 64,
    },
  },
  size: 150816,
  width: 1367,
};

jest.mock('~/config', () => ({
  settings: {
    apiPath: 'http://localhost:8080/Plone',
    nonContentRoutes: [],
    supportedLanguages: ['en'],
    navDepth: 1,
  },
}));

it('Should flatten all the download keys present in the object, recursivelly', () => {
  const result = recursiveFlattenToAppURL(preview_image);

  expect(result.download).toEqual(
    '/objectwithimage/@@images/bd454564-f865-4df7-abbf-f0c43fac0e64.jpeg',
  );
  expect(result.scales.tile.download).toEqual(
    '/objectwithimage/@@images/7ae130be-4606-41a2-ba19-9e5e88c0570f.jpeg',
  );
  expect(result.scales.teaser.download).toEqual(
    '/objectwithimage/@@images/cab83a83-a5e8-4892-bf9b-58331c08a974.jpeg',
  );
});
