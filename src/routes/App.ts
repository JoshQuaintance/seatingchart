/**
 * This file is to let all the files that needs the app access to the application
 */

import '@mszu/pixi-ssr-shim';
import type { Application, LoaderResource, Graphics, utils as P_Utils } from 'pixi.js';
import type { Viewport } from 'pixi-viewport';

export type AppMode = 'view' | 'build';

export default class App {
	private static _viewport: Viewport;
	private static _app: Application;
	private static _resources: P_Utils.Dict<LoaderResource>;
	private static _border: Graphics;
	private static _mode: AppMode;
	static parentEl: HTMLDivElement;

	static set viewport(vp: Viewport) {
		this._viewport = vp;
	}

	static set app(application: Application) {
		this._app = application;
	}

	static set mode(m: AppMode) {
		this._mode = 'view';
	}

	static set resources(res: P_Utils.Dict<LoaderResource>) {
		this._resources = res;
	}

	static set border(b: Graphics) {
		this._border = b;
	}

	static get viewport() {
		return this._viewport;
	}

	static get app() {
		return this._app;
	}

	static get mode() {
		return this._mode;
	}

	static get resources() {
		return this._resources;
	}

	static get border() {
		return this._border;
	}
}
