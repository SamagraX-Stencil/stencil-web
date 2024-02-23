if (!self.define) {
	let e,
		s = {};
	const n = (n, a) => (
		(n = new URL(n + '.js', a).href),
		s[n] ||
			new Promise((s) => {
				if ('document' in self) {
					const e = document.createElement('script');
					(e.src = n), (e.onload = s), document.head.appendChild(e);
				} else (e = n), importScripts(n), s();
			}).then(() => {
				let e = s[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, i) => {
		const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
		if (s[c]) return;
		let r = {};
		const t = (e) => n(e, c),
			o = { module: { uri: c }, exports: r, require: t };
		s[c] = Promise.all(a.map((e) => o[e] || t(e))).then((e) => (i(...e), r));
	};
}
define(['./workbox-50de5c5d'], function (e) {
	'use strict';
	importScripts('fallback--nfqsjbOsTQAp8LmXUcGY.js'),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/-nfqsjbOsTQAp8LmXUcGY/_buildManifest.js',
					revision: '3dfaed7edb04fda2a29e6f7d0e540e70'
				},
				{
					url: '/_next/static/-nfqsjbOsTQAp8LmXUcGY/_ssgManifest.js',
					revision: 'b6652df95db52feb4daf4eca35380933'
				},
				{ url: '/_next/static/chunks/framework-7a7e500878b44665.js', revision: '7a7e500878b44665' },
				{ url: '/_next/static/chunks/main-5bbb775f9fbc700f.js', revision: '5bbb775f9fbc700f' },
				{
					url: '/_next/static/chunks/pages/_app-6f66166c7631ec0c.js',
					revision: '6f66166c7631ec0c'
				},
				{
					url: '/_next/static/chunks/pages/_error-54de1933a164a1ff.js',
					revision: '54de1933a164a1ff'
				},
				{
					url: '/_next/static/chunks/pages/_offline-0860e4c1c78727f8.js',
					revision: '0860e4c1c78727f8'
				},
				{
					url: '/_next/static/chunks/pages/createUser-cf9e8cda0ac054df.js',
					revision: 'cf9e8cda0ac054df'
				},
				{
					url: '/_next/static/chunks/pages/index-c6d0a334aff3a859.js',
					revision: 'c6d0a334aff3a859'
				},
				{
					url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
					revision: '79330112775102f91e1010318bae2bd3'
				},
				{ url: '/_next/static/chunks/webpack-59c5c889f52620d6.js', revision: '59c5c889f52620d6' },
				{ url: '/_next/static/css/d50c8af797c380f8.css', revision: 'd50c8af797c380f8' },
				{ url: '/_next/static/media/Mulish-Bold.792fb274.ttf', revision: '792fb274' },
				{ url: '/_next/static/media/Mulish-Demi.0a4236f1.ttf', revision: '0a4236f1' },
				{ url: '/_next/static/media/Mulish-Medium.89b626ee.ttf', revision: '89b626ee' },
				{ url: '/_next/static/media/Mulish-Regular.a4c4b1ab.ttf', revision: 'a4c4b1ab' },
				{ url: '/_offline', revision: '-nfqsjbOsTQAp8LmXUcGY' },
				{ url: '/assets/icons/icon-128x128.png', revision: 'd3775df781cfd4bf4fa0c64c7be0dbd9' },
				{ url: '/assets/icons/icon-144x144.png', revision: '0f84bc73592b15ffe507a617e4111d85' },
				{ url: '/assets/icons/icon-152x152.png', revision: 'cfdb25ae0fbfa0e836f3398c2f4909c7' },
				{ url: '/assets/icons/icon-192x192.png', revision: 'a41154c3a5203720000202c056001be9' },
				{ url: '/assets/icons/icon-384x384.png', revision: 'd7a8be5fbe23c68c9c667247d69806e8' },
				{ url: '/assets/icons/icon-48x48.png', revision: '9e0b2482bf797829ede2a71b505c4c25' },
				{ url: '/assets/icons/icon-512x512.png', revision: '3e7fafa47dfc3fbe390c65887f61e2d1' },
				{ url: '/assets/icons/icon-72x72.png', revision: 'a98cb9868f926ebdfc6eef88a3873aaf' },
				{ url: '/assets/icons/icon-96x96.png', revision: '77c04786b87d82cc32bb59789cae29e9' },
				{ url: '/favicon.ico', revision: 'b7e5d143f696329db9b04f047c8ba284' },
				{ url: '/manifest.json', revision: 'e0945d52541c1922fdb3f55a36182d6a' },
				{ url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
				{ url: '/offline.png', revision: 'c7405cd13680b0d82a0cad8af5e405f8' },
				{ url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' }
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
							s && 'opaqueredirect' === s.type
								? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
								: s
					},
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) }
				]
			}),
			'GET'
		);
});
