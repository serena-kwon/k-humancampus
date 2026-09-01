// Local mirror of the CDN scripts support.js would otherwise fetch from unpkg.
// support.js checks window.__resources[url] first (see cdnScriptFor in support.js).
window.__resources = Object.assign(window.__resources || {}, {
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js": "./vendor/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": "./vendor/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js": "./vendor/babel.min.js"
});
