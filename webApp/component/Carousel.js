import React, {useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, FlatList, Animated, BackHandler } from "react-native";
import CarouselItem from './CarouselItem';

const { width, height } = Dimensions.get('window');
const scrollX = new Animated.Value(0)
const position = Animated.divide(scrollX, width)

const Carousel = ({data}) => {
    if (data && data.length) {
        return (
            <View>
                <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    decelerationRate={'fast'}
                    data={data}
                    keyExtractor={(item, index) => `${item.id}` }
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX } } }] , { useNativeDriver: false })}
               /> 

               <View style={styles.dotView}>
                   {
                       data.map((item, index)=>{
                           let opacity = position.interpolate({
                               inputRange: [index - 1, index, index + 1],
                               outputRange: [0.3, 1, 0.3],
                               extrapolate: 'clamp'
                           })
                           return (
                               <Animated.View 
                                    key= {index}
                                    style={[styles.steps, {opacity}]}
                               />
                           )
                       })
                   }
               </View>
            </View>
        )
    }   
    return null 
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "red",
        margin: 20,
        height: 20
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
        backgroundColor: "black"
    }
})

export default Carousel