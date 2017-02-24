import { Control } from './control';
import { ControlGroup } from './control_group';

export class DINTerminalGroup extends ControlGroup {

    constructor(params: any, controls: Control[]) {
        super(params, controls);
        this.dimension_display.horizontal = true;
        this.dimension_display.offset.y = -30;
        this.dimension_display.spacing.y = 15;

        if (this.y === undefined){
            this.y = 0;
        }
    }

    childDimensionChange(control:Control): void{
        super.childDimensionChange(control);
        this.calculateDimensions();
    }

    calculateDimensions(): void {
        this.controls.forEach(control => control.display.height = (this.display.height - 40));
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
                if (ctrl.display.x < 0){
                    ctrl.display.x = 0;
                }else{
                    ctrl.display.x = this.display.width - ctrl.display.width;
                }
            }else{
                ctrl.dimension_error = false;
            }

            last_x += ctrl.width;
        });
        if (last_x != this.width){
            this.width = last_x;
        }
    }

    onDimensionChange(): void {
        super.onDimensionChange();
        this.calculateDimensions();
    }

    set y(value: number){
        this._y = 0;
        this.display.y = 0;
    }

    get moveable(): boolean {
        return true;
    }
}
