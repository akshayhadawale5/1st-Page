// Warn user before refreshing the page
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to refresh? Your call list will be lost.";
});

function makeCall(number, button) {
    window.location.href = `tel:${number}`;
    button.style.backgroundColor = "#808080"; // Gray color after clicking
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

        // Create "Call" button
        const callButton = document.createElement("button");
        callButton.textContent = "Call";
        callButton.classList.add("call-button");
        callButton.onclick = () => makeCall(number, callButton);

        // Create "+" button
        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("plus-button");
        plusButton.onclick = () => alert(`Added action for ${number}`); // Placeholder action

        contactItem.appendChild(serialNumber);
        contactItem.appendChild(numberSpan);
        contactItem.appendChild(callButton);
        contactItem.appendChild(plusButton);
        contactList.appendChild(contactItem);
    });
}
