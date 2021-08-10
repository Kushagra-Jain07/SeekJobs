import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as jobActions from "../../actions/jobActions"
import { useDispatch, useSelector } from "react-redux"

export default function PostJobsScreen(props) {

  const dispatch = useDispatch()

  const descriptionErrorMessage = useSelector(state => state.job.descriptionErrorMessage)
  const addressErrorMessage = useSelector(state => state.job.addressErrorMessage)
  const salaryErrorMessage = useSelector(state => state.job.salaryErrorMessage)
  const phoneErrorMessage = useSelector(state => state.job.phoneErrorMessage)

  const jobCreated = useSelector(state => state.job.jobCreated)

  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [salary, setSalary] = useState('')
  const [phone, setPhone] = useState('')

  const data = useCallback(() => {
    const jobData = {
      description: description,
      address: address,
      salary: salary,
      phone: phone
    }
    dispatch(jobActions.postJob(jobData))
  }, [description, address, salary, phone])

  const submit = async () => {
    await data()
  }

  useEffect(() => {
    if (jobCreated) {
      Alert.alert("Job Posted Successfully!", "See Your Jobs",
        [
          {
            text: 'Yes',
            onPress: () => {
              setDescription('')
              setAddress('')
              setSalary('')
              setPhone('')
              dispatch(jobActions.clearErrorMessage())
              props.navigation.navigate("UserOwnJobs")
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              setDescription('')
              setAddress('')
              setSalary('')
              setPhone('')
              dispatch(jobActions.clearErrorMessage())
            },
            style: 'cancel'
          }
        ])
    }
  }, [jobCreated])

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-140}>
      <ScrollView >
        <View >
          {
            descriptionErrorMessage != undefined &&
            (<View style={{ paddingTop: 5, marginLeft: 6 }}><Text style={{ color: "red" }}>{descriptionErrorMessage}</Text></View>)
          }
          <TextInput
            label="Job Description"
            mode="outlined"
            multiline={true}
            numberOfLines={5}
            theme={{ colors: { primary: "#008BDC" } }}
            left={<TextInput.Icon name="wrench" size={28} color={'#008BDC'} />}
            style={{ paddingHorizontal: 5, marginVertical: 5 }}
            value={description}
            onChangeText={(e) => setDescription(e)}
          />
          {
            addressErrorMessage != undefined &&
            (<View style={{ paddingVertical: 5, marginLeft: 6 }}><Text style={{ color: "red" }}>{addressErrorMessage}</Text></View>)
          }
          <TextInput
            label="Address"
            mode="outlined"
            multiline={true}
            numberOfLines={3}
            theme={{ colors: { primary: "#008BDC" } }}
            left={<TextInput.Icon name="map-marker" size={28} color={'#008BDC'} />}
            style={{ paddingHorizontal: 5, marginBottom: 5 }}
            value={address}
            onChangeText={(e) => setAddress(e)}
          />
          {
            salaryErrorMessage != undefined &&
            (<View style={{ paddingVertical: 5, marginLeft: 6 }}><Text style={{ color: "red" }}>{salaryErrorMessage}</Text></View>)
          }
          <TextInput
            label="Salary"
            mode="outlined"
            theme={{ colors: { primary: "#008BDC" } }}
            left={<TextInput.Icon name="currency-inr" size={28} color={'#008BDC'} />}
            style={{ paddingHorizontal: 5, marginBottom: 5 }}
            keyboardType="phone-pad"
            value={salary}
            onChangeText={(e) => setSalary(e)}
          />
          {
            phoneErrorMessage != undefined &&
            (<View style={{ paddingVertical: 5, marginLeft: 6 }}><Text style={{ color: "red" }}>{phoneErrorMessage}</Text></View>)
          }
          <TextInput
            label="Phone No."
            mode="outlined"
            theme={{ colors: { primary: "#008BDC" } }}
            left={<TextInput.Icon name="phone" size={28} color={'#008BDC'} />}
            style={{ paddingHorizontal: 5, marginBottom: 3 }}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(e) => setPhone(e)}
          />
          <Button style={styles.postBtn} mode="contained" onPress={submit}>
            Submit Job
          </Button>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postBtn: {
    marginTop: 10,
    marginHorizontal: 50,
    backgroundColor: "#008BDC"
  }
});

PostJobsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Post a New Job"
  }
}
