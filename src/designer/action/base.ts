import { Control } from '../../structures/all';
import { IDesignerAction } from './action.interface';

export class DesignerActionBase implements IDesignerAction {
    protected ui: any;
    protected cache_event: any;
    public in_drag: boolean;
    protected x: number;
    protected y: number;

    constructor(ui: any){
        this.ui = ui;
    }

    getName(): string {
        return 'BASE';
    }

    itemMouseDown(event: any, item: Control): void {
        if (!this.cache_event){
            this.cache_event = {
                mouse: {
                    buttons: event.buttons,
                    screenX: event.screenX,
                    screenY: event.screenY,
                },
                item: item,
            };
            this.in_drag = false;
        }
    }

    designerMouseDown(event: any): void {
        if (this.cache_event && (this.cache_event.mouse.buttons == 1)) {
            this.click();
        }
        event.preventDefault();
        event.stopPropagation();
    }

    itemMouseMove(event: any, item: Control): void {
    }

    designerMouseMove(event: any, real_x: number, real_y: number): void {
        this.x = real_x;
        this.y = real_y;
        if (this.cache_event){
            if (
                !this.in_drag
                && (
                    (Math.abs(event.screenX - this.cache_event.mouse.screenX) > 2)
                    || (Math.abs(event.screenY - this.cache_event.mouse.screenY) > 2)
                )
            ){
                this.in_drag = this.dragStart();
            }
        }
        if (this.in_drag){
            this.dragMove();
        }
    }

    itemMouseUp(event: any, item: Control): void {
    }

    designerMouseUp(event: any): void {
        this.cache_event = undefined;
        if (this.in_drag){
            this.in_drag = false;
            this.dragStop();
        }
        event.preventDefault();
        event.stopPropagation();
    }

    dragStart(): boolean {
        return false;
    }

    dragMove(): void {
    }

    dragStop(): void {
    }

    click(): void {
    }
}
