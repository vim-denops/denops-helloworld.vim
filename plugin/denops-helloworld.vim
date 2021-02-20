if exists('g:loaded_denops_helloworld')
  finish
endif
let g:loaded_denops_helloworld = 1

let s:root = expand("<sfile>:h:h")
let s:script_raw = join([s:root, 'denops', 'helloworld', 'raw.ts'], has('win32') ? '\' : '/')
let s:script = join([s:root, 'denops', 'helloworld', 'std.ts'], has('win32') ? '\' : '/')

augroup denops_helloworld_plugin_internal
  autocmd!
  autocmd User DenopsReady call denops#register('helloworld_raw', s:script_raw)
  autocmd User DenopsReady call denops#register('helloworld', s:script)
augroup END
