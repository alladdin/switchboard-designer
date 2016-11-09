import { Component, Input } from '@angular/core';

import { Rail } from '../structures/all';

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

        .rail > h2 {
            position: absolute;
            top: 0;
            left: 0;
        }
    `],
    template: `
        <div *ngIf="current_rail" ngClass="rail"
                [style.left]="current_rail.x + 'mm'"
                [style.top]="current_rail.y + 'mm'"
                [style.width]="current_rail.width + 'mm'"
                [style.height]="current_rail.height + 'mm'">
            <h2>{{current_rail.name}}</h2>
            <DINObject *ngFor="let item of current_rail.items" [current_rail]="current_rail" [item]="item" ></DINObject>
        </div>
    `
})

export class RailComponent {
    @Input() current_rail: Rail;
}

