import Icon from './Icon';
import type { Role, RoleThemeLookup } from '../types/domain';

export type HeaderRolesBarProps = {
  roles: Role[];
  roleThemes: RoleThemeLookup;
};

const HeaderRolesBar = ({ roles, roleThemes }: HeaderRolesBarProps) => {
  return (
    <div className="roles-bar">
      {roles.map((role) => {
        const color = roleThemes[role.themeKey]?.backgroundLineColor ?? '#cbd5f5';
        return (
          <div
            key={role.id}
            className="role-pill"
            style={{ borderColor: color, boxShadow: `0 1px 2px rgba(15,23,42,0.08)` }}
          >
            <Icon role={role} size={28} />
            <div className="role-text">
              <span className="role-name">{role.displayName}</span>
              <span className="role-one-liner">{role.oneLiner}</span>
            </div>
            <div className="role-tooltip">{role.shortDescription}</div>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderRolesBar;
