import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Structure from './structures/all';
import {Observable} from 'rxjs/Observable';

import {CacheableService} from './cacheable.service';
import {LoaderService} from './loader.service';
import {ControlService} from './control.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SwitchBoardService extends CacheableService {
    private base_path = '/rest/switchboard';
    private extension = '.json';

    constructor(
        private control_service: ControlService,
        private http: Http,
        private loader: LoaderService
    ) { super(); }

    getSwitchBoard(id: string): Observable<any> {
        return this.getWithCache(id, id => this.getSwitchBoardData(id));
    }

    getSwitchBoardData(id: string): Observable<any> {
        return this.http.get(this.build_path(id))
            .mergeMap(response => this.control_service.getControls(response.json()))
            .map(response => this.buildControlStructure(id, response));
    }

    buildControlStructure(id:string, data:any[]){
        let current_data = data.find(item => item.id === id);
        let controls:any[] = [];
        if (current_data.controls){
            controls = current_data.controls.map((control_id:any) => this.buildControlStructure(control_id, data));
        }
        return this.createControl(current_data, controls);
    }

    getControl(id: string): Observable<any> {
        return this.control_service.getControl(id)
            .map(control => this.createControl(control, []) );
    }

    getControls(ids: string[]): Observable<any> {
        if (!ids){
            return Observable.of([]);
        }
        return this.control_service.getControls(ids)
            .map(controls => controls.map((control:any) => this.createControl(control, []) ));
    }

    createControl(data: any, controls:any[]): Structure.Control {
        switch(data.type){
            case 'SwitchBoard':
                return new Structure.SwitchBoard(data, controls);
            case 'Rail':
                return new Structure.Rail(data, controls);
            case 'DINDevice':
                return new Structure.DINDevice(data);
            case 'DINTerminal':
                return new Structure.DINTerminal(data);
            case 'DINTerminalGroup':
                return new Structure.DINTerminalGroup(data, controls);
            default:
                console.error('Unknown object type for control %o', data);
                return undefined;
        }
    }

    private build_path(id:string) {
        return this.base_path + '/' + id + this.extension;
    }

    private handleError(error: any): Observable<string> {
        this.loader.finish_request();
        console.error('An error occurred', error);
        return Observable.of(undefined);
    }
}
