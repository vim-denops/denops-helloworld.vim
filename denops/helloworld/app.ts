// Import 'start' function from denops_std
import {
  ensureString,
  main,
} from "https://deno.land/x/denops_std@v0.10/mod.ts";

// Call 'main' with async callback. The callback get RunnerContext.
main(async ({ vim }) => {
  // Register RPC functions with 'vim.register' like:
  vim.register({
    // Developers can define multiple endpoints which take arbitrary number of arguments
    // and return arbitrary value as a Promise.
    // This function can be called by denops#request() or denops#notify() functions.
    async say(where: unknown): Promise<void> {
      // Ensure that `prefix` is 'string' here
      ensureString(where, "where");
      // Use `call` to call Vim's function
      const name = await vim.call("input", "Your name: ");
      // Use `eval` to evaluate Vim's expression
      const progname = await vim.eval("v:progname");
      // Construct messages
      const messages = [
        `Hello ${where}`,
        `Your name is ${name}`,
        `This is ${progname}`,
      ];
      // Use `cmd` to execute Vim's command
      await vim.cmd(`redraw | echomsg message`, {
        message: messages.join(". "),
      });
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
    command! HelloWorld call denops#notify("${vim.name}", "say", ["World"])
    command! HelloDenops call denops#notify("${vim.name}", "say", ["Denops"])
  `);

  console.log("denops-helloworld.vim (std) has loaded");
});
