import React from 'react';

import {Text } from 'react-native-elements';
export default function dataToBeShown(item,setFieldToShow) {
    let returnValue = ""
    switch (setFieldToShow) {
      case "date":
        returnValue = `dateOfBirth:  ${item && item.dateOfBirth? item.dateOfBirth :''}`
        break;
      case "location":
        returnValue = `location:  ${item && item.location && item.location.street ? item.location.street :''}`
        break;
      case "phone":
        returnValue = `Phone Number:  ${item && item.phone? item.phone :''}`
        break;
        case "web":
        returnValue = `Website Link:  ${item && item.picture? item.picture :''}`
        break;
        case "gender":
        returnValue = `Gender:  ${item && item.gender? item.gender :''}`
        break;
    }
    return <Text style={{ marginBottom: 10, height: 20, width: null }}>
    {returnValue}
 </Text>;
  }