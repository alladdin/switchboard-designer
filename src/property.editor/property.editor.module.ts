import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { TranslationModule } from 'angular-l10n';

import {ItemService} from '../item.service';
import {PropertyEditorComponent} from './property.editor.component';
import {ControlComponent} from './control.component';
import {DINDeviceComponent} from './DINDevice.component';
import {DINTerminalComponent} from './DINTerminal.component';
import {DINTerminalGroupComponent} from './DINTerminalGroup.component';
import {RailComponent} from './Rail.component';
import {SwitchBoardComponent} from './SwitchBoard.component';
import {FieldInfoComponent} from './field/info.component';
import {FieldDeviceTypeInfoComponent} from './field/device_type_info.component';
import {FieldTextComponent} from './field/text.component';
import {FieldTextAreaComponent} from './field/textarea.component';
import {FieldSelectComponent} from './field/select.component';
import {FieldNumberComponent} from './field/number.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MaterialModule,
        TranslationModule.forChild(),
    ],
    declarations: [
        ControlComponent,
        DINDeviceComponent,
        DINTerminalComponent,
        DINTerminalGroupComponent,
        RailComponent,
        SwitchBoardComponent,
        FieldInfoComponent,
        FieldDeviceTypeInfoComponent,
        FieldTextComponent,
        FieldTextAreaComponent,
        FieldSelectComponent,
        FieldNumberComponent,
        PropertyEditorComponent
    ],
    providers: [
        ItemService
    ],
    exports: [ PropertyEditorComponent ],
})

export class PropertyEditorModule { }
