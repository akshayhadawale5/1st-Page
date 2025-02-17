// Warn user before refreshing the page
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to refresh? Your call list will be lost.";
});

function makeCall(number, button) {
    // Open the dialer with the given phone number
    window.location.href = `tel:${number}`;

    // Disable the button and change its color to gray
    button.disabled = true;
    button.style.backgroundColor = "#808080"; // Gray color
    button.style.cursor = "not-allowed";
}

function addNumbers() {
    const phoneNumberInput = document.getElementById("phoneNumberInput");
    const contactList = document.getElementById("contactList");

    const inputText = phoneNumberInput.value.trim();
    if (inputText === "") {
        alert("Please enter at least one phone number.");
        return;
    }

    // Clear input field
    phoneNumberInput.value = "";

    // Split input by commas or spaces and clean up numbers
    const numbers = inputText.split(/[\s,]+/).map(num => num.trim()).filter(num => num.length === 10 && /^[0-9]+$/.test(num));

    if (numbers.length === 0) {
        alert("Please enter valid 10-digit phone numbers.");
        return;
    }

    // Loop through each valid number and create UI elements
    numbers.forEach(number => {
        // Create a new div to hold the phone number and call button
        const contactItem = document.createElement("div");
        contactItem.classList.add("contact-item");

        // Create the phone number span element
        const numberSpan = document.createElement("span");
        numberSpan.textContent = number;

        // Create the call button
        const callButton = document.createElement("button");
        callButton.textContent = "Call";
        callButton.onclick = () => makeCall(number, callButton);

        // Append the phone number and button to the contactItem
        contactItem.appendChild(numberSpan);
        contactItem.appendChild(callButton);

        // Append the new contact item to the contact list
        contactList.appendChild(contactItem);
    });

    // Scroll to the bottom so the latest added number is visible
    contactList.scrollTop = contactList.scrollHeight;
}
