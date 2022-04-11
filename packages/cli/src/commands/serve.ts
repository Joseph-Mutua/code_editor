import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file fo editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseInt(options.port), path.basename(filename), dir);
  });
