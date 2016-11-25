import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { LocaleModule, LocalizationModule } from 'angular2localization';

import {ItemService} from '../item.service';
import {PropertyEditorComponent} from './property.editor.component';
import {ControlComponent} from './control.component';
import {FieldRowComponent} from './field/row.component';
import {FieldLabelComponent} from './field/label.component';
import {FieldInfoComponent} from './field/info.component';
import {FieldTextComponent} from './field/text.component';
import {FieldTextAreaComponent} from './field/textarea.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        LocaleModule,
        LocalizationModule.forChild()
    ],
    declarations: [
        ControlComponent,
        FieldRowComponent,
        FieldLabelComponent,
        FieldInfoComponent,
        FieldTextComponent,
        FieldTextAreaComponent,
        PropertyEditorComponent
    ],
    providers: [
        ItemService
    ],
    exports: [ PropertyEditorComponent ],
})

export class PropertyEditorModule { }
