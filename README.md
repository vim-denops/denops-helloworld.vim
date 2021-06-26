# denops-helloworld.vim

An example plugin of [denops.vim](https://github.com/vim-denops/denops.vim).

Use your favorite Vim plugin manager to install it.

## Usage

Use one of the following commands to test the features:

| Command       | Description             |
| ------------- | ----------------------- |
| `HelloWorld`  | Say hello to the world  |
| `HelloDenops` | Say hello to the denops |

Or use `denops#request({name}, {fn}, {args})` to call a function and get the
result like

```
echo denops#request("helloworld", "say", ["World"])
```

Or use `denops#notify({name}, {fn}, {params})` to call a function and leave like

```
call denops#notify("helloworld", "say", ["World"])
```

Some APIs of this sample plugin are not defined as commands so user need to use
`denops#request()` or `denops#notify()` to invoke it. See
[`main.ts`](./denops/helloworld/main.ts) to find out what's more.

See
[deno doc for denops_std](https://doc.deno.land/https/deno.land/x/denops_std/mod.ts)
for API details.
