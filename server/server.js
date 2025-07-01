import "dotenv/config";
import app from "./src/app.js";
import connectdb from "./src/config/database.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`✅ App is running : PORT - ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
