export interface AddRecord {
    name: string,
    code: string,
    forecast: string,
    startDate: string,
    result: string,
    isRight: boolean,
    [propName: string]: any,
}

export enum RecordEnum {
    Name = 'name',
    Code = 'code',
    Forecast = 'forecast',
    StartDate = 'startDate',
    Result = 'result',
}
