export class Control {
    id: string;
    name: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(params: any) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.decription;
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
    }
}
