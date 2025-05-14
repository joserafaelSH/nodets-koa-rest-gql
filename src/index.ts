import { createGqlServer } from "./gql/gql";
//import { createHttpServer } from "./http/http";

const port = process.env.PORT || 3000;
const app = await createGqlServer();
app.listen(port);
