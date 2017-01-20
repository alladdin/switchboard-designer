import { Input } from '@angular/core';
import { Control } from '../structures/all';

export class ControlComponent {
    ui: any;

    constructor() {}

    isSelected(item: Control): boolean {
        if (this.ui === undefined){
            return false;
        }
        let selected: Control = this.ui.selected;
        if (!selected){
            return false;
        }
        return selected.id === item.id;
    }

    setSelected(event: any, item_id: string) {
        if (this.ui !== undefined){
            event.preventDefault();
            event.stopPropagation();
            if (this.ui.selected === item_id){
                this.ui.selected = undefined;
            }else{
                this.ui.selected = item_id;
            }
        }
    }
}
