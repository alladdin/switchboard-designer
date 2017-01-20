import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';

import {ItemService} from '../item.service';
import {PropertyEditorComponent} from './property.editor.component';
import {ControlComponent} from './control.component';
import {DINDeviceComponent} from './DINDevice.component';
import {DINTerminalComponent} from './DINTerminal.component';
import {FieldInfoComponent} from './field/info.component';
import {FieldDeviceTypeInfoComponent} from './field/device_type_info.component';
import {FieldTextComponent} from './field/text.component';
import {FieldTextAreaComponent} from './field/textarea.component';
import {FieldSelectComponent} from './field/select.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LocaleModule,
        LocalizationModule.forChild(),
        MaterialModule
    ],
    declarations: [
        ControlComponent,
        DINDeviceComponent,
        DINTerminalComponent,
        FieldInfoComponent,
        FieldDeviceTypeInfoComponent,
        FieldTextComponent,
        FieldTextAreaComponent,
        FieldSelectComponent,
        PropertyEditorComponent
    ],
    providers: [
        ItemService
    ],
    exports: [ PropertyEditorComponent ],
})

export class PropertyEditorModule { }
