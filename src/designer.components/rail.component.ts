import { Component, Input } from '@angular/core';

import { Rail } from '../structures/all';
import { ControlComponent } from './control.component';

@Component({
    selector: 'Rail',
    styles: [`
        .rail {
            display: block;
            position: absolute;
            background-image: url(images/din-rail-simple.svg);
            background-repeat: repeat-x;
            background-position: left center;      
        }

        .rail-outline {
            display: block;
            position: absolute;
            border: 0.8mm solid rgba(255,92,92,0.8);
        }

        .rail > h2 {
            position: absolute;
            display: block;
            top: 1mm;
            left: 1mm;
            z-index:100;
            line-height: 1em;
            margin: 0;
            padding 0;
        }
    `],
    template: `
        <div *ngIf="current_rail && isSelected(current_rail)" ngClass="rail-outline"
                [style.left]="current_rail.x + 'mm'"
                [style.top]="current_rail.y + 'mm'"
                [style.width]="current_rail.width + 'mm'"
                [style.height]="current_rail.height + 'mm'">
        </div>
        <div *ngIf="current_rail" ngClass="rail"
                [class.selected]="isSelected(current_rail)"
                (click)="setSelected($event, [current_rail])"
                [style.left]="current_rail.x + 'mm'"
                [style.top]="current_rail.y + 'mm'"
                [style.width]="current_rail.width + 'mm'"
                [style.height]="current_rail.height + 'mm'">
            <h2 (click)="setSelected($event, [current_rail])">{{current_rail.name}}</h2>
            <DINObject *ngFor="let item of current_rail.items" [current_rail]="current_rail" [item]="item" [ui]="ui" ></DINObject>
        </div>
    `
})

export class RailComponent extends ControlComponent {
    @Input() current_rail: Rail;
    @Input() ui: any;

    constructor (
    ){ super() }
}

