import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{ id: string; label: string }>;
}

export default function Sidebar({ activeTab, onTabChange, tabs }: SidebarProps) {
    return (
    <aside className="w-full md:w-64 bg-white">
      <div className="p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-full text-left py-3 border-b transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-black font-medium text-black bold-700'
                : 'border-gray-200 text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </aside>
  );
};
// This component is a sidebar that displays a list of tabs.