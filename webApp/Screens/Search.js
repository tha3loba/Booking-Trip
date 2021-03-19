import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { View, Text, Button } from 'react-native'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateArriver:"2021-01-26", 
      dateDepart: "2021-01-28",
      dateDiff: 0,
      house: []
    }
  }
  // componentDidMount(){
  //   let {item} = this.route.params
  //   console.log(item)
  // }

  render(){
    //format = new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH);
    const date1 = Date.parse(this.state.dateArriver);
    const date2 = Date.parse(this.state.dateDepart);
    const diffTime = Math.abs(date2 - date1);
    const dateDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return (
      <View style={{justifyContent: "center", alignItems: "center",}}>
        <Text style={{ marginTop: 55, fontSize: 20, marginBottom: 20, color: "#0AC4BA"}}>Booking House</Text>
        <Text style={{marginBottom: 25  }}>Date d'arriver</Text>
      <DatePicker
        style={{width: 200}}
        date={this.state.dateArriver}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
        <Text style={{marginBottom: 25, marginTop: 20  }}>Date de depart</Text>
       <DatePicker
        style={{width: 200}}
        date={this.state.dateDepart}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          
        }}
        onDateChange={(date) => {this.setState({dateDepart: date})}}
      />
      <Text style={{marginTop: 20}}>Vous avez Reserver Que pour {dateDiff}</Text>
      <Text style={{marginTop: 20}}>Le Prix est :</Text>
      <View style={{marginTop: 20}}>
      <Button title="Booking"
      color="#0AC4BA"></Button>
      </View>
      </View>
    )
  }
}
