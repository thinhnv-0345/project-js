const jsonServer = require("json-server");
const {
  createValidationMiddleware,
  handleDataMiddleware,
} = require("./helpers");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 8000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use(createValidationMiddleware);
server.use(handleDataMiddleware);

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
