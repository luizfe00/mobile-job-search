import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";

import styles from "./nearbyjobs.style";
import { isLoading } from "expo-font";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import data from "../../../mock.json";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useRouter } from "expo-router";

const Nearbyjobs = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

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
          data.data.map((job) => (
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
