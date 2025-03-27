# 📌 Project Name: Fix on the Go

##  Description
This is a simple **single-page web application** that allows users to:
- View a list of available services.
- Book a service by double clicking and entering their details.
- Like and leave a comment on the service they received
- Submit a contact form.


The application is built using **HTML, CSS, and JavaScript**, for the front-end to make the project visual and it interacts with a `db.json` file using `json-server` for the back-end to store and retrieve data asynchronously.

---

##  Features
✔️ Fetch services from `db.json` dynamically.<br>
✔️ Allow users to **book a service** (Name, Contact, Date, and Payment Method).<br>
✔️ Submit a **contact form**.(Name, Email, Message)<br>
✔️ Like a service and leave a comment<br>
✔️ Uses **event listeners** to handle user interactions.<br>
✔️ Implements **array iteration** methods (`forEach`, `map`).<br>

---

## 🛠️ Technologies Used
- **HTML** (Frontend Structure)
- **CSS** (Styling)
- **JavaScript** (Client-side Logic)
- **JSON Server** (Mock API for data storage)
- **Font Awesome** (Icons for the contact(email and phone) system)

---

## 📂 File Structure
```
📂 Project Folder
│── 📄 index.html  (Main HTML file)
│── 📄 style.css  (Styling file)
│── 📄 index.js  (JavaScript logic)
│── 📄 db.json  (Mock database for storing data)
```

---

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/service-booking.git
cd service-booking
```

### 2️⃣ Install `json-server`
Ensure you have `json-server` installed globally:
```sh
npm install -g json-server
```

### 3️⃣ Start the `json-server`
```sh
json-server --watch db.json --port 3000
```
This will run the mock API on `http://localhost:3000/`

### 4️⃣ Open `index.html` in the browser
Simply open the `index.html` file in a browser to start using the app.

---

## 🖥️ Usage
- Double-click a service to **book an appointment**.
- Click on the like button to like a service
- Fill out the **contact form** to submit an inquiry.

---

## 🔥 Future Improvements
🔹 Add **persistent storage** for ratings and comments.<br>
🔹 Implement **search & filter** functionality for services.<br>
🔹 Improve **UI/UX with animations and transitions**.<br>

---

## 📝 License
This project is **open-source** and free to use for learning purposes.

---

## ✨ Author
**[Wanjiru Kariuki]**  
[Your GitHub Profile](https://github.com/regina678)  

