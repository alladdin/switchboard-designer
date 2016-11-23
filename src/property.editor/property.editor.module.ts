import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {ItemService} from '../item.service';
import {PropertyEditorComponent} from './property.editor.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        PropertyEditorComponent
    ],
    providers: [
        ItemService
    ],
    exports: [ PropertyEditorComponent ],
})

export class PropertyEditorModule { }
