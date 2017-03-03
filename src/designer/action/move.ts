import { Control } from '../../structures/all';
import { DesignerActionSelect } from './select';

export class DesignerActionMove extends DesignerActionSelect {
    private mouse_start: any;

    private acceptable_parent: Control;

    getName(): string {
        return 'MOVE';
    }

    click(): void {
        super.click();
        this.mouse_start = {
            x: this.x - this.uiSelected().abs_display_x,
            y: this.y - this.uiSelected().abs_display_y,
        };
    }

    dragStart(): boolean {
        if ( this.ui.selected && this.ui.selected.moveable ){
            return true;
        }else{
            return false;
        }
    }

    itemMouseMove(event: any, item: Control): void {
        super.itemMouseMove(event, item);

        if (this.in_drag){
            if (!this.acceptable_parent && item.isAcceptableChild(this.uiSelected())){
                this.acceptable_parent = item;
            }
        }
    }

    dragMove(): void {
        if (this.acceptable_parent
            && (
                !this.uiSelected().parent_control
                || (this.acceptable_parent.id != this.uiSelected().parent_control.id)
            )
        ){
            this.uiSelected().changeParent(this.acceptable_parent);
        }
        this.acceptable_parent = undefined;

        var parent_coords = {
            x: 0,
            y: 0,
        };
        if (this.uiSelected().parent_control !== undefined){
            parent_coords.x = this.uiSelected().parent_control.abs_display_x;
            parent_coords.y = this.uiSelected().parent_control.abs_display_y;
        }
        this.uiSelected().x = this.x - parent_coords.x - this.mouse_start.x;
        this.uiSelected().y = this.y - parent_coords.y - this.mouse_start.y;
    }

    dragStop(): void {
    }

    uiSelected(): Control {
        return this.ui.selected;
    }
}
