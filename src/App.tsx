import HeaderRolesBar from './components/HeaderRolesBar';
import ScenarioSelector from './components/ScenarioSelector';
import ChatTimeline from './components/ChatTimeline';
import MessageModal from './components/MessageModal';
import type {
  Conversation,
  Message,
  Role,
  RoleLookup,
  RoleThemeLookup,
  ScenarioOption,
} from './types/domain';
import { loadConversationByPath } from './lib/loadConfig';
import type { InitialData } from './lib/loadConfig';
import { useState } from 'react';

type AppState = {
  roles: Role[];
  roleLookup: RoleLookup;
  themes: RoleThemeLookup;
  scenarioOptions: ScenarioOption[];
  selectedScenarioId: string;
  conversations: Record<string, Conversation>;
  activeConversation?: Conversation | null;
  modalMessageId?: string | null;
  status: 'idle' | 'loading' | 'error';
  errorMessage?: string;
};

const mapRoles = (roles: Role[]): RoleLookup =>
  roles.reduce<RoleLookup>((acc, role) => {
    acc[role.id] = role;
    return acc;
  }, {});

const App = ({ initialData }: { initialData: InitialData }) => {
  const [state, setState] = useState<AppState>(() => ({
    roles: initialData.roles,
    roleLookup: mapRoles(initialData.roles),
    themes: initialData.roleThemes,
    scenarioOptions: initialData.scenarioOptions,
    selectedScenarioId: initialData.initialScenarioId,
    conversations: {
      [initialData.initialScenarioId]: initialData.conversation,
    },
    activeConversation: initialData.conversation,
    modalMessageId: null,
    status: 'idle',
  }));

  const handleScenarioChange = async (scenarioId: string) => {
    if (scenarioId === state.selectedScenarioId) {
      return;
    }

    const scenario = state.scenarioOptions.find((item) => item.id === scenarioId);
    if (!scenario) {
      return;
    }

    const cachedConversation = state.conversations[scenarioId];
    if (cachedConversation) {
      setState((prev) => ({
        ...prev,
        selectedScenarioId: scenarioId,
        activeConversation: cachedConversation,
        modalMessageId: null,
        status: 'idle',
        errorMessage: undefined,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      selectedScenarioId: scenarioId,
      activeConversation: null,
      modalMessageId: null,
      status: 'loading',
      errorMessage: undefined,
    }));

    try {
      const conversation = await loadConversationByPath(scenario.file);
      setState((prev) => ({
        ...prev,
        conversations: {
          ...prev.conversations,
          [scenarioId]: conversation,
        },
        activeConversation: conversation,
        status: 'idle',
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : '読み込みに失敗しました';
      setState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: message,
      }));
    }
  };

  const selectedRole = state.activeConversation?.messages.find(
    (message) => message.id === state.modalMessageId,
  )?.roleId;

  const modalTargetRole = selectedRole ? state.roleLookup[selectedRole] : undefined;
  const modalTargetMessage: Message | undefined = state.activeConversation?.messages.find(
    (message) => message.id === state.modalMessageId,
  );

  const statusNode = (() => {
    if (state.status === 'loading') {
      return <div className="loading-indicator">ログをロードしています...</div>;
    }
    if (state.status === 'error') {
      return <div className="error-banner">{state.errorMessage}</div>;
    }
    return null;
  })();

  return (
    <div className="app-shell">
      <div className="app-header">
        <div style={{ flex: 1 }}>
          <HeaderRolesBar roles={state.roles} roleThemes={state.themes} />
        </div>
        <div>
          <ScenarioSelector
            scenarios={state.scenarioOptions}
            selectedId={state.selectedScenarioId}
            onChange={handleScenarioChange}
          />
          {statusNode}
        </div>
      </div>
      <main className="timeline-shell">
        <ChatTimeline
          conversation={state.activeConversation}
          roles={state.roleLookup}
          themes={state.themes}
          onMessageSelect={(message) =>
            setState((prev) => ({ ...prev, modalMessageId: message.id }))
          }
        />
      </main>
      {modalTargetMessage && modalTargetRole && (
        <MessageModal
          message={modalTargetMessage}
          role={modalTargetRole}
          onClose={() => setState((prev) => ({ ...prev, modalMessageId: null }))}
        />
      )}
    </div>
  );
};

export default App;
