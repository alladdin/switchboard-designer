import { DINObject } from './din_object';

export class DINTerminal extends DINObject {
    device_type: string[];
    device_data: any;
    device_params: any;

    constructor(params: any) {
        super(params);
        this.device_type = params.device_type;
        this.device_data = params.device_data;
        this.device_params = params.device_params;
        this.width = params.device_data.width;
    }
}
