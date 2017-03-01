import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpModule }    from '@angular/http';

import {ItemService} from '../item.service';
import {DesignerComponent} from './designer.component';
import {SwitchBoardComponent} from './switchboard.component';
import {RailComponent} from './rail.component';
import {DINObjectComponent} from './din_object.component';
import {DINDeviceComponent} from './din_device.component';
import {DINTerminalComponent} from './din_terminal.component';
import {DINTerminalGroupComponent} from './din_terminal_group.component';
import {ValueTitleComponent} from './value_title.component';
import {ValueTitleSVGComponent} from './value_title_svg.component';
import {ParamsInterpolatePipe} from './params_interpolate.pipe';
import {DimensionComponent, DimensionTextComponent} from './dimension.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        InlineSVGModule,
    ],
    declarations: [
        DesignerComponent,
        SwitchBoardComponent,
        RailComponent,
        DINObjectComponent,
        DINDeviceComponent,
        DINTerminalGroupComponent,
        DINTerminalComponent,
        ValueTitleComponent,
        ValueTitleSVGComponent,
        ParamsInterpolatePipe,
        DimensionComponent,
        DimensionTextComponent,
    ],
    providers: [
        ItemService
    ],
    exports: [ DesignerComponent ],
})

export class DesignerModule { }
