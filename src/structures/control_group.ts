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
        super.addControl(control);

        if (!this.isAcceptableChild(control)) {
            return;
        }

        this.controls.push(control);
        control.parent_control = this;
        control.on_dimension_change = (ctrl: Control) => this.childDimensionChange(ctrl);
        this.sortControls();
        this.calculateDimensions();
    }

    removeControl(control:Control): void {
        super.removeControl(control);
        control.parent_control = undefined;
        control.on_dimension_change = undefined;
        this.controls = this.controls.filter(item => (item !== control));
        this.calculateDimensions();
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

    getAcceptableParents(control: Control): Control[] {
        let parents: Control[] = super.getAcceptableParents(control);

        this.controls.forEach((ctrl:Control) => {
            parents = parents.concat(ctrl.getAcceptableParents(control));
        });

        return parents;
    }
}

