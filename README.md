# denops-helloworld.vim

An example plugin of [denops.vim](https://github.com/vim-denops/denops.vim).

Use your favorite Vim plugin manager to install it.

## Usage

Use one of the following commands to test the features:

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `DenopsHelloWorldEcho` | Echo a text which is constructed in Deno plugin      |
| `DenopsHelloWorldSay`  | Interactively construct text in Deno plugin and echo |

Or use `denops#request({plugin-name}, {fn}, {params})` to call a function and get the result like

```
echo denops#request("helloworld", "echo", ["Hello"])
call denops#request("helloworld", "echo", [])   " This will raise exception
```

Or use `denops#notify({plugin-name}, {fn}, {params})` to call a function and leave like

```
call denops#notify("helloworld", "say", ["Hello"])
call denops#notify("helloworld", "say", [])   " This will echo exception
```
