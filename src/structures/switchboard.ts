import { Control, Rail } from './all';
import { ControlGroup } from './control_group';

export class SwitchBoard extends ControlGroup {
    constructor(params: any, controls: Control[]) {
        super(params, controls);
        this.x=0;
        this.y=0;
        this.calculateDimensions();
    }

    isAcceptableChild(control: Control): boolean {
        if (control instanceof Rail){ return true; }
        return false;
    }
}
