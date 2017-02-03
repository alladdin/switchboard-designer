import { Control } from './control';
import { ControlGroup } from './control_group';

export class Rail extends ControlGroup {
    constructor(params: any, controls: Control[]) {
        super(params, controls);
    }

    childDimensionChange(control:Control): void{
        super.childDimensionChange(control);
        this.calculateDimensions();
    }

    calculateDimensions(): void {
        this.controls.forEach(control => control.display.height = this.display.height);
        super.calculateDimensions();

        let last_x = 0;
        this.controls.forEach((ctrl: Control) => {
            if (last_x < ctrl.x) {
                last_x = ctrl.x;
            }
            if (last_x != ctrl.display.x) {
                ctrl.display.x = last_x;
            }

            last_x += ctrl.width;
        });
    }

    onDimensionChange(): void {
        super.onDimensionChange();
        this.calculateDimensions();
    }
}
