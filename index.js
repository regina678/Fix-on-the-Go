document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // ✅ Contact Form Submission
    let contactForm = document.querySelector(".contact-right form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.querySelector("input[name='Name']").value.trim();
            let email = document.querySelector("input[name='email']").value.trim();
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
                alert("Your message has been submitted!");
                contactForm.reset();
            })
            .catch(error => console.error("Submission Error:", error));
        });
    }

    // ✅ Service Dropdown
    const serviceDropdown = document.querySelector(".service-dropdown");

    // ✅ Like/Unlike Functionality
    const likeIcon = document.querySelector(".like-icon");
    let likeData = { service: "", liked: false };

    serviceDropdown.addEventListener("change", function () {
        likeData.service = this.value;
    });

    likeIcon.addEventListener("click", () => {
        if (!likeData.service) {
            alert("Please select a service first!");
            return;
        }

        likeData.liked = !likeData.liked;
        likeIcon.classList.toggle("liked", likeData.liked);

        fetch("http://localhost:3000/interaction", {
            method: likeData.liked ? "POST" : "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(likeData)
        })
        .catch(error => console.error("Error saving like status:", error));
    });

    // ✅ Commenting System
    const commentBtn = document.querySelector(".comment-btn");
    const commentInput = document.querySelector(".comment-input");
    const commentList = document.querySelector(".comment-list");

    commentBtn.addEventListener("click", () => {
        let commentText = commentInput.value.trim();
        let selectedService = serviceDropdown.value;

        if (!commentText) {
            alert("Comment cannot be empty!");
            return;
        }

        if (!selectedService) {
            alert("Please select a service before commenting!");
            return;
        }

        let commentData = { service: selectedService, comment: commentText };

        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        })
        .then(response => response.json())
        .then(data => {
            let listItem = document.createElement("li");
            listItem.textContent = `${selectedService}: ${commentText}`;
            commentList.appendChild(listItem);
            commentInput.value = "";
            alert("Your comment has been posted!");
        })
        .catch(error => console.error("Error saving comment:", error));
    });

    // ✅ Service Booking on Double Click
    const serviceContainer = document.querySelector(".service");

    serviceContainer.addEventListener("dblclick", () => {
        if (serviceContainer.querySelector(".booking-form")) return;

        const bookingForm = document.createElement("form");
        bookingForm.classList.add("booking-form");
        bookingForm.innerHTML = `
            <h3>Book This Service</h3>
            <input type="text" id="fullName" placeholder="Full Name" required>
            <input type="tel" id="contactNumber" placeholder="Contact Number" required>
            <input type="datetime-local" id="appointmentDateTime" required>
            <button type="submit">Confirm Booking</button>
        `;

        serviceContainer.appendChild(bookingForm);

        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Booking Confirmed!");
            bookingForm.remove();
        });
    });
});
