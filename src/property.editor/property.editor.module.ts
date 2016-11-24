import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {ItemService} from '../item.service';
import {PropertyEditorComponent} from './property.editor.component';
import {ControlComponent} from './control.component';
import {FieldRowComponent} from './field/row.component';
import {FieldTextComponent} from './field/text.component';
import {FieldTextAreaComponent} from './field/textarea.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        ControlComponent,
        FieldRowComponent,
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
