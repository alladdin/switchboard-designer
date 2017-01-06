import { Injectable } from '@angular/core';
import { MOCK_ALL_OBJECTS, MOCK_SWITCHBOARD_UUID } from './structures/mock_switchboard';
import * as Structure from './structures/all';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

@Injectable()
export class SwitchBoardService {
    private cache = {};

    getSwitchBoardID(): string {
        return MOCK_SWITCHBOARD_UUID;
    }

    getControl(id: string): Observable<Structure.Control> {
        if (this.cache[id]){
            return Observable.of(this.cache[id]);
        }else{
            this.cache[id] = this.createControl(MOCK_ALL_OBJECTS[id], id);
            return Observable.of(this.cache[id]);
        }
    }

    createControl(data: any, id: string): Structure.Control {
        data.id = id;
        switch(data.type){
            case 'SwitchBoard':
                return new Structure.SwitchBoard(data);
            case 'Rail':
                return new Structure.Rail(data);
            case 'DINDevice':
                return new Structure.DINDevice(data);
            case 'DINTerminal':
                return new Structure.DINTerminal(data);
            case 'DINTerminalGroup':
                return new Structure.DINTerminalGroup(data);
            default:
                console.error('Unknown object type for control %o', data);
                return undefined;
        }
    }
}
