import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const { recipe } = route.params || {}; // Pass the recipe object as a parameter
    console.log('recipe', recipe);

    const favoriteRecipes = useSelector(
        (state) => state.favorites.favoriterecipes
    );
    console.log('favoriteRecipe from custom', favoriteRecipes);

    const isFavourite = favoriteRecipes.some((fav) => fav.idFood === recipe.idFood); // Check if the recipe is favorite

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No Recipe Details Available</Text>
            </View>
        );
    }

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(recipe)); // Toggle the recipe's favorite status
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent} testID="scrollContent"
        >
            {/* Recipe Image */}
            <View style={styles.imageContainer} testID="imageContainer">
                {recipe.image && (
                    <Image
                        source={{ uri: recipe.image }}
                        style={styles.recipeImage}
                    />
                )}
            </View>

            {/* Top Buttons Container */}
            <View style={styles.topButtonsContainer} testID="topButtonsContainer">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleToggleFavorite}
                    style={styles.favoriteButton}
                >
                    <Text>{isFavourite ? "♥" : "♡"}</Text>
                </TouchableOpacity>
            </View>

            {/* Recipe Details */}
            <View style={styles.contentContainer} testID="contentContainer">
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Content</Text>
                    <Text style={styles.contentText}>{recipe.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    recipeImage: {
        width: wp(98),
        height: hp(35), // Use hp(35) for height
        borderRadius: 35,
        marginTop: 4,
    },
    contentContainer: {
        paddingHorizontal: wp(4),
        paddingTop: hp(4),
    },
    recipeTitle: {
        fontSize: hp(3),
        fontWeight: "bold",
        color: "#4B5563",
        marginBottom: hp(2),
    },
    sectionContainer: {
        marginBottom: hp(2),
    },
    sectionTitle: {
        fontSize: hp(2.5),
        fontWeight: "bold",
        color: "#4B5563",
        marginBottom: hp(1),
    },
    topButtonsContainer: {
        width: "100%",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: hp(4),
    },
    backButton: {
        padding: 8,
        borderRadius: 50,
        marginLeft: wp(5),
        backgroundColor: "white",
    },
    favoriteButton: {
        padding: 8,
        borderRadius: 50,
        marginRight: wp(5),
        backgroundColor: "white",
    },
    contentText: {
        fontSize: hp(1.6),
        color: "#4B5563",
    },
});
