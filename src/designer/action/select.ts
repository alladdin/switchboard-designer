import { Control } from '../../structures/all';
import { DesignerActionBase } from './base';

export class DesignerActionSelect extends DesignerActionBase {
    getName(): string {
        return 'SELECT';
    }

    click(): void {
        this.ui.selected = this.cache_event.item;
    }
}
