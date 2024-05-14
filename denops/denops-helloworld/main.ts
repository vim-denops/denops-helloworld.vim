import type { Entrypoint } from "https://deno.land/x/denops_std@v6.5.0/mod.ts";
import { assert, is } from "https://deno.land/x/unknownutil@v3.18.1/mod.ts";

// This exported `main` function is automatically called by denops.vim.
//
// Note that this function is called on Vim startup, so it should execute as quickly as possible.
// Try to avoid initialization code in this function; instead, define an `init` API and call it from Vim script.
export const main: Entrypoint = (denops) => {
  // Overwrite `dispatcher` to define APIs.
  //
  // APIs are invokable from Vim script through `denops#request()` or `denops#notify()`.
  // Refer to `:help denops#request()` or `:help denops#notify()` for more details.
  denops.dispatcher = {
    async init() {
      const { name } = denops;
      await denops.cmd(
        `command! -nargs=? DenopsHello echomsg denops#request('${name}', 'hello', [<q-args>])`,
      );
    },

    hello(name) {
      assert(name, is.String);
      return `Hello, ${name || "Denops"}!`;
    },
  };
};
