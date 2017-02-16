import { Control } from './control';
import { Rail } from './rail';

export class ControlGroup extends Control {
    controls: Control[];

    constructor(params: any, controls: Control[]) {
        super(params);
        this.controls = [];
        controls.forEach((control:Control) => this.addControl(control));
    }

    addControl(control:Control): void {
        this.controls.push(control);
        control.parent_control = this;
        control.on_dimension_change = (ctrl: Control) => this.childDimensionChange(ctrl);
    }

    sortControls(): void {
        this.controls.sort((a, b) => a.x - b.x);
    }

    childDimensionChange(control:Control): void {
        this.sortControls();
    }

    calculateDimensions(): void {
        super.calculateDimensions();
        this.controls.forEach(control => control.calculateDimensions());
    }
}

