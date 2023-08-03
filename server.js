// This is a simple Node server that uses the built project.
//这是一个使用构建项目的简单节点服务器。
// node环境18
import { createRequire } from 'module'; 
const require = createRequire(import.meta.url);
const path = require('path')
const { dirname } = path;
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const express = require('express')
 
 
 
 
 
// This contains a list of static routes (assets)
//它包含静态路由(资产)的列表
const { ssr } = require(`./dist/server/package.json`)
 
// The manifest is required for preloading assets
//预装资产需要清单
const manifest = require(`./dist/client/ssr-manifest.json`)
 
// This is the server renderer we just built
//这是我们刚刚构建的服务器渲染器
import render from './dist/server/main.js'
// const api = require('./api')
 
const server = express()
 
// Serve every static asset route 为每个静态路由提供服务
for (const asset of ssr.assets || []) {
  server.use(
    '/' + asset,
    express.static(path.join(__dirname, `./dist/client/` + asset))
  )
}
 
// Custom API to get data for each page
// See src/main.js to see how this is called
// api.forEach(({ route, handler, method = 'get' }) =>
//   server[method](route, handler)
// )
 
// Everything else is treated as a "rendering request"
server.get('*', async (request, response) => {
  const url =
    request.protocol + '://' + request.get('host') + request.originalUrl
 
  const { html, status, statusText, headers } = await render(url, {
    manifest,
    preload: true,
    // Anything passed here will be available in the main hook
    request,
    response,
    // initialState: { ... } // <- This would also be available
  })
 
  response.writeHead(status || 200, statusText || headers, headers)
  response.end(html)
})
 
const port = 8899
console.log(`Server started: http://localhost:${port}`)
server.listen(port)