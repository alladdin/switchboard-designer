import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paramsInterpolate',
    pure: false
})
export class ParamsInterpolatePipe implements PipeTransform {
    transform(value: string, args: any): any {
        if (!value) return value;

        return value.replace(/\{\{\w+\}\}/g, function(txt) {
            return args[txt.replace(/^\{+|\}+$/g, '')];
        });
    }
}
