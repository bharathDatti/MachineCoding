import React, { useState } from "react";


const DynamicTabs = () => {
    const [tabs, setTabs] = useState([
        { id: 1, title: "Tab 1", content: "Content for Tab 1" }
    ]);
    const [activeTab, setActiveTab] = useState(1);

    const addTab = () => {
        const newId = tabs.length + 1;
        const newTab = {
            id: newId,
            title: `Tab ${newId}`,
            content: `Content for Tab ${newId}`
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newId);
    };

    const removeTab = (id) => {
        if (tabs.length === 1) return; // Ensure at least one tab remains

        const filteredTabs = tabs.filter(tab => tab.id !== id);
        setTabs(filteredTabs);

        if (activeTab === id) {
            setActiveTab(filteredTabs[0]?.id || 1); // Switch to first tab if the active one is removed
        }
    };

    return (
        <section className="container">
            
        <div className="tabs-container">
            <div className="tabs-header">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.title}
                        {tabs.length > 1 && (
                            <button className="close-btn" onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering tab switch on close
                                removeTab(tab.id);
                            }}>
                                &times;
                            </button>
                        )}
                    </div>
                ))}
                <button className="add-tab" onClick={addTab}>+ Add Tab</button>
            </div>
            <div className="tab-content">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
        </section>
    );
};

export default DynamicTabs;
