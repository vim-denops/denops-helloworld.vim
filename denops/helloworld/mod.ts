import { Denops } from "https://deno.land/x/denops@v0.3/denops.ts";

// Create denops
const denops = new Denops({
  async echo(text: unknown): Promise<unknown> {
    return await Promise.resolve(`${text}`);
  },

  async say(app: unknown): Promise<void> {
    if (typeof app !== "string") {
      throw new Error("'app' must be a string");
    }
    const name = await denops.call("input", ["Your name: "]);
    const version = await denops.eval("v:version");
    await denops.command("redraw");
    await denops.command(
      `echomsg 'Hello ${name}. Your are using ${app} in Vim/Neovim ${version}'`,
    );
  },
});

// Start plugin eventloop
denops.start(async () => {
  // Add command
  await denops.command(
    'command! DenopsHelloWorld call denops#request("helloworld", "say", ["Denops"])',
  );
  // Add test output
  await denops.debug("This is test DEBUG message");
  await denops.info("This is test INFO message");
  await denops.error("This is test ERROR message");
});
