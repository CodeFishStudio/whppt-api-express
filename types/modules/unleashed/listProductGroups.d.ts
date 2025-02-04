import { HttpModule } from '../HttpModule';
declare const listProductGroups: HttpModule<{}, {
    _id: string;
    amount: number;
}[]>;
export default listProductGroups;
