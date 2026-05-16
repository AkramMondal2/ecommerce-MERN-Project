import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import orderReducer from "../features/orderSlice";
import adminReducer from "../features/adminSlice";
import adminProductReducer from "../features/adminProductSlice";
import adminOrderReducer from "../features/adminOrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
  },
});

export default store;
