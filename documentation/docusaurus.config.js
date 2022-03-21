const path = require('path');

module.exports = {
    title: 'IOTA Client WASM Tutorial',
    url: '/',
    baseUrl: '/',
    themes: ['@docusaurus/theme-classic'],
    tutorial: {
        title: 'IOTA Client WASM Tutorial',
        description: 'This tutorial shows you how to use the WASM IOTA client',
        preview: '/iota_client.png',
        source: 'https://github.com/Dr-Electron/identity-iota-svelte-example/tree/gitpod-integration',
        website: '/wasm-client-tutorial/tutorial',
        tags: ['text', 'gettingstarted', 'wasm', 'client']
    },
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'wasm-client-tutorial',
                path: path.resolve(__dirname, './docs'),
                routeBasePath: 'wasm-client-tutorial',
                sidebarPath: path.resolve(__dirname, './sidebars.js'),
                editUrl: 'https://github.com/Dr-Electron/identity-iota-svelte-example/edit/gitpod-integration/',
            },
        ],
    ],
    staticDirectories: [path.resolve(__dirname, './images')],
};