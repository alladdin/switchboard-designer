import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpModule }    from '@angular/http';

import {ItemService} from '../item.service';
import {SwitchBoardComponent} from './switchboard.component';
import {RailComponent} from './rail.component';
import {DINObjectComponent} from './din_object.component';
import {DINDeviceComponent} from './din_device.component';
import {DINTerminalComponent} from './din_terminal.component';
import {DINTerminalGroupComponent} from './din_terminal_group.component';
import {ValueTitleComponent} from './value_title.component';
import {ValueTitleSVGComponent} from './value_title_svg.component';
import {ParamsInterpolatePipe} from './params_interpolate.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        InlineSVGModule,
    ],
    declarations: [
        SwitchBoardComponent,
        RailComponent,
        DINObjectComponent,
        DINDeviceComponent,
        DINTerminalGroupComponent,
        DINTerminalComponent,
        ValueTitleComponent,
        ValueTitleSVGComponent,
        ParamsInterpolatePipe,
    ],
    providers: [
        ItemService
    ],
    exports: [ SwitchBoardComponent ],
})

export class DesignerModule { }
