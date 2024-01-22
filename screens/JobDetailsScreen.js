import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JobDetails from '../components/JobDetails';

const JobDetailsScreen = ({route}) => {
  return (
    <View>
      <JobDetails
        post_title={"Conocation"}
        hourlyRate={"12"}
        timeStamp={"16 Jan 2024 6:56"}
        noofpeople={12}
        location={"Raleigh"}
        uniqueId={"327834242941"}
        contact_phone={"99999999999"}
        event_date={"17 Jan 2024 5:50 PM"}
        theme={"Red and White"}
        latitude= {35.7796}
        longitude= {-78.6382}
        event_duration={"7"}
      />
    </View>
  );
};

export default JobDetailsScreen;
// <View>
// <JobDetails
//   post_title={route.params.item.post_title}
//   post_description={route.params.item.post_description}
//   contact_email={route.params.item.contact_email}
//   contact_phone={route.params.item.contact_phone}
//   event_date={route.params.item.event_date}
//   event_duration={route.params.item.event_duration}
// />
// </View>
const styles = StyleSheet.create({});
