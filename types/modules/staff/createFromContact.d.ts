import { HttpModule } from '../HttpModule';
import { MarketArea, Staff, StaffDepartment } from './Model';
declare const createFromContact: HttpModule<{
    contactId: string;
    username: string;
    password: string;
    department: StaffDepartment;
    marketArea: MarketArea;
    xeroUser?: string;
    xeroServiceGroup?: string;
}, Staff>;
export default createFromContact;
