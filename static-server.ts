import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3003;

// Serve static files from the static-site directory
app.use(express.static(path.join(__dirname, "static-site")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
