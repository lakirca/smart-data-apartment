import { IAgentInfo } from "./agent-info.interface";

export interface IApartmentList {
  agentInfo: IAgentInfo;
  body: any;
  records: any;
  role: string;
  showContactInfo: boolean;
  title: string;
}
