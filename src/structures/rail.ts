import { Control } from './control';
import { ControlGroup } from './control_group';

export class Rail extends ControlGroup {
    constructor(params: any, controls: Control[]) {
        super(params, controls);
        this.dimension_display.offset.y = 0;
        this.dimension_display.spacing.y = 0;
        this.dimension_display.offset.x = 0;
        this.dimension_display.spacing.x = 0;
        this.dimension_display.horizontal = true;
        this.dimension_display.vertical = true;
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
            if (
                (ctrl.display.x + ctrl.display.width > this.display.width)
                || (ctrl.display.x < 0)
            ) {
                ctrl.dimension_error = true;
            }else{
                ctrl.dimension_error = false;
            }

            last_x += ctrl.width;
        });
    }

    onDimensionChange(): void {
        super.onDimensionChange();
        this.calculateDimensions();
    }
}
