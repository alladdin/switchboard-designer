import { DINObject } from './din_object';

export class DINTerminal extends DINObject {
    local_name: string;
    device_type: string[];
    device_params: any;

    constructor(params: any) {
        super(params);
        this.local_name = params.local_name;
        this.device_type = params.device_type;
        this.device_params = params.device_params;
    }
}
