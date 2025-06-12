# 🛒 AutoAuction – Dynamic Auction Website

## 📌 Project Overview

AutoAuction is a full-stack auction web application built using **Node.js**, **Express**, and **MySQL**, with dynamic rendering through **Pug** and frontend interactivity using **HTML**, **CSS**, and **JavaScript**.

Users can create, browse, and bid on auction listings. All auction and bid data is persistently stored in a MySQL database. The interface dynamically updates listings and bid data based on real-time user actions.

---

## 🌐 Features

### 🔨 Auction Page

- Users can view all active auction listings.
- Listings display title, description, category, end time, and current highest bid.
- Listings are dynamically rendered using Pug templates and updated in the DOM using JavaScript.

### ✍️ Add Listing

- Users can create new listings by submitting a form.
- Listing data is sent to the server and inserted into the SQL database.
- The page updates without needing a full reload.

### ❌ Delete Listing

- Listings can be removed using a "Delete" button.
- Clicking delete triggers a server-side request to remove the item from the database.
- The frontend reflects the removal dynamically using JavaScript.

### 💸 Place a Bid

- Users can place bids on active listings.
- Each bid includes amount, comment, and username.
- Bids are stored in the `bid` table and linked to their associated listing.
- The UI dynamically updates the bid history and current highest bid.

---

## 🗃️ Technologies Used

### 🔧 Backend
- **Node.js + Express** – server logic and routing
- **MySQL** – persistent data storage for listings and bids
- **`mysql-await`** – async/await-based query handling
- **Pug** – template engine for dynamic server-side HTML rendering

### 🎨 Frontend
- **HTML/CSS** – structure and styling
- **JavaScript** – DOM manipulation and event handling (e.g., bid submission, listing deletion)
- **AJAX (fetch API)** – asynchronous communication with the server

---

## 📁 Folder Structure

