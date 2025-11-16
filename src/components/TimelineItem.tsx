import Bubble from './Bubble';
import Icon from './Icon';
import type { Message, Role, RoleTheme } from '../types/domain';

export type TimelineItemProps = {
  message: Message;
  role: Role;
  theme?: RoleTheme;
  isLeft: boolean;
  onSelect: (message: Message) => void;
};

const TimelineItem = ({ message, role, theme, isLeft, onSelect }: TimelineItemProps) => {
  return (
    <div className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
      <div onClick={() => onSelect(message)} onKeyDown={() => onSelect(message)}>
        <Bubble message={message} role={role} theme={theme} />
      </div>
      <Icon role={role} size={32} />
    </div>
  );
};

export default TimelineItem;
