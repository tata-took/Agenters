import type {
  Conversation,
  Role,
  RoleTheme,
  ScenarioOption,
} from '../types/domain';

const fetchJson = async <T>(path: string): Promise<T> => {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }
  return (await res.json()) as T;
};

export const loadRoles = (): Promise<Role[]> => fetchJson<Role[]>('/config/roles.json');

export const loadRoleThemes = (): Promise<Record<string, RoleTheme>> =>
  fetchJson<Record<string, RoleTheme>>('/config/roleThemes.json');

export const loadManifest = (): Promise<{ conversations: ScenarioOption[] }> =>
  fetchJson<{ conversations: ScenarioOption[] }>('/data/conversations/manifest.json');

export const loadConversationByPath = (path: string): Promise<Conversation> =>
  fetchJson<Conversation>(path);

export type InitialData = {
  roles: Role[];
  roleThemes: Record<string, RoleTheme>;
  scenarioOptions: ScenarioOption[];
  initialScenarioId: string;
  conversation: Conversation;
};

export const loadInitialData = async (): Promise<InitialData> => {
  const [roles, roleThemes, manifest] = await Promise.all([
    loadRoles(),
    loadRoleThemes(),
    loadManifest(),
  ]);

  if (!manifest.conversations.length) {
    throw new Error('シナリオが設定されていません');
  }

  const initialScenario = manifest.conversations[0];
  const conversation = await loadConversationByPath(initialScenario.file);

  return {
    roles,
    roleThemes,
    scenarioOptions: manifest.conversations,
    initialScenarioId: initialScenario.id,
    conversation,
  };
};
