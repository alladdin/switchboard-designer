export class Control {
    id: string;
    name: string;
    description: string;
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    display:any = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
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
}
