import { DINObject } from './din_object';
import { DINTerminal } from './din_terminal';
import { Rail } from './rail';

export class DINTerminalGroup extends DINObject {
    terminals: DINTerminal[];

    constructor(params: any) {
        super(params);
        this.terminals = params.terminals;
    }
}
