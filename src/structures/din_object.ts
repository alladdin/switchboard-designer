import { Control } from './control';
import { Rail } from './rail';

export class DINObject extends Control {
    group_name: string;
    group_id: number;

    constructor(params: any) {
        super(params);
        this.group_name = params.group_name;
        this.group_id = params.group_id;
    }
}
