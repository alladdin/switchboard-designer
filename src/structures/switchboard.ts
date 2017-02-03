import { Control } from './control';
import { ControlGroup } from './control_group';

export class SwitchBoard extends ControlGroup {
    constructor(params: any, controls: Control[]) {
        super(params, controls);
        this.calculateDimensions();
    }
}
