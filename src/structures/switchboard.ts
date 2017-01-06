import { Control } from './control';
import { Rail } from './rail';

export class SwitchBoard extends Control {
    width: number;
    height: number;
    rails: string[];

    constructor(params: any) {
        super(params);
        this.width = params.width;
        this.height = params.height;
        this.rails = params.rails;
    }
}
