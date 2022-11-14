import { IAgentInfo } from './agent-info.interface';
import { ApartmentItem } from '../models/apartment-item.model';

export interface IApartmentList {
  agentInfo: IAgentInfo;
  body: any;
  records: ApartmentItem[];
  role: string;
  showContactInfo: boolean;
  title: string;
}
