import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useQuery, gql } from "@apollo/client";

const COUNTRIES = (country) => gql`
  query Countries {
    Country(first: 10, orderBy: ${country}) {
      name
      alpha3Code
    }
  }
`;

const items = [
  {
    label: "least population",
    value: "population_asc",
  },
  {
    label: "most population",
    value: "population_desc",
  },
  {
    label: "least area",
    value: "area_asc",
  },
  {
    label: "most area",
    value: "area_desc",
  },
];

export default function Form() {
  const [category, setCategory] = useState("population_asc");
  const { loading, error, data, refetch } = useQuery(COUNTRIES(category));

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.header}>Which 10 countries have</Text>
        <DropDownPicker
          items={items}
          defaultValue={category.value}
          placeholder="what"
          dropDownStyle={styles.dropdown}
          onChangeItem={(item) => {
            setCategory(item.value);
            refetch();
          }}
        />
        <Text style={styles.header}>?</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error :(</Text>
      ) : (
        <FlatList
          data={data.Country}
          renderItem={(el) => <Text>{el.item.name}</Text>}
          keyExtractor={(item) => item.alpha3Code}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 100,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dropdown: {
    width: 150,
    alignSelf: "center",    
  },
  question: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
});
