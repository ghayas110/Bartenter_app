import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JobDetails from '../components/JobDetails';

const JobDetailsScreen = ({route}) => {
  console.log(route.params.item);
  return (
    <View>
      <JobDetails
        post_title={route.params.item.post_title}
        post_description={route.params.item.post_description}
        contact_email={route.params.item.contact_email}
        contact_phone={route.params.item.contact_phone}
        event_date={route.params.item.event_date}
        event_duration={route.params.item.event_duration}
      />
    </View>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({});
