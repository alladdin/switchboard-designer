import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { InlineSVGModule } from 'ng2-inline-svg';
import { HttpModule }    from '@angular/http';

import {ItemService} from './item.service';
import {SwitchBoardComponent} from './designer.components/switchboard.component';
import {RailComponent} from './designer.components/rail.component';
import {DINObjectComponent} from './designer.components/din_object.component';
import {DINDeviceComponent} from './designer.components/din_device.component';
import {DINTerminalComponent} from './designer.components/din_terminal.component';
import {DINTerminalGroupComponent} from './designer.components/din_terminal_group.component';
import {ValueTitleComponent} from './designer.components/value_title.component';
import {ParamsInterpolatePipe} from './designer.components/params_interpolate.pipe';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        InlineSVGModule
    ],
    declarations: [
        SwitchBoardComponent,
        RailComponent,
        DINObjectComponent,
        DINDeviceComponent,
        DINTerminalGroupComponent,
        DINTerminalComponent,
        ValueTitleComponent,
        ParamsInterpolatePipe
    ],
    providers: [
        ItemService
    ],
    exports: [ SwitchBoardComponent ],
})

export class DesignerModule { }
