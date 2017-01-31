import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {CacheableService} from './cacheable.service';
import {ItemService} from './item.service';
import {LoaderService} from './loader.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ControlService extends CacheableService {
    private base_path = '/rest/control';
    private extension = '.json';

    constructor(
        private item_service: ItemService,
        private http: Http,
        private loader: LoaderService
    ) { super(); }

    getControl(id: string): Observable<any> {
        return this.getWithCache(this.build_path(id), (path) => {
            this.loader.start_request();
            return this.http.get(path)
                .mergeMap(response => {
                    let response_json:any = response.json();
                    if ((response_json.type === 'DINDevice') || (response_json.type === 'DINTerminal')){
                        return this.item_service.getItem(response_json.device_type)
                            .map(item => {
                                response_json.device_data = item;
                                return response_json;
                            })
                    }else{
                        return Observable.of(response_json);
                    }
                }).map(response_json => {
                    this.loader.finish_request();
                    return response_json;
                })
                .catch(this.handleError)
        });
    }

    getControls(ids: string[]): Observable<any> {
        var obs_chain: Observable<any>[] = [];
        for (let id of ids){
            obs_chain.push(this.getControl(id));
        }
        return Observable.forkJoin(obs_chain);
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

