import { Denops } from "https://deno.land/x/denops@v0.1/denops.ts";

// Create denops server
const denops = new Denops({
  async echo(text: unknown): Promise<unknown> {
    return Promise.resolve(`${text}`);
  },

  async say(app: unknown): Promise<void> {
    if (typeof app !== "string") {
      throw new Error("'app' must be a string");
    }
    const name = await denops.call("input", "Your name: ");
    const version = await denops.eval("v:version");
    await denops.command("redraw");
    await denops.command(
      `echomsg 'Hello ${name}. Your are using ${app} in Vim/Neovim ${version}'`
    );
  },
});

// Add command
await denops.command(
  'command! DenopsHelloWorld call denops#request("helloworld", "say", ["Denops"])'
);

await denops.debug("denops-helloworld debug message");
await denops.info("denops-helloworld info message");
await denops.error("denops-helloworld error message");

// Wait until the server is closed
await denops.waitClosed();
