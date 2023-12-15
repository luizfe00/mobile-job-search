import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import detailsData from "../../job-details.mock.json";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useFetch } from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { checkImageURL } from "../../utils";

const jobTabs = ["About", "Qualifications", "Responsabilities"];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(jobTabs[0]);

  const onRefresh = () => {};

  // const { data, isLoading, error, refetch } = useFetch('job-details', {
  //   job_id: params.id
  // })

  const isLoading = false;
  const error = false;
  const data = detailsData.data;
  const refetch = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      case "Responsabilities":
        return (
          <Specifics
            title="Responsabilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimensions="60%"
              handlePress={() => {}}
            />
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data?.length === 0 ? (
          <Text>No data found</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              companyName={data[0].employer_name}
              jobTitle={data[0].job_title}
              location={data[0].job_country}
            />
            <JobTabs
              activeTab={activeTab}
              setActiveTab={(activeTab) => setActiveTab(activeTab)}
              tabs={jobTabs}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <JobFooter
        url={
          data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"
        }
      />
    </SafeAreaView>
  );
};

export default JobDetails;
