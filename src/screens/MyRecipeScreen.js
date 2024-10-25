import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Fetch recipes from AsyncStorage
                const storedRecipes = await AsyncStorage.getItem("customrecipes");
                if (storedRecipes) {
                    const parsedRecipes = JSON.parse(storedRecipes);
                    setRecipes(parsedRecipes);
                }
                setLoading(false); // Update loading state
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setLoading(false); // Stop loading even in case of error
            }
        };

        fetchRecipes(); // Call the fetch function
    }, []);

    const handleAddRecipe = () => {
        navigation.navigate("RecipesFormScreen"); // Navigate to the form for adding a new recipe
    };

    const handleRecipeClick = (recipe) => {
        navigation.navigate("CustomRecipesScreen", { recipe }); // Navigate to the recipe detail screen
    };

    const deleteRecipe = async (index) => {
        try {
            const updatedRecipes = [...recipes]; // Clone the current recipes array
            updatedRecipes.splice(index, 1); // Remove the recipe at the specified index
            await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedRecipes)); // Update AsyncStorage
            setRecipes(updatedRecipes); // Update state with the new recipes array
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const editRecipe = (recipe, index) => {
        navigation.navigate("RecipesFormScreen", { recipeToEdit: recipe, recipeIndex: index }); // Pass recipe to edit
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"Back"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Recipe</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#f59e0b" />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {recipes.length === 0 ? (
                        <Text style={styles.noRecipesText}>No recipes added yet.</Text>
                    ) : (
                        recipes.map((recipe, index) => (
                            <View key={index} style={styles.recipeCard} testID="recipeCard">
                                <TouchableOpacity testID="handleRecipeBtn" onPress={() => handleRecipeClick(recipe)}>
                                    {recipe.image && (
                                        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                                    )}
                                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                    <Text style={styles.recipeDescription} testID="recipeDescp">
                                        {recipe.description.substring(0, 50)}...
                                    </Text>
                                </TouchableOpacity>

                                {/* Edit and Delete Buttons */}
                                <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                                    <TouchableOpacity
                                        onPress={() => editRecipe(recipe, index)}
                                        style={styles.editButton}
                                    >
                                        <Text style={styles.editButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteRecipe(index)}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(4),
        backgroundColor: "#F9FAFB",
    },
    backButton: {
        marginBottom: hp(1.5),
    },
    backButtonText: {
        fontSize: hp(2.2),
        color: "#4F75FF",
    },
    addButton: {
        backgroundColor: "#4F75FF",
        padding: wp(.7),
        alignItems: "center",
        borderRadius: 5,
        width: 300,
        marginBottom: hp(2),
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: hp(2.2),
    },
    scrollContainer: {
        paddingBottom: hp(2),
    },
    noRecipesText: {
        textAlign: "center",
        fontSize: hp(2),
        color: "#6B7280",
        marginTop: hp(5),
    },
    recipeCard: {
        width: 400,
        height: 300,
        backgroundColor: "#fff",
        padding: wp(3),
        borderRadius: 8,
        marginBottom: hp(2),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // for Android shadow
    },
    recipeImage: {
        width: 300,
        height: 150,
        borderRadius: 8,
        marginBottom: hp(1),
    },
    recipeTitle: {
        fontSize: hp(2),
        fontWeight: "600",
        color: "#111827",
        marginBottom: hp(0.5),
    },
    recipeDescription: {
        fontSize: hp(1.8),
        color: "#6B7280",
        marginBottom: hp(1.5),
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp(1),
    },
    editButton: {
        backgroundColor: "#34D399",
        padding: wp(.5),
        borderRadius: 5,
        width: 100,
        alignItems: "center",
    },
    editButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: hp(1.8),
    },
    deleteButton: {
        backgroundColor: "#EF4444",
        padding: wp(.5),
        borderRadius: 5,
        width: 100,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: hp(1.8),
    },
});
