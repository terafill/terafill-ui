# terafill-ui

## Developer Guide

This repo is a monorepo which contains source code for terafill web app and browser plugin. **apps** directory contains source code for web app and browser plugin. **packages** directory contains reusable libraries which contain utilities used by both web app and browser plugin. 

Installing required dependencies

```shell
npm i -w web && npm i -w plugin
```

Running web app locally

```shell
npm run dev -w web
```

Building web app for deployment

```
npm run build -w web
```

Building browser plugin for deployment

```shell
npm run build:popup -w plugin && npm run build:content -w plugin && npm run build:background -w plugin
```



