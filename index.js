require("dotenv").config();
const app = require("./src/app");
const { connectDb } = require("./src/db");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDb();
    console.log("Database connected");

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit the process with failure
  }
};

start();
