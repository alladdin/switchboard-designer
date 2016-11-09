import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import {SwitchBoardService} from './switchboard.service';
import {ItemService} from './item.service';
import {SwitchBoardComponent} from './designer.components/switchboard.component';
import {RailComponent} from './designer.components/rail.component';
import {DINObjectComponent} from './designer.components/din_object.component';
import {DINDeviceComponent} from './designer.components/din_device.component';
import {DINTerminalComponent} from './designer.components/din_terminal.component';
import {DINTerminalGroupComponent} from './designer.components/din_terminal_group.component';
import {ValueTitleComponent} from './designer.components/value_title.component';
import {ParamsInterpolatePipe} from './designer.components/params_interpolate.pipe';

import { AppComponent }   from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
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
        SwitchBoardService,
        ItemService
    ],    
    bootstrap: [ AppComponent ]
})

export class AppModule { }
