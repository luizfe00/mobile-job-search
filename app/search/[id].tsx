import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useFetch } from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import { NearbyJobCard, ScreenHeaderBtn } from "../../components";
import { ActivityIndicator } from "react-native";

import styles from "../../styles/search";

const SearchScreen = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const { data, isLoading, error, refetch } = useFetch<any>("search", {
    query: params.id,
    page: page.toString(),
  });

  const handlePagination = (direction: string) => {
    if (direction === "left" && page > 1) {
      setPage((prev) => prev - 1);
      refetch(page - 1);
    } else if (direction === "right") {
      setPage((prev) => prev + 1);
      refetch(page + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong!</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
