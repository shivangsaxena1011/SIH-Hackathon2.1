// RBAC Permission Matrix
import type { UserRole } from '@/types';

export interface RBACPermission {
  resource: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

const ROLE_PERMISSIONS: Record<UserRole, RBACPermission[]> = {
  SUPER_ADMIN: [
    { resource: '*', actions: ['read', 'write', 'delete', 'admin'] },
  ],
  INVESTIGATING_OFFICER: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'cases', actions: ['read', 'write'] },
    { resource: 'persons', actions: ['read', 'write'] },
    { resource: 'vehicles', actions: ['read'] },
    { resource: 'identifiers', actions: ['read'] },
    { resource: 'locations', actions: ['read'] },
    { resource: 'documents', actions: ['read', 'write'] },
    { resource: 'evidence', actions: ['read', 'write'] },
    { resource: 'network', actions: ['read'] },
    { resource: 'timeline', actions: ['read'] },
    { resource: 'map', actions: ['read'] },
    { resource: 'insights', actions: ['read'] },
    { resource: 'alerts', actions: ['read', 'write'] },
    { resource: 'assistant', actions: ['read'] },
    { resource: 'search', actions: ['read'] },
  ],
  FORENSIC_OFFICER: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'documents', actions: ['read', 'write'] },
    { resource: 'evidence', actions: ['read', 'write'] },
    { resource: 'persons', actions: ['read'] },
    { resource: 'cases', actions: ['read'] },
    { resource: 'search', actions: ['read'] },
  ],
  ANALYST: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'network', actions: ['read'] },
    { resource: 'timeline', actions: ['read'] },
    { resource: 'map', actions: ['read'] },
    { resource: 'insights', actions: ['read', 'write'] },
    { resource: 'cases', actions: ['read'] },
    { resource: 'persons', actions: ['read'] },
    { resource: 'vehicles', actions: ['read'] },
    { resource: 'identifiers', actions: ['read'] },
    { resource: 'locations', actions: ['read'] },
    { resource: 'alerts', actions: ['read'] },
    { resource: 'assistant', actions: ['read'] },
    { resource: 'search', actions: ['read'] },
    { resource: 'evidence', actions: ['read'] },
  ],
  AUDITOR: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'audit', actions: ['read'] },
    { resource: 'security', actions: ['read'] },
    { resource: 'cases', actions: ['read'] },
    { resource: 'alerts', actions: ['read'] },
    { resource: 'search', actions: ['read'] },
  ],
};

export function hasPermission(role: UserRole, resource: string, action: 'read' | 'write' | 'delete' | 'admin' = 'read'): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  
  return permissions.some(p => {
    const resourceMatch = p.resource === '*' || p.resource === resource;
    const actionMatch = p.actions.includes(action) || p.actions.includes('admin');
    return resourceMatch && actionMatch;
  });
}

export function getAccessibleResources(role: UserRole): string[] {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return [];
  
  if (permissions.some(p => p.resource === '*')) {
    return ['dashboard', 'cases', 'persons', 'vehicles', 'identifiers', 'locations',
      'documents', 'evidence', 'network', 'timeline', 'map', 'insights', 'alerts',
      'audit', 'security', 'users', 'settings', 'assistant', 'search'];
  }
  
  return permissions.map(p => p.resource);
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'SUPER_ADMIN': return 'Super Admin';
    case 'INVESTIGATING_OFFICER': return 'Investigating Officer';
    case 'FORENSIC_OFFICER': return 'Forensic Officer';
    case 'ANALYST': return 'Analyst';
    case 'AUDITOR': return 'Auditor';
    default: return role;
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'SUPER_ADMIN': return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'INVESTIGATING_OFFICER': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    case 'FORENSIC_OFFICER': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    case 'ANALYST': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'AUDITOR': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    default: return 'text-gray-400';
  }
}
