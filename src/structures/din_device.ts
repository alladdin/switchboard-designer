import { DINObject } from './din_object';

export class DINDevice extends DINObject {
    device_type: string[];
    device_params: any;

    constructor(params: any) {
        super(params);
        this.device_type = params.device_type;
        this.device_params = params.device_params;
    }
}
