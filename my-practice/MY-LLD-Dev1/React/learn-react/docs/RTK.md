
# Redux Toolkit (RTK) - Complete Concept

## What Problem Does Redux Toolkit Solve?

Imagine an E-Commerce application.

```
Home
Product Details
Wishlist
Shopping Cart
Orders
Profile
Payments
```

Many components need the same data.

Example:

```
Cart Count

Navbar
    ↓

Home Page
    ↓

Product Page
    ↓

Cart Page
```

If one page changes the cart,

every other page should immediately know about it.

Passing props through every component becomes impossible.

Example

```
App
 │
 ├── Navbar
 │
 ├── Home
 │
 │    └── Product
 │
 │          └── AddToCart
 │
 ├── Wishlist
 │
 └── Cart
```

Suppose Product adds an item.

How does Navbar know the cart count changed?

Without Redux:

```
AddToCart
      │
      ▼

Product

      │
      ▼

Home

      │
      ▼

App

      │
      ▼

Navbar
```

This is called **Prop Drilling**.

As applications grow,

this becomes difficult to maintain.

---

# Redux Solution

Instead of passing state through components,

store everything in one central location.

```
                 Redux Store

              Cart
              User
              Products
              Orders

      ▲                    ▲
      │                    │
Navbar                Product Page

      ▲                    ▲
      │                    │
Wishlist              Checkout
```

Now every component directly talks to the Store.

No prop drilling.

---

# Why Redux Toolkit?

Old Redux required lots of code.

Example:

```
Action Types

↓

Action Creators

↓

Reducer

↓

Store

↓

Provider

↓

Dispatch

↓

Selector
```

Even a counter required 5–6 files.

Redux Toolkit reduces this to

```
Slice

↓

Store

↓

Component
```

Much simpler.

---

# Redux Toolkit Architecture

```
                 User Clicks Button

                         │
                         ▼

                dispatch(addToCart())

                         │
                         ▼

                 Redux Store

                         │
                         ▼

                Product Slice Reducer

                         │
                         ▼

              New State Returned

                         │
                         ▼

                Store Updated

                         │
                         ▼

      Components using useSelector()

                         │
                         ▼

                 React Re-renders
```

---

# Complete Architecture

```
                    React Components

          Navbar
          Cart
          Product
          Orders

                │

                │ dispatch()

                ▼

          Redux Store

       ┌──────────────────┐
       │                  │
       │   User Slice     │
       │                  │
       ├──────────────────┤
       │                  │
       │ Cart Slice       │
       │                  │
       ├──────────────────┤
       │                  │
       │ Product Slice    │
       │                  │
       ├──────────────────┤
       │                  │
       │ Order Slice      │
       │                  │
       └──────────────────┘

                ▲

                │ useSelector()

                │

          React Components
```

---

# Understanding a Slice

Think of a Slice as a **small manager** responsible for one feature.

```
Cart Slice

State

Reducers

Actions
```

Example

```
Cart Slice

State

{
    items:[]
}

Reducers

addItem()

removeItem()

clearCart()
```

Each feature has its own slice.

```
User Slice

Cart Slice

Order Slice

Product Slice
```

---

# Flow of an Action

Suppose user clicks

```
Add To Cart
```

React Component

```
dispatch(addItem(product))
```

Redux internally creates

```
Action

{
    type:"cart/addItem",

    payload:product
}
```

Store receives it.

```
Store

↓

Cart Reducer

↓

State Updated

↓

React Components Updated
```

---

# Internally What Happens?

Current Store

```
Cart

[
   Laptop
]
```

User clicks

```
Add Phone
```

Component

```jsx
dispatch(addItem(phone))
```

Redux internally executes

```jsx
cartReducer(
    currentState,
    action
)
```

Reducer

```jsx
state.items.push(action.payload)
```

Immer converts it into

```jsx
return {

   items:[
      Laptop,
      Phone
   ]

}
```

Store updates.

Every component using

```jsx
useSelector()
```

gets updated automatically.

---

# Real World Example

## Amazon Cart

Components

```
Navbar

Product Page

Cart

Checkout

Payment
```

Suppose user adds

```
iPhone
```

Product Page

```
dispatch(addItem(iPhone))
```

Immediately

Navbar

```
Cart (1)
```

updates.

Cart Page

```
iPhone
```

updates.

Checkout

```
Total ₹79,999
```

updates.

No props.

Everything comes from Redux Store.

---

# Another Example

Authentication

```
Login Page

↓

dispatch(login(user))

↓

User Slice

↓

Store

↓

Navbar

↓

Dashboard

↓

Settings
```

Every page immediately knows

```
User Logged In
```

---

# Why useSelector?

Suppose Navbar needs

```
Cart Count
```

Instead of

```
App

↓

Navbar

↓

Home

↓

Product

↓

Cart
```

Navbar simply says

```jsx
const cart = useSelector(
    state => state.cart.items
)
```

Redux returns

```
Latest Cart
```

No prop drilling.

---

# Why useDispatch?

Suppose Checkout places an order.

```
dispatch(placeOrder(order))
```

Component doesn't update state directly.

It only sends

```
Action
```

Redux decides

```
How State Changes
```

---

# Why Immer?

Without Immer

```jsx
return {

   ...state,

   items:[
      ...state.items,

      action.payload
   ]

}
```

With Immer

```jsx
state.items.push(action.payload)
```

Much easier.

Redux Toolkit converts it internally.

---

# Folder Structure

```
src

├── app
│      store.js
│
├── features
│      cart
│          cartSlice.js
│
│      user
│          userSlice.js
│
│      product
│          productSlice.js
│
└── components
```

Every feature owns its own state.

---

# Large Enterprise Example

Imagine Flipkart.

```
Authentication

Cart

Orders

Wishlist

Search

Notifications

Payments

Coupons
```

Each feature has its own Slice.

```
User Slice

Cart Slice

Order Slice

Search Slice

Wishlist Slice

Payment Slice
```

All connected to one Store.

---

# Complete Flow

```
User Click

      │

      ▼

dispatch(action)

      │

      ▼

Redux Store

      │

      ▼

Matching Slice Reducer

      │

      ▼

State Updated

      │

      ▼

Store Updated

      │

      ▼

useSelector()

      │

      ▼

Component Re-render
```

---

# Interview Explanation (2-Minute Answer)

> Redux Toolkit is the official and recommended way to write Redux applications. It provides a centralized store for application state, eliminating prop drilling and making state predictable. Instead of manually creating actions, reducers, and store configuration as in traditional Redux, Redux Toolkit uses `createSlice()` to generate reducers and action creators automatically, `configureStore()` to simplify store setup, and Immer to allow writing immutable updates using mutation-like syntax. Components read state using `useSelector()` and update it by dispatching actions with `useDispatch()`. This architecture is ideal for large applications such as e-commerce platforms, dashboards, authentication systems, and enterprise applications where multiple components need access to the same shared state.
