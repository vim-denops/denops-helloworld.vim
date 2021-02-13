import { Denops } from "https://deno.land/x/denops@v0.5/denops.ts";

// Start plugin event-loop
Denops.start(async function (denops: Denops): Promise<void> {
  // Register dispatcher
  denops.extendDispatcher({
    async echo(text: unknown): Promise<unknown> {
      if (typeof text !== "string") {
        throw new Error(
          `'text' in 'echo()' of ${denops.name} must be a string`
        );
      }
      return await Promise.resolve(text);
    },

    async say(app: unknown): Promise<void> {
      if (typeof app !== "string") {
        throw new Error(`'app' in 'say()' of ${denops.name} must be a string`);
      }
      const name = await denops.call("input", ["Your name: "]);
      const version = await denops.eval("v:version");
      await denops.command("redraw");
      await denops.command(
        `echomsg 'Hello ${name}. Your are using ${app} in Vim/Neovim ${version}'`
      );
    },
  });

  // Add command
  await denops.command(
    `command! DenopsHelloWorldEcho echo denops#request("${denops.name}", "echo", ["This is hello world message"])`
  );

  await denops.command(
    `command! DenopsHelloWorldSay echo denops#notify("${denops.name}", "say", ["Denops"])`
  );

  console.log("denops-helloworld.vim has loaded");
});
