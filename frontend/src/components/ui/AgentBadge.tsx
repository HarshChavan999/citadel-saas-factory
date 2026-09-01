import React from 'react';
import { AgentMetadata } from '../../lib/types';

interface AgentBadgeProps {
  agent: AgentMetadata;
  size?: 'sm' | 'md' | 'lg';
  showRole?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export const AgentBadge: React.FC<AgentBadgeProps> = ({ 
  agent, 
  size = 'md', 
  showRole = true,
  onClick,
  isActive = false
}) => {
  const statusColor = 
    agent.status === 'active' ? 'bg-emerald-400' :
    agent.status === 'analyzing' ? 'bg-cyan-400 animate-pulse' :
    agent.status === 'warning' ? 'bg-amber-400 animate-ping' : 'bg-slate-400';

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1.5',
    md: 'text-xs px-2.5 py-1.5 gap-2',
    lg: 'text-sm px-3.5 py-2 gap-2.5'
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center rounded-full border transition-all duration-200 ${sizeClasses[size]} ${agent.badgeBg} ${
        onClick ? 'cursor-pointer hover:opacity-90 hover:scale-105' : ''
      } ${isActive ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 shadow-lg shadow-cyan-500/20' : ''}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}></span>
      </span>
      <span className="font-medium text-slate-100 flex items-center gap-1.5">
        <span>{agent.avatar}</span>
        <span>{agent.name.split(' ')[0]}</span>
      </span>
      {showRole && (
        <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:inline">
          [{agent.id.toUpperCase()}]
        </span>
      )}
    </div>
  );
};
