export interface Table {
    results: any;
    structure: any;
}
export interface TableResult {
    bname: string;
    did: number;
    dname: string;
    fnum: string;
    hname: string;
    hpart: string;
    op_date: string;
    saldo: number;
    sname: string;
    stname: string;
}
export interface ElementActions {
    name: string;
    action: string;
}
export interface UpdateElement {
    did: any;
}
