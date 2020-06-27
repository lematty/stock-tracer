import { createAction, props } from '@ngrx/store';
import { BaseRow } from '../../models';

export const addRow = createAction('[Stock] add row', props<{ row: BaseRow }>());
export const editRow = createAction('[Stock] edit row', props<{ row: BaseRow }>());
export const removeRow = createAction('[Stock] remove row', props<{ symbol: string }>());
export const removeAllRows = createAction('[Stock] remove all rows');
