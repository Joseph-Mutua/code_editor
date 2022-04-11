import express from "express";
export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get("/cells", async (req, res) => {
    // Make sure cell storage file  exists
    // if the file does not exist, add i a default list of cells
    // Reead the file
    // Parse a list of cells out of it
    // Send list of celss back to the browser
  });

  router.post("/cells", async (req, res) => {
    // Make sure the file exists
    // If not, create it
    // Take the list of cells from the request obj
    // Write the cells into the file
  });

  return router
};
