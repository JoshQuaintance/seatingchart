import '@mszu/pixi-ssr-shim';

import { Viewport } from 'pixi-viewport';
import { Application, Graphics } from 'pixi.js';
import App from './App';
import { percent } from './math';

async function init() {
	return new Promise((resolve, reject) => {
		const app = App.app;
        let x: CanvasRenderingContext2D;

		/**
		 * Viewport initialization
		 */
		App.viewport = new Viewport({
			screenWidth: app.view.width,
			screenHeight: percent(88, app.view.height),
			worldWidth: app.view.width * 3 + 3000,
			worldHeight: app.view.width * 3,
			passiveWheel: false,

			interaction: app.renderer.plugins.interaction
		});

		let viewport = App.viewport;

		viewport.drag({}).pinch().wheel({}).decelerate();
		viewport.clampZoom({ minScale: 0.15, maxScale: 3 });
		viewport.clamp({
			underflow: 'center',
			top: -viewport.worldHeight * 0.016,
			left: -viewport.worldWidth * 0.01,
			bottom: viewport.worldHeight * 1.016,
			right: viewport.worldWidth * 1.01
		});

		viewport.fit(false, viewport.screenWidth, viewport.screenHeight);
		viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);

		/**
		 * Misc. Initializations
		 */

		App.mode = 'view';
		App.parentEl.appendChild(app.view);
        
		const border = viewport.addChild(new Graphics());
		border.lineStyle(20, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);

		App.border = border;

		app.stage.addChild(viewport);

		/**
		 * Preload Resources
		 */
		app.loader.baseUrl = 'images';
		app.loader.add('rounded_seat', 'seat.svg');

		app.loader.onComplete.add(() => resolve(true));
		app.loader.onError.add((e) => {
			alert('Error preloading resources');
			reject('Error preloading resources');
		});

		app.loader.load();

		App.resources = app.loader.resources;
	});
}

function execute() {
	const app = App.app;
	const viewport = App.viewport;

    app.start();
}

export async function run(el: HTMLDivElement): Promise<void> {
	const app = new Application({
		backgroundColor: 0xfaf0f2,
		resizeTo: window,
		autoStart: false
	});

	App.app = app;
	App.parentEl = el;

	try {
		if (await init()) execute();
	} catch (e: any) {
		console.error(e);
	}
}
