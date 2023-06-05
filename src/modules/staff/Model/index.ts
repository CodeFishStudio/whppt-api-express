import { Contact } from 'src/modules/contact/Models/Contact';

export type StaffLoginArgs = {
  username: string;
  password: string;
};

export const emptyStaffLoginArgs = {
  username: '',
  password: '',
};

export type Staff = {
  _id: string;
  contactId: string;
  username: string;
  password?: string;
  createdAt?: Date;
  department?: StaffDepartment;
  marketArea?: MarketArea;
  isActive?: boolean;
  xeroUser?: string;
  xeroServiceGroup?: string;
};

export type StaffContact = Staff & { contact: Contact };
export type StaffDepartment = 'Cellar Door' | 'Office' | 'Restaurant';
export type MarketArea = 'Cellar Door' | 'Restaurant' | 'Cellar Door – Direct' | 'Direct';
