import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="main-panel">
            <SwitchBoard [ui]="ui"></SwitchBoard>
        </div>
    `
})

export class AppComponent {
    public ui: any = { selected: [] };
}
