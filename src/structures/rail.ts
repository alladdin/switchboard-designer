import { Control } from './control';
import { DINObject } from './din_object';

export class Rail extends Control {
    x: number;
    y: number;
    height: number;
    width: number;
    items: DINObject[];

    constructor(params: any) {
        super(params);
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.items = params.items;
    }
}
