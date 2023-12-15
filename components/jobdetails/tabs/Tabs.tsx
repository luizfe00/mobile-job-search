import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

export interface JobTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

export interface TabButtonProps {
  name: string;
  activeTab: string;
  onHandleSearchType: (activeTab: string) => void;
}

const TabButton = ({ name, activeTab, onHandleSearchType }: TabButtonProps) => (
  <TouchableOpacity
    style={styles(name, activeTab).btn}
    onPress={() => onHandleSearchType(name)}
  >
    <Text style={styles(name, activeTab).btnText}>{name}</Text>
  </TouchableOpacity>
);

const JobTabs = ({ tabs, activeTab, setActiveTab }: JobTabsProps) => {
  return (
    <View style={styles().container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            activeTab={activeTab}
            name={item}
            onHandleSearchType={setActiveTab}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default JobTabs;
