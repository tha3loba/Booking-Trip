import React from "react"

import { View, Text, Dimensions, FlatList, Image, StyleSheet, Animated, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('screen')

const ITEM_WIDTH = width
const ITEM_HEIGHT = height * 0.75

const Houses = ({route, navigation}) => {

    const [house, setHouse] = React.useState(null);
    React.useEffect(() => {
        let { item } = route.params
        console.log(item)
        setHouse(item)
    })
  
    const StarReview = ({rate}) => {
        var starComponent = [];
        var fullStar = Math.floor(rate)
        var noStar = Math.floor(5-rate)
        var haiStar = 5 - fullStar - noStar

        for(var i = 0; i < fullStar; i++) {
            starComponent.push(
                <Image 
                    source={require('../asset/images/favourites.png')}
                    key={`full-${i}`}
                    resizeMode="cover"
                    style={{width: 18, height: 18}}
                />
            )
        }

        for(var i = 0; i < haiStar; i++) {
            starComponent.push(
                <Image 
                source={require('../asset/images/favourites.png')}
                    key={`half-${i}`}   
                    resizeMode="cover"
                    style={{width: 18, height: 18}}
                />
            )
        }

        for(var i = 0; i < noStar; i++) {
            starComponent.push(
                <Image 
                source={require('../asset/images/favourites.png')}    
                    key={`empty-${i}`}
                    resizeMode="cover"
                    style={{width: 18, height: 18}}
                />
            )
        }
        return (
            <View style={{flexDirection: 'row', alignItems: "center"}}>
                {starComponent}
                <Text style={{marginLeft: 10, color: "gray", fontSize: 15}}>Rate</Text>
            </View>
        )
    }

    const scrollY = React.useRef(new Animated.Value(0)).current;
        return(
            <View style={{flex: 1}}>
                    <View style={{height: ITEM_HEIGHT, overflow: "hidden"}}>
                    <Animated.FlatList 
                        data={house?.images}
                        keyExtractor={(_, index) => index.toString()}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        onScroll={Animated.event([{nativeEvent: { contentOffset: {y: scrollY}}}], { useNativeDriver: true})} 
                        renderItem={({item}) => {
                            return(
                                <View>
                                    <Image source={{uri: item}} style={styles.image}/>
                                </View>
                            )
                        }}
                    />
                    <View style={styles.pagination}>
                        {
                            house?.images.map((_,index) => {
                                return <View style={[styles.dot]} key={index}/>
                            })
                        }
                        <Animated.View  style={[styles.dotIndicator, 
                        {
                            transform: [{ translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 16]
                            })}]
                        }]}/>
                    </View>
                </View>
                <ScrollBottomSheet 
                        componentType="FlatList"    
                        snapPoints={[128, '50%', windowHeight - 200]}
                        initialSnapIndex={2}
                        renderHandle={() => (
                            <View style={styles.header}>
                                <View style={styles.panelHandle}><Text>{house?.name}</Text></View>
                            </View>
                        )}
                        data={Array.from({ length: 200 }).map((_, i) => String(i))}
                        keyExtractor={i => i}
                        renderItem={({ item }) => (
                        <View>
                            <View  style={{flexDirection: 'row' ,alignItems: "center", justifyContent: "center", margin: 5, padding: 3, marginTop: 25}}>
                            <View> 
                                <Image source={{uri :house?.photo}}
                                        resizeMode='cover'
                                        style={{
                                            width: 78,
                                            height: 70,
                                            borderRadius: 15
                                        }}
                                />
                            </View>
                            <View style={{marginHorizontal: 10, justifyContent: "space-around"}}>
                                <Text>{house?.name}</Text>
                                <Text>textButtonSignup</Text>

                                <StarReview 
                                    rate={house?.rating}/>
                            </View>
                            </View>
                            <View style={{flex: 1.5}}>
                            <View style={{flexDirection: "row", marginTop: 25, paddingHorizontal: 10, justifyContent: "space-between",marginLeft: 25, marginRight: 15}}>
                                <View style={{alignItems :'center'}}>
                                <Image source={require('../asset/images/room.png')}
                                    resizeMode='center' style={{width: 50, height: 50}}
                                /> 
                                <Text>{house?.room} Room</Text>
                                </View>
                                <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15}}>
                                <Image source={require('../asset/images/degree.png')} resizeMode='center' style={{width: 50, height: 50}}/>
                                    <Text>{house?.degre} Degree</Text>
                                </View>
                                <View style={{ marginTop: 5, paddingHorizontal: 10,marginLeft: 15, marginRight: 15}}>
                                <Image source={require('../asset/images/parking.png')} resizeMode='center' style={{width: 50, height: 50}}/>
                                </View>
                            </View>
                            <View style={{marginTop: 10, paddingHorizontal: 10, marginLeft: 25}}>
                                <Text style={{fontSize: 30, fontWeight: 'bold', color: "#0AC4BA"}}>About</Text>
                                <Text style={{marginTop: 10, fontSize: 20,}}>
                                C'est une maison avec un étage. Au rez-de-chaussée, il y a une chambre, une cuisine, une salle de bains, un salon et une salle à manger. Dans la chambre, il y a un lit, un radiateur, une table de nuit, un placard, un bureau et une chaise
                                </Text>
                            </View>
                            </View> 
                            <View style={{ flex: 0.5, paddingHorizontal: 5, marginTop: 15,  marginRight: 25, marginLeft: 25}}>
                <LinearGradient
                    style={[{ height: 50, width: '100%', borderRadius: 15 }]}
                    colors={['#edf0fc', '#d6dfff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center' }}>
                            <Text>{house?.price} DNT/Nuit</Text>
                        </View>

                        <TouchableOpacity
                            style={{ width: 130, height: '80%', marginHorizontal: 5 }}
                            onPress={() => navigation.navigate('Search')}
                        >
                            <LinearGradient
                                style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }]}
                                colors={["#0AC4BA", "#2BDA8E"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={{color: "#fff"}}>BOOKING</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
                        </View>
                            )}
                        contentContainerStyle={styles.contentContainerStyle}
                        />
                        </View>
        )
    }

    const styles = StyleSheet.create({
        image: {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            resizeMode: "cover"
        },
        pagination: {
            position: 'absolute',
            top: ITEM_HEIGHT / 2,
            left: 20
        },
        dot : {
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: '#0AC4BA',
            marginBottom: 8
        },
        dotIndicator : {
            width: 16,
            height: 16,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: '#0AC4BA',
            position: 'absolute',
            top: -8/2,
            left: -8/2
        }, contentContainerStyle: {
            backgroundColor: '#F3F4F9',
          },
          header: {
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          panelHandle: {
            width: "100%",
            height: 10,
            borderRadius: 4,
            justifyContent: "center",
            alignItems: 'center',

          },
          item: {
            padding: 20,
            marginVertical: 10,
          },
    })

export default Houses