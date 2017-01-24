import { Control } from '../structures/all';

export class ControlComponent {
    ui: any;
    item: Control;

    constructor() {}

    isSelected(): boolean {
        if (this.ui === undefined){
            return false;
        }
        let selected: Control = this.ui.selected;
        if (!selected){
            return false;
        }
        return selected.id === this.item.id;
    }

    setSelected() {
        if (this.ui !== undefined){
            if (this.ui.selected === this.item){
                this.ui.selected = undefined;
            }else{
                this.ui.selected = this.item;
            }
        }
    }
}
