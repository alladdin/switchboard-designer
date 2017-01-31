import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {CacheableService} from './cacheable.service';
import {LoaderService} from './loader.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ItemService extends CacheableService {
    private base_path = '/data';
    private extension = '.json';

    constructor(
        private http: Http,
        private loader: LoaderService
    ) {
        super();
    }

    getItem(path_parts: string[]): Observable<any> {
        return this.getWithCache( this.build_path(path_parts), (path) => {
            this.loader.start_request();
            return this.http.get(path)
                .map(response => {
                    this.loader.finish_request();
                    return response.json();
                })
                .catch(this.handleError)
        });
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
        this.loader.finish_request();
        console.error('An error occurred', error);
        return Observable.of(undefined);
    }
}
