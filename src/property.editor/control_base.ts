import { Translation, TranslationService } from 'angular-l10n';
import { UndoQueueService } from '../tools/undo_queue.service';

export class ControlBase extends Translation {
    item: any;

    constructor(
        public translation: TranslationService,
        protected undo_queue: UndoQueueService,
    ) {
        super(translation);
    }

    onChange(key: string, value: any){
        let item = this.item;
        let old = this.item[key];

        if (old !== value){
            this.undo_queue.add(key+' of '+item.id,
                function() { item[key] = old; },
                function() { item[key] = value; });

            item[key] = value;
        }
    }
}
