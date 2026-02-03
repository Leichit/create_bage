
export enum BadgeRole {
  DELEGATE = 'Delegate',
  CHAIR = 'Chair',
  CO_CHAIR = 'Co-Chair',
  SECRETARIAT = 'Secretariat',
  PRESS = 'Press',
  HELPER = 'Helper',
  VIP = 'VIP Guest'
}

export interface FontSizes {
  eventTitle: number;
  eventSubtitle: number;
  name: number;
  roleLabel: number;
  squareCode: number;
  country: number;
  committee: number;
  footerRole: number;
}

export interface BadgeData {
  name: string;
  country: string;
  committee: string;
  role: BadgeRole;
  roleLabel: string;
  squareCode: string;
  eventTitle: string;
  eventSubtitle: string;
  year: string;
  primaryColor: string;
  accentColor: string;
  fontSizes: FontSizes;
  titleFont: string;
  logos: string[]; 
}

export interface AIResponse {
  description: string;
  concepts: {
    title: string;
    elements: string[];
    colorUsage: string;
  }[];
}