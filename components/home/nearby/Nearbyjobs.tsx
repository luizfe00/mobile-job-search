import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import styles from "./nearbyjobs.style";
import { isLoading } from "expo-font";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useRouter } from "expo-router";
import { useFetch } from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, error, isLoading } = useFetch<any>("search", {
    query: "React developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job: any) => (
            <NearbyJobCard
              key={`nearby-job-${job?.job_id}`}
              job={job}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
