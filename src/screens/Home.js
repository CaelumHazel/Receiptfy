import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ref, onValue, get } from 'firebase/database'; // Import Firebase
import { db } from '../../firebaseConfig';

const maybeYouLikeRecipes = [
  {
    id: '7',
    name: 'Avocado Salsa',
    author: 'Melvin Tenggara',
    description: 'In a few steps, you’ll be able to cook a delicious Avocado Salsa. It’s easy and simple, enjoy!',
    difficulty: 'Easy',
    image: require('../assets/salsa.jpg'),
  },
  {
    id: '8',
    name: 'Macaroni and Cheese',
    author: 'Yahya Ruhyan',
    description: 'In a few steps, you’ll be able to cook a delicious Macaroni and Cheese. Enjoy!',
    difficulty: 'Hard',
    image: require('../assets/mac.jpg'),
  },
  {
    id: '9',
    name: 'Ayam Betutu',
    author: 'Mamatmanja',
    description: 'In a few steps, you’ll be able to cook a delicious Macaroni and Cheese. Enjoy!',
    difficulty: 'Hard',
    image: require('../assets/betutu.jpg'),
  },
];

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesRef = ref(db, 'recipes');
        const snapshot = await get(recipesRef);
    
        if (snapshot.exists()) {
          const recipesData = snapshot.val();
          const updatedRecipes = Object.keys(recipesData).map((key) => ({
            id: key,
            ...recipesData[key],
          }));
    
          setRecipes(updatedRecipes);
        } else {
          console.log("No recipes found.");
          setRecipes([]); // Set data kosong jika tidak ada
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        setRecipes([]); // Set data kosong jika ada error
      }
    };; 
    fetchRecipes();
  }, []);
  
  const displayedRecipes = showAll ? recipes : recipes.slice(0, 4);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detail', {id: item.id})}
    >
      <Image 
        source={item.image ? { uri: item.image } : require('../assets/pp/beam.jpg')} 
        style={styles.cardImage} 
      />
      <Text style={[styles.difficultyBadge, styles[`badge${item.difficulty}`]]}>
        {item.difficulty}
      </Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.duration}>Estimate: {item.duration}</Text>
        <Text style={[styles.status, styles[`status${item.status.replace(" ", "")}`]]}>
          {item.status}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating} ({item.reviews}+)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  const renderMaybeYouLikeItem = ({ item }) => (
    <TouchableOpacity style={styles.maybeYouLikeCard}>
      <Image source={item.image} style={styles.maybeYouLikeImage} />
      <View style={styles.maybeYouLikeContent}>
        <Text style={[styles.difficultyBadge, styles[`badge${item.difficulty}`]]}>{item.difficulty}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Implementasi logout sesuai kebutuhan
    console.log('Logout');
    navigation.replace('Login'); // Contoh navigasi ke halaman login
  };

  return (
    <View style={styles.container}>
      {/* Navbar - Locked at the top */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Navbar</Text>
      </View>
      <View style={styles.header}>
          <Image source={require('../assets/unnamed.jpg')} style={styles.profileImage} />
          <Text style={styles.welcomeText}>Hello Djuanda</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={24} color="#6C63FF" />
        </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#999" />
          <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
          <Text style={styles.cancelText}>Cancel</Text>
        </View>

      <ScrollView 
      style={styles.mainContent} 
      showsVerticalScrollIndicator={false}>
      
        
      <Text style={styles.sectionTitle}>Trending Search</Text>
        <View style={styles.trendingContainer}>
          {['Burgers', 'Brunch', 'Breakfast', 'Pizza', 'Chef'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.trendingButton}>
              <Text style={styles.trendingText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recommendation</Text>
        {/* Flatlist dan Scrollview kalau ditumpuk bakal error tapi error ini hanya akan terjadi kalo di web */}
        {/* Kalo di mobile tidak terlalu berpengaruh untuk scroll nya */}
          
        <FlatList
          data={displayedRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        /> 

        <TouchableOpacity style={styles.viewMoreButton} onPress={() => setShowAll(!showAll)}>
          <Text style={styles.viewMoreText}>{showAll ? 'View Less' : 'View More'}</Text>
        </TouchableOpacity>

      {/* "Maybe You Like"  */}
      <Text style={styles.sectionTitle}>Maybe You Like</Text>
      <FlatList
        data={maybeYouLikeRecipes}
        renderItem={renderMaybeYouLikeItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.maybeYouLikeContainerVertical} 
      />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="home" size={20} color="#6C63FF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="search" size={20} color="#999" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="heart" size={20} color="#999" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>``
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MapScreen')}>
          <FontAwesome name="map" size={20} color="#999" />
          <Text style={styles.navText}>Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: '#0d0d1f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a3b',
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: '#fff',
  },
  cancelText: {
    color: '#999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 8,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  trendingButton: {
    backgroundColor: '#2a2a50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  trendingText: {
    color: '#ccc',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1A1A3B',
    borderRadius: 16,
    paddingBottom: 16,
    overflow: 'hidden', 
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9,
    fontSize: 10,
    color: '#fff',
    overflow: 'hidden',
  },
  badgeEasy: {
    backgroundColor: '#A3E635',
    fontWeight:'bold',
  },
  badgeMedium: {
    backgroundColor: '#FBBF24',
    fontWeight:'bold',
  },
  badgeHard: {
    backgroundColor: '#EF4444',
    fontWeight:'bold',
  },
  cardContent: {
    padding: 10,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },
  duration: {
    fontSize: 12,
    color: '#ccc',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusNotStarted: {
    color: '#FF5555',
  },
  statusOnProgress: {
    color: '#FFAA00',
  },
  statusCooked: {
    color: '#A3E635',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#fff',
  },
  maybeYouLikeContainerVertical: {
    marginVertical: 12,
  },
  maybeYouLikeCard: {
    width: screenWidth - 400, // Sesuaikan dengan margin horizontal
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#1A1A3B',
    borderRadius: 16,
    overflow: 'hidden',
  },
  maybeYouLikeImage: {
    width: '100%',
    height: 150, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  maybeYouLikeContent: {
    padding: 30,
  },
  author: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#ccc',
  },
  viewMoreButton: {
    alignSelf: 'center',
    width: 120,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    marginVertical: 20,
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#0d0d1f',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
  },
  logoutButton: {
    position: 'center',
    left: 170,
    zIndex: 10,
  },
});
