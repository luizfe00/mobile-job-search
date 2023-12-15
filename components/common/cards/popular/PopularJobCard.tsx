import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

export interface PopularJobProps {
  item: any;
  selectedJob: string;
  handleCardPress: (item: any) => void;
}

const PopularJobCard = ({
  handleCardPress,
  item,
  selectedJob,
}: PopularJobProps) => {
  return (
    <TouchableOpacity
      style={styles(selectedJob, item).container}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles(selectedJob, item).logoContainer}>
        <Image
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles().logoImage}
        />
      </TouchableOpacity>
      <Text style={styles().companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles().infoContainer}>
        <Text style={styles(selectedJob, item).jobName} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles().location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
