export type Role = {
  id: string;
  displayName: string;
  roleType: string;
  themeKey: string;
  iconKey: string;
  oneLiner: string;
  shortDescription: string;
  styleHint: string;
};

export type RoleTheme = {
  backgroundLineColor: string;
};

export type MessageMeta = {
  category: string;
  tags?: string[];
};

export type Message = {
  id: string;
  roleId: string;
  content: string;
  createdAt: string;
  meta?: MessageMeta;
};

export type Conversation = {
  id: string;
  title: string;
  description?: string;
  messages: Message[];
};

export type ScenarioOption = {
  id: string;
  title: string;
  description?: string;
  file: string;
};

export type RoleLookup = Record<string, Role>;
export type RoleThemeLookup = Record<string, RoleTheme>;
