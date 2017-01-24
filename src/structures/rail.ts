import { Control } from './control';
import { DINObject } from './din_object';

export class Rail extends Control {
    items: string[];

    constructor(params: any) {
        super(params);
        this.items = params.items;
    }
}
