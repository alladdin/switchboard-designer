export class Control {
    id: string;
    name: string;
    description: string;
    _x: number = 0;
    _y: number = 0;
    _width: number = 0;
    _height: number = 0;
    display:any = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    dimension_error: boolean = false;
    dimension_display:any = {
        vertical: false,
        horizontal: false,
        offset: {
            x: 0,
            y: 0,
        },
        spacing: {
            x: 15,
            y: 15,
        },
    };

    parent_control: Control;

    private in_change:boolean = false;

    get x(): number { return this._x; }
    set x(value: number){
        this._x = value;
        this.display.x = value;
        this.onDimensionChange();
    }

    get y(): number { return this._y; }
    set y(value: number){
        this._y = value;
        this.display.y = value;
        this.onDimensionChange();
    }

    get width(): number { return this._width; }
    set width(value: number){
        this._width = value;
        this.display.width = value;
        this.onDimensionChange();
    }

    get height(): number { return this._height; }
    set height(value: number){
        this._height = value;
        this.display.height = value;
        this.onDimensionChange();
    }

    get abs_display_x(): number {
        let abs_x = this.display.x;
        if (this.parent_control !== undefined){
            abs_x += this.parent_control.abs_display_x;
        }
        return abs_x;
    }

    get abs_display_y(): number {
        let abs_y = this.display.y;
        if (this.parent_control !== undefined){
            abs_y += this.parent_control.abs_display_y;
        }
        return abs_y;
    }

    get moveable(): boolean {
        return false;
    }

    on_dimension_change: (control: Control) => void;

    constructor(params: any) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.decription;
        this._x = params.x;
        this._y = params.y;
        this._width = params.width;
        this._height = params.height;
        this.display.x = params.x;
        this.display.y = params.y;
        this.display.width = params.width;
        this.display.height = params.height;
    }

    onDimensionChange(): void{
        if (this.on_dimension_change !== undefined){
            if (!this.in_change){
                this.in_change = true;
                this.on_dimension_change(this);
                this.in_change = false;
            }
        }
    }

    calculateDimensions(): void {
    }

    addControl(control: Control): void {
    }

    removeControl(control: Control): void {
    }

    changeParent(new_parent: Control): void {
        if (this.parent_control !== undefined){
            let old_parent = this.parent_control;
            old_parent.removeControl(this);
            old_parent.calculateDimensions();
        }
        if (new_parent !== undefined){
            new_parent.addControl(this);
            new_parent.calculateDimensions();
        }
    }

    getAcceptableParents(control: Control): Control[] {
        if (this.isAcceptableChild(control)){
            return [this];
        }
        return [];
    }

    isAcceptableChild(control: Control): boolean {
        return false;
    }

    getRoot(): Control {
        if (this.parent_control === undefined){
            return this;
        }
        return this.parent_control.getRoot();
    }
}
