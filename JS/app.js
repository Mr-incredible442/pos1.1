// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk1qGf4QeUzoENRtH-xl1OZtwOT46ZbPQ",
  authDomain: "point-of-sale-22299.firebaseapp.com",
  projectId: "point-of-sale-22299",
  storageBucket: "point-of-sale-22299.appspot.com",
  messagingSenderId: "270717761917",
  appId: "1:270717761917:web:87fbff5274960d7808f414",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// getting data from database
const prdColRef = collection(db, "products");
const cartColRef = collection(db, "cart");

// HTML elements
let productTable = document.getElementById("productTable");
let cartTable = document.getElementById("cartTable");
// HTML elements

function getdata() {
  onSnapshot(prdColRef, (snapshot) => {
    let products = [];
    snapshot.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
      renderProducts(products);
    });
  });
  onSnapshot(cartColRef, (snapshot) => {
    let cart = [];
    snapshot.docs.forEach((doc) => {
      cart.push({ ...doc.data(), id: doc.id });
      renderProductsInCart(cart);
    });
  });
}
getdata();

// render products
function renderProducts(products) {
  products.forEach((product) => {
    let template = `
        <tr>
            <td>${product.prdName}</td>
            <td>K${product.price}</td>
            <td>${product.instock}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary id="${product.id}"">
                    <i class="bi bi-bag-check"></i>
                </button>
            </td>
        </tr>
        `;
    productTable.innerHTML = template;
  });
}
// render cart
function renderProductsInCart(productsInCart) {
  productsInCart.forEach((product) => {
    let template = `
        <tr>
            <td>${product.prdName}</td>
            <td>
                <button class="btn btn-sm btn-outline-info ${product.id}">-</button>
                <span>${product.qtt}</span>
                <button class="btn btn-sm btn-outline-info ${product.id}">+</button>
            </td>
            <td>K${product.price}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger ${product.id}">
                <i class="bi bi-trash3"></i>
                </button>
            </td>
        </tr>
        `;
    cartTable.innerHTML = template;
  });
}
