import { createAction, props } from '@ngrx/store';

export const rawImportData = createAction('[Import] raw data', props<{ data: any[] }>());
export const importHeaders = createAction('[Import] headers', props<{ headers: string[] }>());
export const importRows = createAction('[Import] rows', props<{ rows: any[] }>());
