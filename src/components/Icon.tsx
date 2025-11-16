import type { Role } from '../types/domain';

export type IconProps = {
  role: Role;
  size?: number;
};

const Icon = ({ role, size = 32 }: IconProps) => {
  return (
    <div className="role-icon-wrap" style={{ width: size, height: size }}>
      <img
        src={`/icons/${role.iconKey}.svg`}
        alt={`${role.displayName} icon`}
        width={size}
        height={size}
        loading="lazy"
      />
    </div>
  );
};

export default Icon;
