import { Control } from './control';
import { Rail } from './rail';

export class SwitchBoard extends Control {
    name: string;
    width: number;
    height: number;
    rails: Rail[];

    constructor(params: any) {
        super(params);
        this.name = params.name;
        this.width = params.width;
        this.height = params.height;
        this.rails = params.rails;
    }
}
