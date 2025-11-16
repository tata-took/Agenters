import type { Message, Role, RoleTheme } from '../types/domain';

export type BubbleProps = {
  message: Message;
  role: Role;
  theme?: RoleTheme;
};

const formatTime = (value: string) => {
  try {
    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
};

const Bubble = ({ message, role, theme }: BubbleProps) => {
  const lineColor = theme?.backgroundLineColor ?? '#d1d5db';
  return (
    <div
      className="message-bubble"
      style={{ borderLeftColor: lineColor }}
      role="button"
      tabIndex={0}
    >
      <div>{message.content}</div>
      <div className="message-metadata">
        <span>{role.displayName}</span>
        <span>{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default Bubble;
