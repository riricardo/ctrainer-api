import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../../package.json";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: packageJson.name,
      version: packageJson.version,
    },
  },
  apis: ["src/**/*.ts"],
});

export default swaggerSpec;
