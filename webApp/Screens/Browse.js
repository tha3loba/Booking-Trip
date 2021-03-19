import React,{useEffect,useState} from 'react';
import {
  Image,
  Text,
  Button,
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  ImageBackground, 
  FlatList, 
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { mocks } from "../data/Data";
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)


const Browse = ({ navigation }) => {

    const CategoriesData = [
      {
        id: 1,
        name: "+ Trend",
        source: require('../asset/images/trending.png')
      },
      {
        id: 2,
        name: "+ Price",
        source: require('../asset/images/expensive.png')
      },
      {
        id: 5,
        name: "Villa",
        source: require('../asset/images/villa.png')
      },
      {
        id: 3,
        name: "- Price",
        source: require('../asset/images/low-prices.png')
      },
      {
        id: 7,
        name: "Bureau",
        source: require('../asset/images/employee.png')
      },
      {
        id: 4,
        name: "- Trend",
        source: require('../asset/images/trend.png')
      },
    ]


    // Price Rating 
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const houseData = [   
  {
    id: 1,
    name: "Appartement",
    rating: 4.9,
    degre: 24,
    room: 2,
    apropos: "S + 3",
    priceRating: "expensive",
    categories: [1, 4],
    photo:"https://cometrip-prod.fra1.digitaloceanspaces.com/media/463b4426bdb73512e67806a53b26f9e8251abd11.jpeg",
    description: "Appartement très bien équipé",
    price: 1200,
    images : [
      "https://cometrip-prod.fra1.digitaloceanspaces.com/media/47d3f11a5879aa081329fef53324b1d8ff5e870e.jpeg",
      "https://cometrip-prod.fra1.digitaloceanspaces.com/media/08da98409b7389c1b7dac64d69e239e28a2d6abd.jpeg"
    ],
    equipements : [
        "climatiseur",
        "Wifi",
        "Eau chaude",
        "Micro onde",
        "Cuisine extérieur",
        "TV cablée",
        "Machine à café"
      ]
  }

,
  {
    id: 2,
    name: "Dar MAJED : maison pied dans l’eau à Kelibia",
    rating: 5.0,
    degre: 28,
    room: 6,
    apropos: "S + 2",
    priceRating: "expensive",
    categories: [2, 3],
    photo:"https://a0.muscache.com/im/pictures/f0d7d147-ae37-4aa3-aee6-542cab539275.jpg?im_w=1200",
    description: "Ce qui rend ce logement unique c’est l’espace , plus de 10 personnes peuvent y séjourner ,son somptueux emplacement ( voir les photos ) la table au bord de l eau vous offrira des déjeuners en famille ou entre amis inoubliables . La maison est très conviviale .Ps  service de nettoyage quotidien inclus dans le prix",
    price: 3000,
    images : [
      "https://a0.muscache.com/im/pictures/8cbf5030-10bf-47f7-a5f0-14af666d691e.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/1eec2fd0-0fe5-49a6-b99e-a993746f148d.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/d98c64f9-bf5e-4a35-bd19-1d5e2bd4a2bf.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/2ab77551-cb16-4cc6-be03-3b25c78551d6.jpg?im_w=1200"
    ],
    equipements : [
        "Parking gratuit sur place",
        "Espace de travail dédié",
        "Fer à repasser",
        "Wifi",
        "Détecteur de fumée"
      ]  
  }

,
  {
    id: 3,
    names: "Charmant Appartement au coeur de La Marsa",
    rating: 4.8,
    degre: 25,
    room: 1,
    apropos: "S + 5",
    priceRating: "expensive",
    categories: [7, 6],
    photo:"https://a0.muscache.com/im/pictures/7e91ac40-8601-48f9-9a87-cbee2c3727d4.jpg?im_w=960",
    description: "Appartement refait à neuf au coeur de La Marsa, au 3ème étage avec ascenseur, très lumineux et sans vis à vis. A 20 min de l'aéroport, 10 min à pied de la gare ferroviaire.Emplacement idéal à 7 min à pied de la plage et proche de toutes les commodités; supermarchés, marché municipal, cafés, restaurants, boulangeries...Vous pourrez profiter du parc de La Marsa qui se trouve a 1min de l'appartement.",
    price: 2000,
    images : [
      "https://a0.muscache.com/im/pictures/c3f96178-bbdc-4d89-bc32-86c2e7dc337f.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/86aafb07-8cd9-44e6-b098-116551b9ae5e.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/0a19fefe-b039-405d-aec7-94b300af1368.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/9c29cc77-2173-4a80-a015-83b3bb9f26b6.jpg?im_w=1200"
    ],
    equipements : [
        "Équipements de base",
        "Télévision par câble",
        "Wifi",
        "Cintres"
      ]  
  }
,
  {
    id: 4,
    name: "Luxury Loft LILAS, Ennasr2, Tunis, Airport",
    rating: 4.2,
    degre: 20,
    apropos: "S + 2",
    room: 2,
    priceRating: "affordable",
    categories: [1, 4],
    photo:"https://a0.muscache.com/im/pictures/miso/Hosting-46549191/original/f527f90c-6251-4adc-a751-f56df307d56a.jpeg?im_w=960",
    description: "Un très bel Appartement, Rénové avec passion, situé dans une résidence calme LILAS sur l'avenue principale Hedi Nouira, Ennasr 2, un des plus luxueux quartiers de Tunis, très animé et surtout très sécuritaire, un quartier bien animé 24/7, près de tous les commodités, peut accueillir jusqu'à 5 personnes.Bref un petit paradis pour votre séjour !!",
    price: 1500,
    images : [
      "https://a0.muscache.com/im/pictures/miso/Hosting-46549191/original/0e06ac15-606b-4458-8388-e86d7b17a09a.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46549191/original/70a31121-1610-4fe5-b844-0b0ab6ea8702.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46549191/original/d2850fe8-ad60-4f3b-b92c-8cdf3f6a0887.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-46549191/original/ebd00d73-7301-4429-bd45-d231a222bfda.jpeg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Fer à repasser",
        "Allée de stationnement gratuite sur place : 10 place",
        "Sèche-cheveux"
      ]  
  }
,

  {
    id: 5,
    name: "Magical private house with a beautiful view - Bizerte",
    rating: 4.8,
    degre: 28,
    room: 3,
    apropos: "S + 3",
    priceRating: "affordable",
    categories: [5, 4],
    photo:"https://a0.muscache.com/im/pictures/da8133ee-16fa-4aa9-a82b-ba813b3d1d59.jpg?im_w=960",
    description: "Welcome to Our luxury house.This is a modern house, three private rooms with a slide open a wall of glass to a pool overlooking the stunning forest Within walking distance to the White Cape (Cap Blanc). Our home is nestled down a quiet road, so you can escape the crowd of the city center and retreat into your own personal space.",
    price: 1800,
    images : [
      "https://a0.muscache.com/im/pictures/4706a0ce-c620-45b0-98d2-32cb90f5313f.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/814a6596-135e-42ff-83ff-27443943a294.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/ef68dd18-5ff3-46a1-9f79-01b7964e3be9.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/893f4638-1422-4a7e-986f-8742238faf2f.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Piscine",
        "Parking gratuit dans la rue",
        "Chauffage"
      ]  
  }

,
  {
    id: 6,
    name: "DAR BOUTOU",
    rating: 3.9,
    degre: 21,
    room: 2,
    priceRating: "fairPrice",
    apropos: "S + 3",
    categories: [2, 3],
    photo:"https://a0.muscache.com/im/pictures/f162d505-dcdc-48f4-841d-f699d401994b.jpg?im_w=960",
    description: "Il s'agit d'un charmant S+2 situé dans une rue calme à 2 minutes de marche de la station du train Sidi Bou Said, à 5 minutes à pied du village , 13 km de l'aéroport de Tunis Carthage et à 30 minutes (en train) de la Médina.",
    price: 1000,
    images : [
      "https://a0.muscache.com/im/pictures/c87835b0-be58-47a6-8c57-67c967d37f48.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/e64ca0b7-84c4-4650-887e-1576796f4cd2.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/3058f330-3be0-4988-a30e-485bebc0e7db.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/bf6949cf-a055-436e-9e6c-72a0818938af.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Climatisation",
        "Chauffage",
        "Salle d'eau avec douche"
      ]  
  }

,
  {
    id: 7,
    name: "apartment with roof terrace second floor sea view - Marsa",
    rating: 4.8,
    degre: 22,
    room: 2,
    priceRating: "fairPrice",
    apropos: "S + 3",

    categories: [3, 4],
    photo:"https://a0.muscache.com/im/pictures/45917b43-cea5-4c26-a73a-40d562e0b9cf.jpg?im_w=960",
    description: "Logement entier S+ 2 Tres sympa en face de la mer au deuxième étage très bien équipé avec un petit déjeuner inclus Un logement magic avec sa vue unique Ou Le calm et la tranquillité sont au rendez vous",
    price: 1400,
    images : [
      "https://a0.muscache.com/im/pictures/d0071757-7799-474c-b231-9a56e32c9528.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/d6435076-0d61-4542-9b3f-7b3ace928bd8.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/c2b34dd8-ab3e-440b-8ba4-a99e1a3fe790.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Climatisation",
        "Chauffage"
      ]  
  }
,
  {
    id: 8,
    name: "Modern Studio with a Tunisian Touch - Menzah 9",
    rating: 4.6,
    degre: 25,
    room: 2,
    apropos: "S + 3",
    priceRating: "fairPrice",
    categories: [1, 2],
    photo:"https://a0.muscache.com/im/pictures/0ff1eee3-0283-44f0-b9c2-cb2a00fcbb41.jpg?im_w=960",
    description: "Très joli studio indépendant de 20 m ² dans une résidence privée à Menzah 9. Toutes les installations à proximité (commerces, restaurant, salle de sport, taxi et transports publics, cliniques...). Idéal pour: couple avec un enfant, pour de courtes périodes, professionnel unique, pour un bail longue durée.",
    price: 1000,
    images : [
      "https://a0.muscache.com/im/pictures/a3ecaa50-197b-40fc-be81-378ab3d7adee.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/5a548374-2068-43b3-914b-150951c5cd90.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/4e24a8e2-0419-4d65-aff3-117532f6b21c.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/827ceb98-78bc-4528-8a72-60a71e8be5dd.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Équipements de base",
        "Chauffage"
      ]  
  }

,

  {
    id: 9,
    name: "Little sea View in la Marsa beach!",
    rating: 4.1,
    degre: 5,
    room: 1,
    apropos: "S + 1",
    priceRating: "",
    categories: [1, 7],
    photo:"https://a0.muscache.com/im/pictures/e5909fb9-a9cc-4748-98c7-22a09bbde66f.jpg?im_w=960",
    description: "The studio is an s+0 unit with one room plus a separate, small bathroom (toilet, wash basin and shower). A balcony where you can sit and stare at the ocean.",
    price: 1200,
    images : [
      "https://a0.muscache.com/im/pictures/bd8294d0-6520-4996-ac34-581c8fdab32c.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/1e21b537-80a8-4d90-be7a-b9dd8751316d.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/a51cea9a-ea8b-4697-af1e-b37760e93c41.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Équipements de base",
        "Chauffage"
      ]  
  }
,

  {
    id: 10,
    name: "S1 vue sur le Port de Kelibia",
    rating: 4.9,
    degre: 28,
    room: 1,
    apropos: "S + 1",
    priceRating: "expensive",
    categories: [1, 2],
    photo:"https://a0.muscache.com/im/pictures/3f95b986-3ede-4882-a2f3-2b43826ae589.jpg?im_w=1200",
    description: "Un coquet S+1 avec vue sur le Port de Kelibia. Front de mer,ce petit studio vous charmera. Idéal pour un couple ou deux amis, pour les amoureux de la mer et la pêche. Il se compose d'une cuisine aménagée et équipée (plaque frigo machine à café,bouilloire ect)style arabesque avec coin repas vue sur mer.Une chambre à coucher au sous sol avec placards.",
    price: 1900,
    images : [
      "https://a0.muscache.com/im/pictures/2d72e45a-c726-4143-b90b-9a2095b663ff.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/faf6b140-e967-41e1-98c2-0c511fa3cd99.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/f040d118-3a1a-4323-a357-54f0149665e8.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Équipements de base",
        "Chauffage",
        "Climatisaion"
      ]  
  },

  {
    id: 11,
    name: "Charmante maison sur la plage - Dar Allouche",
    rating: 4.8,
    degre: 25,
    room: 4,
    apropos: "S + 2",
    priceRating: "expensive",
    categories: [5, 7],
    photo:"https://a0.muscache.com/im/pictures/100716150/1d0f8719_original.jpg?im_w=960",
    description: "Charmante maison spacieuse, rénovée en 2015, bien équipée (2 cuisines, 2 sdb, grand jardin, cheminée...) en première position sur une belle plage de sable,   proche de toutes les commodités et très facilement accessible par la route Kélibia-Haouraia",
    price: 2500,
    images : [
      "https://a0.muscache.com/im/pictures/b97a8623-1ab9-4083-a2a0-8af314594808.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/100565925/70fba46a_original.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/100565488/4e27cc07_original.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/100715502/fc5e3e59_original.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Espace de travail dédié",
        "Fer à repasser",
        "Détecteur de fumée"
      ]  
  },

  {
    id: 12,
    name: "Relaxing nature Studio epic Views PRIVATE POOL - Zaghouan",
    rating: 4.9,
    degre: 25,
    room: 2,
    apropos: "S + 2",
    priceRating: "expensive",
    categories: [3, 4],
    photo:"https://a0.muscache.com/im/pictures/769da1b8-c76c-41f3-add7-5c3c91e3bb01.jpg?im_w=960",
    description: "Welcome to our Sublime Studio located in the heart of the nature. Enjoy the most relaxing and peaceful experience",
    price: 1800,
    images : [
      "https://a0.muscache.com/im/pictures/9a190dd7-c260-4580-abc8-99604537dae7.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/a059e44f-2541-4d10-822c-bb44801cfc18.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/8e8eccbd-3995-4e7d-8be3-54f7ed0d72c9.jpg?im_w=1200"
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Chauffage",
        "Climatisaion"
      ]  
  }
,
  {
    id: 13,
    name: "  It have a wonderful view enjoy eating in balcony",
    rating: 3.6,
    degre: 25,
    room: 2,
    priceRating: "expensive",
    categories: [3, 4],
    photo:"https://a0.muscache.com/im/pictures/dba51f56-1812-4096-b9fe-3dc9deec105c.jpg?im_w=1200",
    description: "",
    price: 1200,
    apropos: "S + 2",
    images : [
      "https://a0.muscache.com/im/pictures/bd794914-2e3c-4d90-ba2b-cc2408637066.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/5e55bd03-aec7-4b47-9ef9-c1522d2c55d5.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/d3706c91-84d3-4881-8c52-615185692d38.jpg?im_w=960",
    ],
    equipements : [
        "Wifi",
        "Parking gratuit sur place",
        "Chauffage",
        "Climatisaion"
      ]  
  }
    ]

    const [categories, setCategories] = React.useState(CategoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [houses, setHouses] = React.useState(houseData);

    function onSelectCategory(category) {
      //filter house
      let houseList = houseData.filter(a => a.categories.includes(category.id))

      setHouses(houseList)

      setSelectedCategory(category)
  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id)

    if (category.length > 0)
        return category[0].name

    return ""
}


   const [email,setEmail] = useState("loading")

//    const Boiler = async () => {
//    const token = await AsyncStorage.getItem("token")
//     let response = await fetch('http://10.0.2.2:5000/api/users/login-user',{
//     headers: {
//       Authorization: token
//     }
//     })
//     let json = await response.json()
//       return setEmail(json.email)
  
//    }
// useEffect(()=>{
//    Boiler()
// },[])

   const logout = () => {
        AsyncStorage.removeItem("token").then(()=>{
        navigation.replace("Home")
      })
   }

   function renderHeader() {
     return (
       <View style={{flexDirection: "row", height: 50, paddingLeft: 15, margin: 20}}>
          <Image source={require("../asset/images/nearby.png")} style={{width: 30, height: 30}}></Image>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <View style={{
              width: "50%",
              height: "100%",
              alignItems: "center", justifyContent: "center", borderRadius: 5
            }}>
              <Text style={{color: "#0AC4BA", fontSize: 25}}>Houses</Text>
            </View>
          </View>
          <TouchableOpacity  onPress={() => logout()} style={{marginTop: 10 , marginLeft: 17}}>
           <FontAwesome
             name="power-off"
             size={20}
             color="#0AC4BA"
           />
         </TouchableOpacity>
       </View>
     )
   }

  
    function renderMainCategories() {
      const renderItem = ({ item }) => {
        return (
          <TouchableOpacity
              style={{
                padding: 12,
                paddingBottom: 20,
                backgroundColor: (selectedCategory?.id == item.id) ? "#0AC4BA" : "#fff",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                ...styles.shadow
            }}
                    onPress={() => onSelectCategory(item)}>
                      <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? "FFF" : "#FFF"
                        }}
                    >
                        <Image
                            source={item.source}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            marginTop: 20,
                            color: (selectedCategory?.id == item.id) ? "#FFF" : "#C5CCD6",
                        }}
                    >
                       {item.name}
                    </Text>
                    </TouchableOpacity>
        ) 
      }
      return (
        <View style={{ padding: 10 }}>
            <Text style={{fontFamily: "Roboto-Black", fontSize: 30, lineHeight: 36, textAlign: "center"}}>Main Categories</Text>
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
        </View>
    )
    }
    function renderHouseList() {

      const y = new Animated.Value(0)
      const onScroll = Animated.event([{ nativeEvent : { contentOffset: { y } }}], { useNativeDriver: true})
      const renderItem = ({ item }) => (
        <AnimatedTouchableOpacity
            key={item.id}
            scrollEventThrottle={16}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate("Houses", {
                item,
            })}
            {...{onScroll}}
        >
         
            <View style={{marginBottom: 20}} >
                <Image
                    source={{uri: item.photo}}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 25
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: 50,
                        width: 50,
                        backgroundColor: "#FFF",
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                >
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: 18, lineHeight: 22 }}>{item.apropos}</Text>
                </View>
            </View>

            
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 30 }}>{item.name}</Text>

            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row'
                }}
            >
              
                <Image
                    source={require('../asset/images/star.png')}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: "#0AC4BA",
                        marginRight: 10
                    }}
                />
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: 13, lineHeight: 22 }}>{item.rating}</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: 10
                    }}
                >
                    {
                        item.categories.map((categoryId) => {
                            return (
                                <View
                                    style={{ flexDirection: 'row' }}
                                    key={categoryId}
                                >
                                    <Text style={{ fontFamily: "Roboto-Regular", fontSize: 13, lineHeight: 22 }}>{getCategoryNameById(categoryId)}</Text>
                                    <Text style={{ fontFamily: "Roboto-Regular", fontSize: 13, lineHeight: 22, color: "#C5CCD6" }}> . </Text>
                                </View>
                            )
                        })
                    }
                    {
                        
                            <Text
                                
                                style={{
                                    fontFamily: "Roboto-Regular", fontSize: 13, lineHeight: 22,
                                    color:  "#0AC4BA"
                                }}
                            >${item.price}</Text>
                        
                    }
                </View>
            </View>
        </AnimatedTouchableOpacity>
    )

    return (
        <FlatList
            data={houses}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 30
            }}
        />
    )
}
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderHouseList()}
    </SafeAreaView>
    )
  }
export default Browse;

      const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F9"
    }, 
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1
    }
  })
