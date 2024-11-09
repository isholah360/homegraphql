import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";

const { width, height } = Dimensions.get("window");

// Sample cart data
const cartItems = [
  {
    id: "1",
    name: "EKERO",
    price: "$230.00",
    originalPrice: "$612.58",
    discount: "45% OFF",
    color: "Yellow",
    quantity: 1,
    image: require("../assets/images/Product1.png"),
  },
  {
    id: "2",
    name: "FRIHETEN",
    price: "$300.00",
    originalPrice: "$429.00",
    discount: "30% OFF",
    color: "Gray",
    quantity: 1,
    image: require("../assets/images/Product2.png"),
  },
  {
    id: "3",
    name: "POÄNG",
    price: "$150.00",
    originalPrice: "$200.00",
    discount: "25% OFF",
    color: "Brown",
    quantity: 1,
    image: require("../assets/images/Product3.png"),
  },
];

const MyCart: React.FC = () => {
  const renderCartItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        </View>
        <Text style={styles.colorText}>{item.color}</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity>
            <EvilIcons name="heart" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <TouchableOpacity>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#156651" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Feather name="bell" size={24} color="black" />
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Total and Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#404040",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 10,
    height: 168,
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
    gap: 6,
  },
  productName: {
    fontWeight: "400",
    color: "#404040",
    paddingVertical: 6,
  },
  price: {
    fontWeight: "700",
    color: "#404040",
    fontSize: 20,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  originalPrice: {
    fontWeight: "400",
    color: "#404040",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: "#E44A4A",
    height: 20,
    width: 51,
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  discountText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 10,
  },
  colorText: {
    color: "#404040",
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  quantityContainer: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
    width: 105,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginTop: "auto",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: "#404040",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#156651",
  },
  checkoutButton: {
    backgroundColor: "#156651",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default MyCart;
