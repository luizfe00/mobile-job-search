import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES, icons, images } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

export default function Home() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              dimensions={28}
              handlePress={() => {}}
              iconUrl={icons.menu}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              dimensions={40}
              handlePress={() => {}}
              iconUrl={images.profile}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            handleSearch={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
            searchTerm={searchTerm}
            setSearchTerm={(newValue) => setSearchTerm(newValue)}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
