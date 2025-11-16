import type { Message, Role } from '../types/domain';

export type MessageModalProps = {
  message: Message;
  role: Role;
  onClose: () => void;
};

const MessageModal = ({ message, role, onClose }: MessageModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(event: MouseEvent) => event.stopPropagation()}
      >
        <h3>{role.displayName}</h3>
        <p>{role.shortDescription}</p>
        <div className="modal-meta">
          <div>カテゴリ: {message.meta?.category ?? '---'}</div>
          {message.meta?.tags && message.meta.tags.length > 0 && (
            <div className="tag-list">
              {message.meta.tags.slice(0, 2).map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button className="modal-close" type="button" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
