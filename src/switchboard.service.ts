import { Injectable } from '@angular/core';
import { MOCK_ALL_OBJECTS, MOCK_SWITCHBOARD_UUID } from './structures/mock_switchboard';
import * as Structure from './structures/all';
import {Observable} from 'rxjs/Observable';

import {ItemService} from './item.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SwitchBoardService {
    private cache = {};

    constructor(private item_service: ItemService) { }

    getSwitchBoardID(): string {
        return MOCK_SWITCHBOARD_UUID;
    }

    getControl(id: string): Observable<Structure.Control> {
        if (this.cache[id]){
            if (this.cache[id] instanceof Observable){
                return this.cache[id];
            } else {
                return Observable.of(this.cache[id]);
            }
        }else{
            let response_json = MOCK_ALL_OBJECTS[id];
            if ((response_json.type === 'DINDevice') || (response_json.type === 'DINTerminal')){
                let obs = this.item_service.getItem(response_json.device_type);

                return this.cache[id] = obs.share().map(item => {
                    response_json.device_data = item;
                    return this.cache[id] = this.createControl(response_json, id);
                });
            } else {
                this.cache[id] = this.createControl(response_json, id);
            }
            return Observable.of(this.cache[id]);
        }
    }

    getControls(ids: string[]): Observable<Structure.Control[]> {
        var obs_chain: Observable<Structure.Control>[] = [];
        for (let id of ids){
            obs_chain.push(this.getControl(id));
        }
        return Observable.forkJoin(obs_chain);
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
