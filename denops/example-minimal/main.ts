import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";

// This exported `main` function is automatically called by denops.vim.
//
// The definitino should be one of the followings
//
//   export function main(denops: Denops): void { ... }
//   export async function main(denops: Denops): Promise<void> { ... }
//
// Use this function to initialize your plugin.
export async function main(denops: Denops): Promise<void> {
  // Overwrite `dispatcher` to define APIs
  //
  // APIs are invokable from Vim script through `denops#request()` or `denops#notify()`.
  // See `:help denops#request()` or `:help denops#notify()` for more details.
  denops.dispatcher = {
    // API method must return a Promise so Use `Promise.resolve()` to return a Promise.
    hello() {
      return Promise.resolve("Hello");
    },

    // Or define `async` method to return a Promise explicitly.
    // Note that all types of arguments of the function must be `unknown`.
    async world(text: unknown) {
      await denops.cmd("echomsg text", {
        text,
      });
    },
  };

  // Use `denops.name` to identify the plugin itself.
  const n = denops.name;
  await denops.cmd(
    `command! DenopsHello call denops#notify("${n}", "world", [denops#request("${n}", "hello", [])])`,
  );
}
