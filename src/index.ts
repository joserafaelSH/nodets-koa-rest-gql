import { logger } from "./infra/logger/logger";
import { createGqlServer } from "./infra/gql/gql";
//import { createHttpServer } from "./infra/http/http";

const port = process.env.PORT || 3000;
const app = await createGqlServer();
//const app = await createHttpServer();
app.listen(port, () =>
  logger.info(`Starting app: ${process.env.NODE_ENV} mode on ${port} port`),
);
