import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json())

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    // Make sure cell storage file  exists
    // if the file does not exist, add i a default list of cells
    // Reead the file
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      res.send(JSON.parse(result));
    } catch (err) {
      // @ts-ignore
      if (err.code === "ENOENT") {
        // Add code to create file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw err;
      }
    }
    // Parse a list of cells out of it
    // Send list of celss back to the browser
  });

  router.post("/cells", async (req, res) => {
    // Make sure the file exists
    // If not, create it

    // Take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
