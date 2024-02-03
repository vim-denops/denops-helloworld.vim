if exists('g:loaded_denops_helloworld')
  finish
endif
let g:loaded_denops_helloworld = 1

augroup denops-helloworld
  autocmd!
  autocmd User DenopsPluginPost:denops-helloworld call denops#notify('denops-helloworld', 'init', [])
augroup END
