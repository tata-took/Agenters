import TimelineItem from './TimelineItem';
import type {
  Conversation,
  RoleLookup,
  RoleThemeLookup,
  Message,
} from '../types/domain';

export type ChatTimelineProps = {
  conversation?: Conversation | null;
  roles: RoleLookup;
  themes: RoleThemeLookup;
  onMessageSelect: (message: Message) => void;
};

const ChatTimeline = ({ conversation, roles, themes, onMessageSelect }: ChatTimelineProps) => {
  if (!conversation) {
    return <div className="timeline-empty">会話ログを読み込み中...</div>;
  }

  return (
    <div className="timeline-content">
      {conversation.messages.map((message, index) => {
        const role = roles[message.roleId];
        if (!role) {
          return null;
        }
        const theme = themes[role.themeKey];
        return (
          <div key={message.id}>
            <TimelineItem
              message={message}
              role={role}
              theme={theme}
              isLeft={index % 2 === 0}
              onSelect={onMessageSelect}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatTimeline;
