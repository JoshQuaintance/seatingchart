import '@mszu/pixi-ssr-shim';
import { Container as PIXI_Container, DisplayObject, Sprite } from 'pixi.js';

export default class Container {
	private _container: PIXI_Container;
	private _children: DisplayObject[] = [];

	constructor() {
		this._container = new PIXI_Container();
		this._container.visible = true;
	}

	addChild(child: DisplayObject | Sprite, customFunction?: Function) {
		if (customFunction) return customFunction(this._container, child);
		this._container.addChild(child);

		this._children.push(child);
		return child;
	}

	get it() {
		return this._container;
	}
}
