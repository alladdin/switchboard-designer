import { Input } from '@angular/core';
import { Control } from '../structures/all';

export class ControlComponent {
    ui: any;

    constructor() {}

    isSelected(item: Control): boolean {
        if (this.ui === undefined){
            return false;
        }
        let selected: Control[] = this.ui.selected;
        return selected.filter(sel => sel.id === item.id).length > 0;
    }

    setSelected(event: any, items: Control[]) {
        if (this.ui !== undefined){
            event.preventDefault();
            event.stopPropagation();
            this.ui.selected = items;
        }
    }
}
