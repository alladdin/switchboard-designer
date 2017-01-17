import { DINObject } from './din_object';
import { DINTerminal } from './din_terminal';
import { Rail } from './rail';

export class DINTerminalGroup extends DINObject {
    terminals: string[];
    width: number;

    constructor(params: any) {
        super(params);
        this.width = params.width;
        this.terminals = params.terminals;
    }
}
