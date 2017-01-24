import { Control } from './control';
import { Rail } from './rail';

export class SwitchBoard extends Control {
    rails: string[];

    constructor(params: any) {
        super(params);
        this.rails = params.rails;
    }
}
