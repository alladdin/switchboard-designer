import { Control } from './control';
import { Rail } from './rail';

export class DINObject extends Control {
    x: number;

    constructor(params: any) {
        super(params);
        this.x = params.x;
    }
}
