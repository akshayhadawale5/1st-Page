// Warn user before refreshing the page
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to refresh? Your call list will be lost.";
});

function makeCall(number, button) {
    // Open the dialer
    window.location.href = `tel:${number}`;

    // Change button color to gray but keep it clickable
    button.classList.add("clicked");
}

function addNumbers() {
    const phoneNumberInput = document.getElementById("phoneNumberInput");
    const contactList = document.getElementById("contactList");

    const inputText = phoneNumberInput.value.trim();
    if (inputText === "") {
        alert("Please enter at least one phone number.");
        return;
    }

    phoneNumberInput.value = "";

    // Split input and clean numbers
    const numbers = inputText.split(/[\s,]+/).map(num => num.trim()).filter(num => /^\d{10}$/.test(num));

    if (numbers.length === 0) {
        alert("Please enter valid 10-digit phone numbers.");
        return;
    }

    // Clear old valid numbers and refresh list
    contactList.innerHTML = "";

    // Display valid numbers with serial number formatting
    numbers.forEach((number, index) => {
        const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

        const contactItem = document.createElement("div");
        contactItem.classList.add("contact-item");

        const serialNumber = document.createElement("span");
        serialNumber.classList.add("serial-number");
        serialNumber.textContent = `${index + 1}.`;

        const numberSpan = document.createElement("span");
        numberSpan.classList.add("formatted-number");
        numberSpan.textContent = formattedNumber;

        // Button container for better alignment
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("contact-buttons");

        // Call button
        const callButton = document.createElement("button");
        callButton.classList.add("call-button");
        callButton.textContent = "Call";
        callButton.onclick = () => makeCall(number, callButton);

        // Add button
        const addButton = document.createElement("button");
        addButton.classList.add("add-button");
        addButton.textContent = "+";
        addButton.onclick = () => handleAddButtonClick(number);

        buttonContainer.appendChild(callButton);
        buttonContainer.appendChild(addButton);

        contactItem.appendChild(serialNumber);
        contactItem.appendChild(numberSpan);
        contactItem.appendChild(buttonContainer);
        contactList.appendChild(contactItem);
    });
}
