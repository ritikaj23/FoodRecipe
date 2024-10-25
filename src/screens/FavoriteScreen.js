import React from "react";
import { useSelector } from "react-redux";
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
    const navigation = useNavigation();

    // Get the list of favorite recipes from the Redux store
    const favoriteRecipes = useSelector((state) => state.favorites);
    const favoriteRecipesList = favoriteRecipes?.favoriterecipes || []; // Safely access the favorites list

    // If there are no favorite recipes, display a message
    if (favoriteRecipesList.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorite recipes yet!</Text>
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>Go back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <>
            {/* Heading */}
            <View testID="favoriteRecipes">
                <Text style={styles.headingText}>
                    My Favorite Recipes
                </Text>
            </View>

            {/* Go Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>Go back</Text>
            </TouchableOpacity>

            {/* FlatList to display favorite recipes */}
            <FlatList
                data={favoriteRecipesList}
                contentContainerStyle={styles.listContentContainer}
                keyExtractor={(item) => item.idFood} // Unique key extractor using idFood
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RecipeDetail", { item })}
                        style={styles.cardContainer}
                    >
                        <Image
                            source={{ uri: item.recipeImage }}
                            style={styles.recipeImage}
                        />
                        <Text style={styles.recipeTitle} numberOfLines={1}>
                            {item.recipeName.length > 20 ? item.recipeName.substring(0, 20) + '...' : item.recipeName}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: hp(2.5),
        color: "#6B7280", // text-neutral-600
    },
    headingText: {
        fontSize: hp(3.8),
        marginTop: hp(4),
        marginLeft: wp(4),
        fontWeight: "bold",
        color: "#4B5563", // text-neutral-700
    },
    backButton: {
        backgroundColor: "#2563EB",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 100,
        alignItems: "center",
        marginLeft: wp(4),
    },
    backButtonText: {
        color: "#fff",
    },
    listContentContainer: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    cardContainer: {
        backgroundColor: "white",
        marginBottom: hp(2),
        padding: wp(4),
        borderRadius: 10,
        elevation: 3, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    recipeImage: {
        width: wp(20),
        height: wp(20),
        borderRadius: 10,
        marginRight: wp(4),
    },
    recipeTitle: {
        fontSize: hp(2),
        fontWeight: "bold",
        color: "#4B5563", // text-neutral-700
    },
});
