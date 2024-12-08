import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const steps = [
    { id: '1', description: 'Preheat the oven to 220°C (430°F).' },
    { id: '2', description: 'Roll out the pizza dough and place it on a baking tray.' },
    { id: '3', description: 'Spread the tomato sauce over the dough evenly.' },
    { id: '4', description: 'Add toppings: mozzarella, pepperoni, and any other favorites.' },
    { id: '5', description: 'Bake in the oven for 10-15 minutes until golden and bubbly.' },
    { id: '6', description: 'Remove the pizza from the oven and let it cool for a few minutes.' },
    { id: '7', description: 'Slice the pizza and serve hot.' },
];

const reviews = [
    { id: '1', name: 'Valentino Rossi', review: 'Amazing recipe, thank you!!', rating: 5, avatar: require('../assets/pp/yoasobi.jpg') },
    { id: '2', name: 'Carlo', review: 'Amazing recipe, thank you!!', rating: 5, avatar: require('../assets/pp/Scream.jpg') },
    { id: '3', name: 'Enzo Ririri', review: 'Amazing recipe, thank you!!', rating: 5, avatar: require('../assets/pp/lean.jpg') },
];

const screenWidth = Dimensions.get('window').width;

export default function RecipeScreen({ navigation }) {
    const recipe = {
        name: 'Pizza',
        difficulty: 'Hard',
        rating: 4.5,
        reviews: 2,
        description:'A delicious, crispy crust topped with melted cheese, tangy tomato sauce, and fresh ingredients like pepperoni, mushrooms, and peppers. A crowd-pleasing favorite!',
        ingredients: [
            { id: '1', name: 'pizza dough', checked: true },
            { id: '2', name: 'cup tomato sauce', checked: true },
            { id: '3', name: 'cup mozzarella cheese', checked: true },
            { id: '4', name: 'slices pepperoni', checked: true },
            { id: '5', name: 'teaspoon dried oregano', checked: false },
            { id: '6', name: 'teaspoon salt', checked: true },
        ],
        image: require('../assets/pizza.jpg'),
        method: steps, 
    };

    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardOffset(e.endCoordinates.height); 
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffset(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const toggleIngredient = (id) => {
        setIngredients((prevIngredients) =>
            prevIngredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, checked: !ingredient.checked } : ingredient
            )
        );
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const contentWidth = event.nativeEvent.contentSize.width;
        const screenWidth = event.nativeEvent.layoutMeasurement.width;
        
        const maxOffset = contentWidth - screenWidth;
        const progressPercent = (contentOffsetX / maxOffset) * 100;
        setProgress(progressPercent);
    };

return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>


        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
            <Image source={recipe.image} style={styles.recipeImage} />

            <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{recipe.rating} ({recipe.reviews}+)</Text>
                    <Text style={styles.reviewLink} onPress={() => setModalVisible(true)}>See reviews</Text>
                </View>
                <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </View>

            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((item) => (
                <TouchableOpacity key={item.id} style={styles.ingredientItem} onPress={() => toggleIngredient(item.id)}>
                    <FontAwesome name={item.checked ? 'check-square' : 'square-o'} size={20} color="#6C63FF" />
                    <Text style={styles.ingredientText}>{item.name}</Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Cook Progress</Text>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.sectionTitle}>Method</Text>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                style={styles.horizontalFlatList}
                scrollEventThrottle={16}
            >
                {recipe.method.map((step) => (
                    <View key={step.id} style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Step {step.id}</Text>
                        <Text style={styles.stepText}>{step.description}</Text>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <TouchableOpacity activeOpacity={1} style={[styles.modalContainer, { marginBottom: keyboardOffset }]}>
                        <Text style={styles.modalTitle}>Reviews ({reviews.length})</Text>
                        {reviews.map((item) => (
                            <View key={item.id} style={styles.reviewContainer}>
                                <Image source={item.avatar} style={styles.avatar} />
                                <View style={styles.reviewContent}>
                                    <Text style={styles.reviewerName}>{item.name}</Text>
                                    <Text style={styles.reviewText}>{item.review}</Text>
                                    <View style={styles.ratingContainer}>
                                        {[...Array(item.rating)].map((_, index) => (
                                            <FontAwesome key={index} name="star" size={14} color="#FFD700" />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={keyboardOffset + 20}
                        >
                            <View style={styles.addReviewContainer}>
                                <TextInput
                                    placeholder="Write your own review"
                                    placeholderTextColor="#B0B0B0"
                                    style={styles.input}
                                />
                                <TouchableOpacity style={styles.sendButton}>
                                    <FontAwesome name="paper-plane" size={20} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    </View>
    );
}
    
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0d0d1f',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30, 
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 25,
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    recipeImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginTop: 20,
    },
    difficultyBadge: {
        position: 'absolute',
        top: 210,
        left: 20,
        backgroundColor: '#EF4444',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 5,
    },
    difficultyText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    recipeName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingText: {
        marginLeft: 5,
        color: '#FFFFFF',
        fontSize: 16,
    },
    reviewLink: {
        color: '#6C63FF',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientText: {
        marginLeft: 10,
        color: '#FFFFFF',
        fontSize: 16,
    },
    stepContainer: {
        width: screenWidth -60,
        padding: 20,
        backgroundColor: '#1A1A3B',
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A3E635',
        marginBottom: 10,
    },
    stepText: {
        color: '#B0B0B0',
        fontSize: 16,
        textAlign: 'center',
    },
    horizontalFlatList: {
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#2E2E3A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    reviewText: {
        color: '#B0B0B0',
        fontSize: 14,
    },
    addReviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#3A3A4A',
        color: '#FFFFFF',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#6C63FF',
        padding: 10,
        borderRadius: 20,
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 15,
    },
    closeButtonText: {
        color: '#6C63FF',
        fontSize: 18,
    },
    progressBarBackground: {
        height: 10,
        width: '100%',
        backgroundColor: '#3A3A4A',
        borderRadius: 5,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6C63FF',
        borderRadius: 5,
    },
    recipeDescription: {
        color: '#B0B0B0',
        fontSize: 16,
        marginTop: 8,
        textAlign: 'justify',
    },
});
