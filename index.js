document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // ✅ Fix 1: Contact Form Submission
    let contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        console.error("Contact form not found! Check your HTML structure.");
        return;
    }

    // ✅ Handle Form Submission
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent Page Reload

        let name = document.querySelector("input[name='Name']").value.trim();
        let email = document.querySelector("input[name='email']").value.trim();
        let message = document.querySelector("textarea[name='Message']").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields!");
            return;
        }

        let newContact = { name, email, message };

        // ✅ Ensure Backend is Running
        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            alert("Your message has been submitted successfully!");
            contactForm.reset(); // ✅ Clear Form After Submission
        })
        .catch(error => {
            console.error("Submission Error:", error);
            alert("Failed to submit. Please try again!");
        });
    });

    // ✅ Fix 2: Booking Form using Event Delegation
    document.addEventListener("dblclick", function (event) {
        if (!event.target.closest(".service")) return;

        let service = event.target.closest(".service");

        // Prevent multiple booking forms
        if (service.querySelector(".booking-form")) return;

        const bookingForm = document.createElement("form");
        bookingForm.classList.add("booking-form");

        bookingForm.innerHTML = `
            <h3>Book This Service</h3>
            <input type="text" id="fullName" placeholder="Full Name" required>
            <input type="tel" id="contactNumber" placeholder="Contact Number" required>
            <input type="datetime-local" id="appointmentDateTime" required>
            <select id="paymentMethod" required>
                <option value="" disabled selected>Select Payment Method</option>
                <option value="MPesa">MPesa</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
            </select>
            <button type="submit">Confirm Booking</button>
        `;

        service.appendChild(bookingForm);
    });

    // ✅ Fix 3: Handle Booking Form Submission using Event Delegation
    document.addEventListener("submit", function (event) {
        if (!event.target.classList.contains("booking-form")) return;

        event.preventDefault();
        let bookingForm = event.target;
        let service = bookingForm.closest(".service");

        let bookingData = {
            fullName: bookingForm.querySelector("#fullName").value,
            contactNumber: bookingForm.querySelector("#contactNumber").value,
            appointmentDateTime: bookingForm.querySelector("#appointmentDateTime").value,
            paymentMethod: bookingForm.querySelector("#paymentMethod").value,
            serviceName: service.querySelector("h3").textContent
        };

        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(() => {
            alert("Booking Confirmed!");
            bookingForm.remove();
        })
        .catch(error => console.error("Error:", error));
    });

    // ✅ Fix 4: Like Button (Remove Square & Add Toggle)
    document.querySelectorAll(".like-btn").forEach(likeButton => {
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("liked");
            likeButton.innerHTML = likeButton.classList.contains("liked") ? "❤️" : "🤍";
        });
    });

    // ✅ Fix 5: Comment Submission
    document.querySelectorAll(".comment-btn").forEach(button => {
        button.addEventListener("click", () => {
            const container = button.closest(".interaction-container");
            const commentInput = container.querySelector(".comment-input");
            const commentList = container.querySelector(".comment-list");
            const serviceDropdown = container.querySelector(".service-dropdown");

            const commentText = commentInput.value.trim();
            const selectedService = serviceDropdown.value;

            if (!commentText || !selectedService) {
                alert("Please select a service and enter a comment!");
                return;
            }

            fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ service: selectedService, comment: commentText })
            })
            .then(response => response.json())
            .then(() => {
                alert("Comment Posted!");
                const newComment = document.createElement("li");
                newComment.textContent = `${selectedService}: ${commentText}`;
                commentList.appendChild(newComment);
                commentInput.value = "";
            })
            .catch(error => console.error("Error submitting comment:", error));
        });
    });
});
