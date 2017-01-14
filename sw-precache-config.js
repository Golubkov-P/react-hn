const staticFileGlobs = [
  'public/assets/*.*',
  'public/fav/*.*',
  'public/*.*'
];

const runtimeCaching = [ {
  urlPattern: /^https:\/\/hacker-news\.firebaseio\.com\/v0/,
  handler: 'networkFirst',
  options: {
    cache: {
      name: 'stories-cache'
    }
  }
} ];

module.exports = {
  staticFileGlobs,
  cacheId: 'react-hn',
  filename: 'my-cache-sw.js',
  dynamicUrlToDependencies: {
    '/': [ 'server/template/index.ejs' ],
    '/ask': [ 'server/template/index.ejs' ],
    '/newest': [ 'server/template/index.ejs' ],
    '/job': [ 'server/template/index.ejs' ],
    '/show': [ 'server/template/index.ejs' ],
    '/item': [ 'server/template/index.ejs' ],
    '/user': [ 'server/template/index.ejs' ]
  },
  stripPrefix: 'public',
  replacePrefix: '',
  runtimeCaching
};
