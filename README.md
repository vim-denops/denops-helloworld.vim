# denops-helloworld.vim

An example plugin of [denops.vim](https://github.com/vim-denops/denops.vim).

Use your favorite Vim plugin manager to install it.

## Code

| File                                                      | Description                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`helloworld_raw/mod.ts`](./denops/helloworld_raw/mod.ts) | Plugin which only use [denops](https://github.com/vim-denops/denops-deno) module.           |
| [`helloworld/mod.ts`](./denops/helloworld/mod.ts)         | Plugin which use [denops-std](https://github.com/vim-denops/denops-std-deno) module instead |

## Usage

Use one of the following commands to test the features:

| Command                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `DenopsEcho`            | Echo a text which is constructed in Deno plugin            |
| `DenopsHello`           | Interactively construct text in Deno plugin and echo       |
| `DenopsGetVariables`    |                                                            |
| `DenopsSetVariables`    |                                                            |
| `DenopsRemoveVariables` |                                                            |
| `DenopsRegisterAutocmd` |                                                            |
| `DenopsRawEcho`         | Echo a text which is constructed in Deno plugin (raw)      |
| `DenopsRawHello`        | Interactively construct text in Deno plugin and echo (raw) |

Or use `denops#request({plugin-name}, {fn}, {params})` to call a function and
get the result like

```
echo denops#request("helloworld", "echo", ["Hello"])
call denops#request("helloworld", "echo", [])   " This will raise exception
```

Or use `denops#notify({plugin-name}, {fn}, {params})` to call a function and
leave like

```
call denops#notify("helloworld", "say", ["Hello"])
call denops#notify("helloworld", "say", [])   " This will echo exception
```
