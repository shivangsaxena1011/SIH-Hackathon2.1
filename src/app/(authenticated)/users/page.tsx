'use client';

import { Users, Shield, Key } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 'U-001', name: 'Investigator Alpha', role: 'Senior Analyst', department: 'Narcotics', accessLevel: 'Tier 3' },
    { id: 'U-002', name: 'Agent Beta', role: 'Field Operative', department: 'Special Task Force', accessLevel: 'Tier 2' },
    { id: 'U-003', name: 'Director Gamma', role: 'System Admin', department: 'HQ', accessLevel: 'Tier 4 (Root)' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">USER MANAGEMENT</h1>
          <p className="text-gray-400 mt-2 text-sm flex items-center">
             <Shield className="w-4 h-4 mr-2 text-purple-500" />
             Role-Based Access Control (RBAC) Directory
          </p>
        </div>
      </div>

      <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-900/50">
                <tr>
                    <th className="p-4 text-xs font-semibold text-gray-400 uppercase">User ID</th>
                    <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Name</th>
                    <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Role</th>
                    <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Department</th>
                    <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Access Level</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-800/20">
                        <td className="p-4 text-sm font-mono text-gray-500">{u.id}</td>
                        <td className="p-4 text-sm font-medium text-white flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-500" /> {u.name}
                        </td>
                        <td className="p-4 text-sm text-gray-300">{u.role}</td>
                        <td className="p-4 text-sm text-gray-400">{u.department}</td>
                        <td className="p-4 text-sm">
                            <span className="flex items-center text-purple-400 bg-purple-500/10 px-2 py-1 rounded text-xs w-max border border-purple-500/20">
                                <Key className="w-3 h-3 mr-1" /> {u.accessLevel}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
