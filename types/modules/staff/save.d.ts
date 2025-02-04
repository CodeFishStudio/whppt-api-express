import { HttpModule } from '../HttpModule';
import { Staff, StaffDepartment, MarketArea, UnleashedServiceGroup, UnleashedUser } from './Model';
declare const save: HttpModule<{
    _id: string;
    contactId: string;
    marketArea: MarketArea;
    department: StaffDepartment;
    firstName: string;
    lastName: string;
    isActive: boolean;
    xeroUser?: string;
    xeroServiceGroup?: string;
    unleashedServiceGroup: UnleashedServiceGroup;
    unleashedUser: UnleashedUser;
}, Staff>;
export default save;
