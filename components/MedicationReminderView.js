import React from "react";
import { TouchableOpacity, Text, View, StyleSheet,Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MedicationReminderView = props => {
    const isTaken = props.Taken
    return(
    <TouchableOpacity
      style={{
        backgroundColor: "#4B778D",
        width:"96%",
        height:150,
        margin:"2%",
        borderRadius: 8,
      }}
      onPress={() => alert("Click!")}
    >
        <View style={styles.topContainer}>
            <Text
                style={styles.timeText}>{props.time}</Text>
            <MaterialCommunityIcons
                name={'menu-open'}
                style={{
                    fontSize:40,
                    paddingRight:5,
                }} />
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.pillContainer}>
                <Image
                    source={props.pillImage}
                    style={{
                        padding:5,
                        width:95,
                        height:95,
                    }}
                />
                <View style={styles.pillInfo}>
                    <Text style={{fontSize: 24, color: "black" }}>{props.pillName}</Text>
                </View>
            </View>
            <MaterialCommunityIcons
                name={ isTaken ? "check-circle" : "check-circle-outline"}
                style={{
                    fontSize:40,
                    color: isTaken ? "green" : "grey",
                    margin:10
                }}
            />
        </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    topContainer:{
        flex:1.3, flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", backgroundColor:"orange", borderTopLeftRadius:8, borderTopRightRadius:8
    },
    timeText:{
        fontSize:25,
        marginLeft:"40%",
        marginRight:"auto",
    },
    bottomContainer:{
        flex:3, flexDirection:"row", justifyContent:"space-between" ,alignItems:"center", backgroundColor:"white", borderBottomLeftRadius:8, borderBottomRightRadius:8
    },
    pillContainer:{
        flexDirection:"row",
        marginLeft:20
    },
    pillInfo:{
        width:200,
        padding:10,
        paddingLeft:20
    },

})

export default MedicationReminderView;