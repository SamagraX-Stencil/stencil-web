"workspaces": {
"packages": [
"./packages/molecules",
"./packages/pages",
"./packages/hooks",
"./packages/providers",
"./packages/component",
"./packages/config-manager",
"./packages/cli",
"./examples/all-molecule-app",
"./examples/bot-app"
]
},

"dev": "turbo run dev --parallel --filter=@stencil/all-molecule-app",
