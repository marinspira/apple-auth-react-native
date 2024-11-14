import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabContent {
  label: string;  
  content: string; 
}

interface TabsProps {
  tabs: TabContent[]; 
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  return (
    <View style={styles.container}>

      {/* Label das Abas */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, activeTab === tab.label && styles.activeTab]}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text style={activeTab === tab.label ? styles.activeText : styles.inactiveText}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo das Abas */}
      <View style={styles.content}>
        {tabs.map((tab) => (
          activeTab === tab.label && (
            <Text key={tab.label} style={styles.contentText}>
              {tab.content}
            </Text>
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#373737',
    paddingVertical: 10,
    borderRadius: 100
  },
  tab: {
    padding: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#858585',
    borderRadius: 100
  },
  activeText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
  },
});

export default Tabs;
