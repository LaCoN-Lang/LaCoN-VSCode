# LaCoN Language VSCode Extension

## Build Dependencies
* Core : : [WASM](https://github.com/LaCoN-Lang/LaCoN-Core/tree/main/lacon-workspace/wasm), [LSP](https://github.com/LaCoN-Lang/LaCoN-Core/tree/main/lacon-workspace/lsp)<br>→ `cargo make wasm-build` `cargo make lsp-build`<br>→ Files will be created in `<core>/dist/*`<br>→ Copy builds to `<extension>/modules/`
