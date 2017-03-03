import { Control } from '../../structures/all';

export interface IDesignerAction {

    getName(): string;

    itemMouseDown(event: any, item: Control): void;
    itemMouseUp(event: any, item: Control): void;
    itemMouseMove(event: any, item: Control): void;

    designerMouseDown(event: any): void;
    designerMouseUp(event: any): void;
    designerMouseMove(event: any, real_x: number, real_y: number): void;
}
