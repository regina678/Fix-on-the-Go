document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Contact Form Submission
    let contactForm = document.querySelector(".contact-right form");

    if (!contactForm) {
        console.error("Form not found! Make sure the form exists.");
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.querySelector("input[name='Name']").value.trim();
        let email = document.querySelector("input[email='email']").value.trim();
        let message = document.querySelector("textarea[name='Message']").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields!");
            return;
        }

        let newContact = { name, email, message };

        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Contact added:", data);
            alert("Your message has been submitted!");
            contactForm.reset();
        })
        .catch(error => console.error("Submission Error:", error));
    });

    // Service Booking on Double Click
    const serviceContainers = document.querySelectorAll(".service");

    serviceContainers.forEach(service => {
        service.addEventListener("dblclick", () => {
            if (service.querySelector(".booking-form")) {
                return;
            }

            // Create booking form dynamically
            const bookingForm = document.createElement("form");
            bookingForm.classList.add("booking-form");

            bookingForm.innerHTML = `
                <h3>Book This Service</h3>
                <input type="text" id="fullName" placeholder="Full Name" required>
                <input type="tel" id="contactNumber" placeholder="Contact Number" required>
                <input type="datetime-local" id="appointmentDateTime" required>
                <select id="paymentMethod">
                    <option value="MPesa">MPesa</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                </select>
                <button type="submit">Confirm Booking</button>
            `;

            service.appendChild(bookingForm);

            // Handle form submission
            bookingForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const bookingData = {
                    fullName: document.getElementById("fullName").value,
                    contactNumber: document.getElementById("contactNumber").value,
                    appointmentDateTime: document.getElementById("appointmentDateTime").value,
                    paymentMethod: document.getElementById("paymentMethod").value,
                    serviceName: service.querySelector("h3").textContent
                };

                fetch("http://localhost:3000/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData)
                })
                .then(response => response.json())
                .then(data => {
                    alert("Booking Confirmed!");
                    bookingForm.remove();
                })
                .catch(error => console.error("Error:", error));
            });
        });
    });

    // Rating System
    const ratingContainers = document.querySelectorAll(".rating-container");

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll(".stars i");

        stars.forEach(star => {
            star.addEventListener("click", function () {
                const rating = this.getAttribute("data-value");

                // Remove active class from all stars
                stars.forEach(s => s.classList.remove("active"));

                // Add active class to selected stars
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add("active");
                }

                // Send rating to the server
                fetch("http://localhost:3000/ratings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating: rating })
                })
                .then(response => response.json())
                .then(data => {
                    alert("Thank you for your rating!");
                    console.log("Rating submitted:", data);
                })
                .catch(error => console.error("Error submitting rating:", error));
            });
        });
    });
});
