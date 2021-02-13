if exists('g:loaded_denops_helloworld')
  finish
endif
let g:loaded_denops_helloworld = 1

let s:root = expand("<sfile>:h:h")
let s:script = join([s:root, 'denops', 'helloworld', 'mod.ts'], has('win32') ? '\' : '/')

augroup denops_helloworld_plugin_internal
  autocmd!
  autocmd User DenopsReady call denops#register('helloworld', s:script)
augroup END
