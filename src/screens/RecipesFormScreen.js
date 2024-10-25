import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
    const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
    const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
    const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
    const [description, setDescription] = useState(
        recipeToEdit ? recipeToEdit.description : ""
    );

    const saverecipe = async () => {
        try {
            // Initialize a new recipe
            const newRecipe = {
                title,
                image,
                description,
            };

            // Retrieve existing recipes
            const storedRecipes = await AsyncStorage.getItem("customrecipes");
            let recipes = storedRecipes ? JSON.parse(storedRecipes) : []; // Parse existing recipes or start with an empty array

            // Update or add a recipe
            if (recipeToEdit) {
                // If editing, update the recipe at the specified index
                recipes[recipeIndex] = newRecipe;
            } else {
                // If adding a new recipe, push it to the array
                recipes.push(newRecipe);
            }

            // Save the updated array back to storage
            await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

            // Handle callbacks if editing
            if (onrecipeEdited) {
                onrecipeEdited();
            }

            // Navigate back to the previous screen
            navigation.goBack();
        } catch (error) {
            console.error("Error saving recipe:", error); // Log any errors
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                style={styles.input}
            />
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
            )}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
            />
            <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save recipe</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(4),
    },
    input: {
        marginTop: hp(4),
        borderWidth: 1,
        borderColor: "#ddd",
        padding: wp(1),
        marginVertical: hp(1),
    },
    image: {
        width: 300,
        height: 200,
        margin: wp(2),
    },
    imagePlaceholder: {
        height: hp(20),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp(1),
        borderWidth: 1,
        borderColor: "#ddd",
        textAlign: "center",
        padding: wp(2),
    },
    saveButton: {
        backgroundColor: "#4F75FF",
        padding: wp(1),
        alignItems: "center",
        borderRadius: 5,
        marginTop: hp(2),
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
