// NOTE:
//
// Users should refer 'std.ts' which use denops_std module instead
//
// Import 'Denops' class from denops
import { Denops } from "https://deno.land/x/denops@v0.7/denops.ts";

// Call `Denops.start` with async callback. The callback get 'denops' instance.
Denops.start(async (denops) => {
  // Register RPC functions with 'denops.extendDispatcher' like:
  denops.extendDispatcher({
    // Developers can define multiple endpoints which take arbitrary number of arguments
    // and return arbitrary value as a Promise.
    // This function can be called by denops#request() or denops#notify() functions.
    async echo(text: unknown): Promise<unknown> {
      if (typeof text !== "string") {
        throw new Error(
          `'text' in 'echo()' of ${denops.name} must be a string`,
        );
      }

      // console.log (console.info, console.debug as well) output message to Vim echo
      // area with [denops] prefix.
      console.log("echo is called");

      // console.error (console.warn, console.critical as well) output message to Vim
      // echo area with [denops] prefix as error message
      console.error("echo is not really implemented yet");

      // Return given text
      return await Promise.resolve(text);
    },

    async hello(app: unknown): Promise<void> {
      if (typeof app !== "string") {
        throw new Error(`'app' in 'say()' of ${denops.name} must be a string`);
      }
      // Use 'denops.call(func, ...args)' to call Vim's function and get result
      const name = await denops.call("input", "Your name: ");
      console.log("name", name);

      // Use 'denops.eval(expr, context)' to evaluate Vim's expression and get result
      const result = await denops.eval("1 + 1 + value", {
        value: 2,
      });
      console.log("result", result);

      // Use 'denops.cmd(cmd, context)' to execute Vim's ex command
      await denops.cmd(
        `echomsg printf('Hello %s. Your are using ${app} in Vim/Neovim: %s', name, result)`,
        {
          name,
          result,
        },
      );
    },
  });

  // Add command
  await denops.cmd(
    `command! DenopsRawEcho echo denops#request("${denops.name}", "echo", ["This is hello world message"])`,
  );
  await denops.cmd(
    `command! DenopsRawHello echo denops#notify("${denops.name}", "hello", ["Denops"])`,
  );

  console.log("denops-helloworld.vim (raw) has loaded");
});
