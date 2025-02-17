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
    const inputText = phoneNumberInput.value.trim();

    // Clear the input field after getting the value
    phoneNumberInput.value = "";

    if (inputText === "") {
        alert("Please enter at least one phone number.");
        return;
    }

    // Split the input by commas or spaces and clean up the numbers
    const numbers = inputText.split(/[\s,]+/).map(num => num.trim()).filter(num => num.length === 10 && /^[0-9]+$/.test(num));

    if (numbers.length === 0) {
        alert("Please enter valid 10-digit phone numbers.");
        return;
    }

    // Loop through each valid number and create a call button for it
    const contactList = document.getElementById("contactList");

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
        callButton.onclick = () => makeCall(number, callButton); // Pass button reference

        // Append the phone number and button to the contactItem
        contactItem.appendChild(numberSpan);
        contactItem.appendChild(callButton);

        // Append the new contact item to the contact list
        contactList.appendChild(contactItem);
    });
}
