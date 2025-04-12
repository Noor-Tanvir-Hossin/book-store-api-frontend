# E-Commerce Book Store

A fully functional and secure e-commerce platform featuring **User Authentication**, **Role-Based Dashboard**, **Product Management**, and **Secure Payment Integration**. Built with modern technologies ensuring responsive design and smooth user experience.

---

## Features

### User Registration & Authentication (Role-Based)

- Secure **User Registration** with `name`, `email`, and `password`.
- Default role assigned as `user`. (Admins are updated manually via DB)
- Passwords are securely **hashed** before saving to the database.
- **Login** using `email` and `password`.
- **JWT (JSON Web Token)** is used for authentication.
  - Token is stored in `localStorage`.
- **Logout** functionality to clear the token and redirect to login page.

---

### Public Routes

#### Home Page

- **Navbar**: Logo, navigation links, login/signup buttons.
- **Banner**: Highlights platform features or promotions (carousel optional).
- **Featured Products**: Shows up to 6 products + “View All” button.
- **Extra Section**: Testimonials / Blogs / Promotions.
- **Footer**: Social links, contact info, and useful site links.

#### All Products Page

- **Search** by title, author, or category.
- **Filters**: Price range, author, category, availability.
- **Dynamic Results**: Updates based on search/filter.
- **Product Cards**: Product name, author, price, and category.
- **"View Details" Button** for each product.

#### Product Details Page

- Product image, full description, and specs.
- “Buy Now” button leading to Checkout Page.

#### ℹ️ About Page

- Info about the shop and its mission.
- Add brand story, values, and more.

---

### Private Routes (Authentication Required)

#### Checkout Page

- View product summary and calculate total price.
- Quantity checks (cannot exceed available stock).
- **Order Form**: product details, user info, total, and payment method.
- **SurjoPay Payment Gateway Integration**
- “Order Now” button to place confirmed order.

---

### Dashboard (Role-Based)

#### User Dashboard

- View past orders.
- Manage personal profile.
- Change password (requires current password).

#### Admin Dashboard

- Manage Users: View, deactivate accounts.
- Manage Products: Full **CRUD** operations.
- Manage Orders: View, update, delete orders.

---

## Additional Features

### Responsive Design

- Works on all screen sizes.
- Clean layout, consistent fonts, and good alignment.

### Error Handling

- Friendly error messages:
  - Invalid login.
  - Duplicate registration email.
  - Out-of-stock product during checkout.

### Loading States

- Spinners during:
  - Login
  - API fetches
  - Payment processing

### Toast Notifications

- Shows success/failure messages like:
  - “Login successful”
  - “Order placed successfully”
  - “Product added”
  - “Payment failed”

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT, Mongoose
- **Payment**: SurjoPay

---

## Installation & Running Locally

# Frontend Setup

```
 git clone https://github.com/Noor-Tanvir-Hossin/book-store-api-frontend.git

```

```
npm install
```

```
npm run dev
```

## Contributing

1. Fork the repo

2. Clone your fork

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

3. Create a new branch

```
git checkout -b feature/YourFeature
```

4. Make changes & commit

```
git add .
git commit -m "Add: Your feature summary"
```

5. Push & create Pull Request

```
git push origin feature/YourFeature
```

6. open a pull requst
