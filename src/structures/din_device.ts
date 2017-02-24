import { Control } from './control';

export class DINDevice extends Control {
    device_type: string[];
    device_data: any;
    device_params: any;

    constructor(params: any) {
        super(params);
        this.dimension_display.horizontal = true;
        this.dimension_display.offset.y = -15;
        this.dimension_display.spacing.y = 10;

        this.device_type = params.device_type;
        this.device_data = params.device_data;
        this.device_params = params.device_params;
        this.width = params.device_data.width;
        if (this.y === undefined){
            this.y = 0;
        }
    }

    set y(value: number){
        this._y = 0;
        this.display.y = 0;
    }

    get moveable(): boolean {
        return true;
    }
}
