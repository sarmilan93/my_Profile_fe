interface MobileTabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export default function MobileTabs({ tabs, activeTab, onChange }: MobileTabsProps) {
    return (
        <div className="w-full overflow-x-auto md:hidden">
            <div className="flex border-b border-gray-200 pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 whitespace-nowrap text-sm transition-colors duration-200 ${activeTab === tab.id
                                ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}