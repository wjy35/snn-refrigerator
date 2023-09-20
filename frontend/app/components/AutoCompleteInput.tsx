import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

const AutoCompleteInput = () => {
  const localData = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' },
  ];

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <SearchableDropdown
        onTextChange={(text: string) => console.log(text)}
        onItemSelect={(item: any) => console.log(item)}
        //suggestion container style
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#FAF7F6',
        }}
        //single dropdown item style
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        //single dropdown item text style
        itemTextStyle={{
          color: '#222',
        }}
        //maxHeight to restrict height of items dropdown
        itemsContainerStyle={{
          maxHeight: '100%',
        }}
        //mapping of item array
        items={localData}
        //default selected item index
        defaultIndex={2}
        //placeholder text for search input
        placeholder="placeholder"
        //to remove underline from android input
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

export default AutoCompleteInput;
