import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { SIZES, icons } from "../../../constants";
import { useRouter } from "expo-router";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState(jobTypes[0]);

  return (
    <View>
      <View style={styles().container}>
        <Text style={styles().userName}>Hello, Luiz!</Text>
        <Text style={styles().welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles().searchContainer}>
        <View style={styles().searchWrapper}>
          <TextInput
            style={styles().searchInput}
            value=""
            onChange={() => {}}
            placeholder="What jobs are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles().searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles().searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles().tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles(activeJobType).tab}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles(activeJobType, item).tabText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
