import { Denops } from "../../../denops-deno/denops.ts";

// Create denops server
const denops = new Denops({
  echo: async (text: unknown): Promise<unknown> => {
    return Promise.resolve(`${text}`);
  },

  say: async (name: unknown): Promise<void> => {
    if (typeof name !== "string") {
      throw new Error("'name' must be a string");
    }
    await denops.command(`echo "Hello Denops ${name}"`);
  },
});

// Wait until the server is closed
await denops.waitClosed();
