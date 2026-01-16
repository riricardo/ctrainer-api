import buildContainer from "./app/container";
import createHttpApp from "./app/http";

const container = buildContainer();
const app = createHttpApp(container);

export default app;
