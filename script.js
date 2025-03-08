// Warn user before refreshing the page
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to refresh? Your call list will be lost.";
});

function makeCall(number, button) {
    // Open the dialer with the given phone number
    window.location.href = `tel:${number}`;

    // Change the button color to gray but keep it clickable
    button.style.backgroundColor = "#808080"; // Gray color
}

function openGoogleLens() {
    // Try to open Google Lens via Google App (Android)
    window.location.href = "intent://lens/#Intent;scheme=https;package=com.google.android.googlequicksearchbox;end;";

    // Alternative method for some Android devices
    setTimeout(() => {
        window.location.href = "googleapp://lens";
    }, 500);

    // Fallback to Google Lens Web Page if app method fails
    setTimeout(() => {
        window.location.href = "https://lens.google.com/";
    }, 1000);
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

        const callButton = document.createElement("button");
        callButton.textContent = "Call";
        callButton.onclick = () => makeCall(number, callButton);

        contactItem.appendChild(serialNumber);
        contactItem.appendChild(numberSpan);
        contactItem.appendChild(callButton);
        contactList.appendChild(contactItem);
    });
}

// Create header with Google Lens button
document.addEventListener("DOMContentLoaded", function () {
    const header = document.createElement("div");
    header.style.backgroundColor = "#28a745"; // Green color
    header.style.padding = "10px";
    header.style.textAlign = "center";

    const lensButton = document.createElement("button");
    lensButton.textContent = "Open Google Lens";
    lensButton.style.padding = "10px";
    lensButton.style.backgroundColor = "#ffffff"; // White button
    lensButton.style.color = "#28a745"; // Green text
    lensButton.style.border = "none";
    lensButton.style.cursor = "pointer";
    lensButton.style.fontSize = "16px";
    lensButton.style.fontWeight = "bold";
    lensButton.style.borderRadius = "5px";
    lensButton.onclick = openGoogleLens;

    header.appendChild(lensButton);
    document.body.insertBefore(header, document.body.firstChild);
});
