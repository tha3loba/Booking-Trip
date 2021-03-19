import * as React from "react"
import { Dimensions, StatusBar, View, Text, FlatList, Image, StyleSheet , Animated, TouchableOpacity} from "react-native";
import  LinearGradient  from "react-native-linear-gradient"

const { width, height } =  Dimensions.get('screen');

const data = [
    'data:image/jpeg;base64,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'
    ,'data:image/jpeg;base64,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'
    ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstIg0vdbW7sDK2RAlVxUobognzn93x8tzxA&usqp=CAU'
]


const imageW = width * 0.7;
const imageH = imageW * 1.54;

const Home = ({ navigation }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return(
        <View style={{ flex: 1, backgroundColor: "#000"}}>
         
            <StatusBar hidden/>
            <View
                style={StyleSheet.absoluteFillObject}
            >
                
                {
                    data.map((image, index) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1 ) * width
                        ]

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        })
                        return <Animated.Image 
                                key={`image-${index}`}
                                source={{uri: image}}
                                style={[
                                    StyleSheet.absoluteFillObject, {
                                        opacity
                                    }
                                ]}
                                blurRadius={1}
                        />
                    })
                }
                
            </View>
            <View style={styles.container}>
                    <Text style={styles.titles}>Booking-
                        <Text style={styles.titleGreen}>Trip</Text>
                    </Text>
                        <Text style={styles.description}>Enjoy the experience ...</Text>
                        
                </View>
            <Animated.FlatList 
                data={data}
                onScroll={Animated.event([{nativeEvent: { contentOffset: {x: scrollX}}}], { useNativeDriver: true})} 
                horizontal
                pagingEnabled
                style={{marginTop: 60}}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => {
                    return <View style={{
                            width, 
                            justifyContent: 'center', 
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOpacity: 1,
                            shadowOffset: {
                                width: 0,
                                height: 0
                            },
                            shadowRadius: 20    
                        }}>
                        <Image 
                            source={{uri: item}}
                            style={{
                                width: imageW,
                                height: imageH,
                                resizeMode: 'cover',
                                borderRadius: 16
                        }}/>
                       </View> 
                }}
            />
           <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                    <LinearGradient
                    style={styles.loginButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.1, 0.9]}
                        colors={["#0AC4BA", "#2BDA8E"]}
                    >
                    <Text style={styles.textButton}>Login</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={styles.signupButton}
                            onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.textButtonSignup}>SignUp</Text>
                    </TouchableOpacity>
                   
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    titles: {
        marginTop: 0,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: "#fff"
    },
    titleGreen: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#0AC4BA"
    },
    description: {
        fontSize: 20,
        color: 'black',
        marginTop: 10
    },
    title: {
        alignItems: 'center',
        color: "#FFFFFF",
        fontSize: 20
    },
    buttonContainer: {
        // flex: 0.5,
        marginTop: 30,
        alignItems: "center",
    },
    loginButton: {
        borderRadius: 6,
        opacity: 0.8,
        width: 290,
        height: 55,
        justifyContent: "center",
        marginBottom: 10
    },
    textButton: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 22,
    },
    textButtonSignup: {
        textAlign: "center",
        color: "#323643",
        fontSize: 20,
    },
    signupButton : {
        backgroundColor: "#FFFFFF",
        shadowColor: 6,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 6,
        width: 290,
        height: 55,
        justifyContent: "center",
        marginBottom: 15
    },
    TermsButton: {
        justifyContent: "center",
        marginTop: 5,
        color: "#9DA3B4",
        height: "17%",
        width: "70%",
        width: 290,
        height: 55,
    },
    textButtonOfService: {
        textAlign: "center",
        color: "#9DA3B4",
        fontWeight: '600'
    },
    stepContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
  })

export default Home