// Import 'start' function from denops_std
import { main } from "https://deno.land/x/denops_std@v0.8/mod.ts";

// Call 'main' with async callback. The callback get RunnerContext.
main(async ({ vim }) => {
  // Register RPC functions with 'vim.register' like:
  vim.register({
    // Developers can define multiple endpoints which take arbitrary number of arguments
    // and return arbitrary value as a Promise.
    // This function can be called by denops#request() or denops#notify() functions.
    async echo(text: unknown): Promise<unknown> {
      if (typeof text !== "string") {
        throw new Error(`'text' in 'echo()' of ${vim.name} must be a string`);
      }
      // console.log (console.info, console.debug as well) output message to Vim echo
      // area with [denops] prefix.
      console.log("echo is called");

      // console.error (console.warn, console.critical as well) output message to Vim
      // echo area with [denops] prefix as error message
      console.error("echo is not really implemented yet");

      return await Promise.resolve(text);
    },

    async hello(app: unknown): Promise<void> {
      if (typeof app !== "string") {
        throw new Error(`'app' in 'say()' of ${vim.name} must be a string`);
      }

      // Use 'vim.call(func, ...args)' to call Vim's function and get result
      const name = await vim.call("input", "Your name: ");
      console.log("name", name);

      // Use 'vim.eval(expr, context)' to evaluate Vim's expression and get result
      const result = await vim.eval("1 + 1 + value", {
        value: 2,
      });
      console.log("result", result);

      // Use 'vim.cmd(cmd, context)' to execute Vim's ex command
      await vim.cmd(
        `echomsg printf('Hello %s. Your are using ${app} in Vim/Neovim: %s', name, result)`,
        {
          name,
          result,
        },
      );
    },

    async get_variables(): Promise<void> {
      // Use 'vim.g.get' to access global variable
      console.log("g:denops_helloworld", await vim.g.get("denops_helloworld"));
      // Use 'vim.b.get' to access buffer-local variable
      console.log("b:denops_helloworld", await vim.b.get("denops_helloworld"));
      // Use 'vim.w.get' to access window-local variable
      console.log("w:denops_helloworld", await vim.w.get("denops_helloworld"));
      // Use 'vim.t.get' to access tabpage-local variable
      console.log("t:denops_helloworld", await vim.t.get("denops_helloworld"));
      // Use 'vim.v.get' to access Vim's variable
      console.log("v:errmsg", await vim.v.get("errmsg"));
    },

    async set_variables(): Promise<void> {
      // Use 'vim.g.set' to replace global variable
      await vim.g.set("denops_helloworld", "Global HOGEHOGE");
      // Use 'vim.b.set' to replace buffer-local variable
      await vim.b.set("denops_helloworld", "Buffer HOGEHOGE");
      // Use 'vim.w.set' to replace window-local variable
      await vim.w.set("denops_helloworld", "Window HOGEHOGE");
      // Use 'vim.t.set' to replace tabpage-local variable
      await vim.t.set("denops_helloworld", "Tabpage HOGEHOGE");
      // Use 'vim.v.set' to replace Vim's variable
      await vim.v.set("errmsg", "Vim HOGEHOGE");
    },

    async remove_variables(): Promise<void> {
      // Use 'vim.g.remove' to remove global variable
      await vim.g.remove("denops_helloworld");
      // Use 'vim.b.remove' to remove buffer-local variable
      await vim.b.remove("denops_helloworld");
      // Use 'vim.w.remove' to remove window-local variable
      await vim.w.remove("denops_helloworld");
      // Use 'vim.t.remove' to remove tabpage-local variable
      await vim.t.remove("denops_helloworld");
      // Use 'vim.v.remove' to remove Vim variable
      await vim.v.remove("errmsg");
    },

    async register_autocmd(): Promise<void> {
      await vim.cmd("new");
      // Use 'vim.autocmd' to register autocmd
      await vim.autocmd("denops_helloworld", (helper) => {
        // Use 'helper.remove()' to remove autocmd
        helper.remove("*", "<buffer>");
        // Use 'helper.define()' to define autocmd
        helper.define(
          "CursorHold",
          "<buffer>",
          "echomsg 'Hello Denops CursorHold'",
        );
        helper.define(
          ["BufEnter", "BufLeave"],
          "<buffer>",
          "echomsg 'Hello Denops BufEnter/BufLeave'",
        );
      });
    },
  });

  // Use 'vim.execute()' to execute Vim script
  await vim.execute(`
    command! DenopsEcho echo denops#request("${vim.name}", "echo", ["This is hello world message"])
    command! DenopsHello echo denops#notify("${vim.name}", "hello", ["Denops"])
    command! DenopsGetVariables echo denops#notify("${vim.name}", "get_variables", [])
    command! DenopsSetVariables echo denops#notify("${vim.name}", "set_variables", [])
    command! DenopsRemoveVariables echo denops#notify("${vim.name}", "remove_variables", [])
    command! DenopsRegisterAutocmd echo denops#notify("${vim.name}", "register_autocmd", [])
  `);

  console.log("denops-helloworld.vim (std) has loaded");
});
