import app from "./app";

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});