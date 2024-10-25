import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <ArticleCard item={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <View testID="recipesDisplay">
                <FlatList
                    data={foods}
                    keyExtractor={(item) => item.recipeId.toString()} // Ensure unique key extraction
                    renderItem={renderItem}
                    numColumns={2} // Render items in two columns
                    showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                />
            </View>
        </View>
    );
}

const ArticleCard = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={[styles.cardContainer, { paddingLeft: wp(2), paddingRight: wp(2) }]} // Responsive padding
            testID="articleDisplay"
            onPress={() => navigation.navigate("RecipeDetail", { item })} // Navigate to RecipeDetail with item
        >
            <Image
                source={{ uri: item.recipeImage }} // Display recipe image
                style={styles.articleImage}
                accessibilityLabel={`${item.recipeName} image`} // Accessibility label for image
            />
            <Text style={styles.articleText}>{item.recipeName}</Text> {/* Display recipe name */}
            <Text style={styles.articleDescription}>
                {item.cookingDescription} {/* Display recipe description */}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(4),
        marginTop: hp(2),
    },
    title: {
        fontSize: hp(3),
        fontWeight: "600",
        color: "#52525B",
        marginBottom: hp(1.5),
    },
    loading: {
        marginTop: hp(20),
    },
    cardContainer: {
        justifyContent: "center",
        marginBottom: hp(1.5),
        flex: 1,
        alignItems: "center", // Center align items in the card
    },
    articleImage: {
        width: wp(40), // Make image responsive
        height: hp(15),
        borderRadius: 35,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    articleText: {
        fontSize: hp(1.5),
        fontWeight: "600",
        color: "#52525B",
        marginTop: hp(0.5),
        textAlign: "center", // Center text
    },
    articleDescription: {
        fontSize: hp(1.2),
        color: "#6B7280",
        marginTop: hp(0.5),
        textAlign: "center", // Center description text
    },
    row: {
        justifyContent: "space-between",
    },
});
