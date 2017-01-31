import { Control } from './control';
import { Rail } from './rail';

export class ControlGroup extends Control {
    controls: Control[];

    constructor(params: any, controls: Control[]) {
        super(params);
        this.controls = controls;
    }
}

