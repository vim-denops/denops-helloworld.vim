import { Denops } from "../../../denops-deno/denops.ts";

// Create denops server
const denops = new Denops({
  async echo(text: unknown): Promise<unknown> {
    return Promise.resolve(`${text}`);
  },

  async say(name: unknown): Promise<void> {
    if (typeof name !== "string") {
      throw new Error("'name' must be a string");
    }
    await denops.command(`echomsg 'Hello Denops ${name}'`);
  },
});

await denops.debug("denops-helloworld debug message");
await denops.info("denops-helloworld info message");
await denops.error("denops-helloworld error message");

// Wait until the server is closed
await denops.waitClosed();
