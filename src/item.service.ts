import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class ItemService {
    private base_path = '/data';
    private extension = '.json';
    private cache = {};

    constructor(private http: Http) { }

    getItem(path_parts: string[]): Observable<any> {
        var path = this.build_path(path_parts);
        if (this.cache[path]){
            if (this.cache[path] instanceof Observable){
                return this.cache[path];
            }else{
                return Observable.of(this.cache[path]);
            }
        }else{
            return this.cache[path] = this.http.get(path)
                .map(response => this.cache[path] = response.json())
                .catch(this.handleError)
                .share();
        }
    }

    getDescriptionChain(path_parts: string[]): Observable<any> {
        let obs_chain: Observable<any>[] = [];
        for (let i = path_parts.length - 1; i > 0; i--){
            let desc_path = path_parts.slice(0, i);
            desc_path.push('description');
            obs_chain.unshift(this.getItem(desc_path));
        }
        return Observable.forkJoin(obs_chain);
    }

    private build_path(path_parts: string[]) {
        return this.base_path + '/' + path_parts.join('/') + this.extension;
    }

    private handleError(error: any): Observable<string> {
        console.error('An error occurred', error);
        return Observable.of(undefined);
    }
}
