import { Component, Input } from '@angular/core';

@Component({
    selector: '[DimensionText]',
    styles: [`
    `],
    template: `
        <svg:text ngClass="dimension-text"
            *ngIf="isVisible"
            [attr.x]="textX"
            [attr.y]="textY"
            [attr.text-anchor]="textAnchor"
            [attr.font-size]="font_size"
            [attr.fill]="color"
            [attr.transform]="mirror?'rotate(180,'+textX+','+textY+')':''"
        >{{width.toFixed(1) + units}}</svg:text>
        <svg:path
            *ngIf="isSmall && (anchor === 'center')"
            [attr.d]="''
                +'M'+baseX+' '+y+' '
                +'v'+ (middle_margin - 0.5) +' '
                +'m-'+(text_line/2)+' 0 '
                +'h'+text_line+' '
                "
            [attr.stroke]="color"
            [attr.stroke-width]="stroke_width"
            [attr.fill]="'none'"
        />
        <svg:path
            *ngIf="isSmall && (anchor !== 'center')"
            [attr.d]="''
                +'M'+baseX+' '+y+' '
                +'L '+textX+' '+textLineY+' '
                +'h '+(anchor === 'left'?(0-text_line):text_line)+' '
                "
            [attr.stroke]="color"
            [attr.stroke-width]="stroke_width"
            [attr.fill]="'none'"
        />
    `
})
export class DimensionTextComponent {
    @Input() x: number = 0;
    @Input() y: number = 0;
    @Input() width: number = 0;
    @Input() units: string = 'mm';
    @Input() mirror: boolean = false;
    @Input() anchor: string = 'center';

    small_width: number = 17.5;
    font_size: number = 3.5;
    color: string = '#000';
    stroke_width: number = 0.3;
    large_margin = 0.5;
    middle_margin = 7;
    other_margin = 1;
    text_line = 8;

    get baseType(): string {
        let t = this.mirror?'mirror_':'';
        if (this.isLarge){
            return t + 'large';
        }
        return t + this.anchor;
    }

    get baseX(): number {
        return this.x+this.width/2;
    }

    get isVisible(): boolean {
        return this.width > 0;
    }

    get isSmall(): boolean {
        return (this.isVisible) && (!this.isLarge);
    }

    get isLarge(): boolean {
        return this.width >= this.small_width;
    }

    get textX(): number {
        switch (this.baseType) {
            case 'left':
            case 'mirror_left':
                return this.baseX - 1.5;
            case 'right':
            case 'mirror_right':
                return this.baseX + 1.5;
            default:
                return this.baseX;
        }
    }

    get textY(): number {
        switch (this.baseType) {
            case 'left':
            case 'right':
                return this.y + this.other_margin + this.font_size;
            case 'mirror_left':
            case 'mirror_right':
                return this.y + this.other_margin;
            case 'center':
                return this.y + this.middle_margin + this.font_size;
            case 'mirror_center':
                return this.y + this.middle_margin;
            case 'large':
                return this.y - this.large_margin;
            case 'mirror_large':
                return this.y + this.large_margin;
            default:
                return this.y;
        }
    }

    get textLineY(): number {
        if (this.mirror) {
            return this.textY - 0.5;
        }
        return this.textY + 0.5;
    }

    get textAnchor(): string {
        switch (this.baseType){
            case 'left':
                return 'end';
            case 'mirror_left':
                return 'begin';
            case 'right':
                return 'begin';
            case 'mirror_right':
                return 'end';
            default:
                return 'middle';
        }
    }
}

@Component({
    selector: '[Dimension]',
    styles: [`
        .dimension-component {
            opacity: 0.6;
        }
    `],
    template: `
        <svg ngClass="dimension-component"
            [attr.x]="viewX()+units"
            [attr.y]="viewY()+units"
            [attr.width]="width()+units"
            [attr.height]="height()+units"
            [attr.viewBox]="'0 0 '+width()+' '+height()"
        >
            <svg:g
                [attr.transform]="'translate('+margin+', '+margin+')' + (vertical?' rotate(90)':'')"
                [attr.transform-origin]="margin+' '+margin"
                [attr.transform]=""
            >
                <svg:path
                    [attr.d]="''
                        + vLineStr(0)
                        + (position > 0 ? vLineStr(position) : '')
                        + ((position + inner_length) < outer_length ? vLineStr(position+inner_length) : '')
                        + vLineStr(outer_length)
                        +'M0 '+spacing+' H'+outer_length+' '
                        "
                    [attr.stroke]="'#000'"
                    [attr.stroke-width]="0.3"
                    [attr.fill]="'none'"
                />
                <svg:g DimensionText
                    [x]="0"
                    [y]="spacing"
                    [width]="position"
                    [units]="units"
                    [mirror]="vertical"
                    [anchor]="'left'"
                ></svg:g>
                <svg:g DimensionText
                    [x]="position"
                    [y]="spacing"
                    [width]="inner_length"
                    [units]="units"
                    [mirror]="vertical"
                    [anchor]="'center'"
                ></svg:g>
                <svg:g DimensionText
                    [x]="position+inner_length"
                    [y]="spacing"
                    [width]="outer_length - (position + inner_length)"
                    [units]="units"
                    [mirror]="vertical"
                    [anchor]="'right'"
                ></svg:g>
            </svg:g>
        </svg>
    `,
})
export class DimensionComponent {
    @Input() outer_length: number;
    @Input() inner_length: number;
    @Input() position: number;
    @Input() x: number = 0;
    @Input() y: number = 0;
    @Input() vertical: boolean = false;
    @Input() units: string = 'mm';
    @Input() spacing: number = 15;

    private line_cap_padding = 2;
    private line_cap_offset = 1;
    private margin = 30;

    vLineStr(pos: number):string {
        return "M"+pos+" 0 V"+(this.line_cap_padding + this.spacing)+" "+this.crossLineStr(pos);
    }

    crossLineStr(pos: number):string {
        return "M"+(pos-this.line_cap_offset)+" "+(this.spacing-this.line_cap_offset)
            + " l"+(2*this.line_cap_offset)+" "+(2*this.line_cap_offset)+" ";
    }

    viewX(): number {
        return this.x - this.margin;
    }

    viewY(): number {
        return this.y - this.margin;
    }

    width(): number {
        return this.verticalSize(this.vertical);
    }

    height(): number {
        return this.verticalSize(!this.vertical);
    }

    private verticalSize(vertical: boolean){
        if (vertical) {
            return Math.abs(this.spacing) + 2 * this.margin;
        }else{
            return this.outer_length + 2 * this.margin;
        }
    }
}
