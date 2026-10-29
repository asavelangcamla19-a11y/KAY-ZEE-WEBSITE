// ==========================================
// BRAIDED BY KAY&ZEE
// WEBSITE SETTINGS
// ==========================================

// Replace these placeholders with the salon's real details.
const SALON = {
    // South African number in international format.
    // Example format: 27821234567 (digits only, no +).
    whatsapp: "REPLACE_WITH_WHATSAPP_NUMBER",

    facebook: "REPLACE_WITH_FACEBOOK_PAGE_URL",

    tiktok: "REPLACE_WITH_TIKTOK_PROFILE_URL",

    // Enter the full salon address here.
    address: "REPLACE_WITH_SALON_ADDRESS"
};


// ==========================================
// MOBILE NAVIGATION MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is clicked.
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});


// ==========================================
// CURRENT COPYRIGHT YEAR
// ==========================================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ==========================================
// SOCIAL MEDIA LINKS
// ==========================================

function setExternalLink(elementId, url) {
    const link = document.getElementById(elementId);

    if (!link) return;

    const isValidUrl =
        typeof url === "string" &&
        /^https:\/\/\S+$/i.test(url) &&
        !url.includes("REPLACE_WITH_");

    if (isValidUrl) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.removeAttribute("aria-disabled");
    } else {
        // Prevent placeholder links from opening the wrong page.
        link.href = "#";
        link.setAttribute("aria-disabled", "true");
        link.title = "This link will be available soon.";

        link.addEventListener("click", event => {
            event.preventDefault();
            alert("This link will be available once the salon details are added.");
        });
    }
}

setExternalLink("facebookLink", SALON.facebook);
setExternalLink("footerFacebook", SALON.facebook);

setExternalLink("tiktokLink", SALON.tiktok);
setExternalLink("footerTikTok", SALON.tiktok);


// ==========================================
// WHATSAPP LINKS
// ==========================================

function getWhatsAppNumber() {
    // International number, digits only.
    const number = SALON.whatsapp.replace(/\D/g, "");

    // Basic check for a plausible international number.
    if (
        SALON.whatsapp.includes("REPLACE_WITH_") ||
        number.length < 10 ||
        number.length > 15
    ) {
        return null;
    }

    return number;
}

function openWhatsApp(message) {
    const number = getWhatsAppNumber();

    if (!number) {
        alert(
            "The salon's WhatsApp number has not been added yet. " +
            "Please update the number in script.js."
        );
        return;
    }

    const url =
        "https://wa.me/" + number +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}

function setupWhatsAppLink(elementId, message) {
    const link = document.getElementById(elementId);

    if (!link) return;

    link.href = "#";

    link.addEventListener("click", event => {
        event.preventDefault();
        openWhatsApp(message);
    });
}

setupWhatsAppLink(
    "whatsappLink",
    "Hello Braided by Kay&Zee! I would like to enquire about your services."
);

setupWhatsAppLink(
    "footerWhatsApp",
    "Hello Braided by Kay&Zee! I would like to enquire about your services."
);


// ==========================================
// APPOINTMENT BOOKING FORM
// ==========================================

const bookingForm = document.getElementById("bookingForm");
const appointmentDate = document.getElementById("appointmentDate");

// Prevent selecting a date in the past.
const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

appointmentDate.min = localToday;

// Preselect a service when a customer clicks
// "Book this service" in the services section.

document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("serviceSelect").value =
            link.dataset.service;
    });
});

bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
        return;
    }

    const name = document
        .getElementById("customerName")
        .value.trim();

    const phone = document
        .getElementById("customerPhone")
        .value.trim();

    const service = document
        .getElementById("serviceSelect")
        .value;

    const date = appointmentDate.value;

    const additionalDetails = document
        .getElementById("bookingMessage")
        .value.trim();

    if (!name || !phone || !service || !date) {
        alert("Please complete all required fields.");
        return;
    }

    const message = [
        "Hello Braided by Kay&Zee! 🤎",
        "",
        "I would like to request an appointment.",
        "",
        "Name: " + name,
        "Contact number: " + phone,
        "Service: " + service,
        "Preferred date: " + date,
        "",
        "Additional details: " +
            (additionalDetails || "None provided"),
        "",
        "Please let me know if this date is available. Thank you!"
    ].join("\n");

    openWhatsApp(message);
});


// ==========================================
// SALON ADDRESS AND GOOGLE MAPS
// ==========================================

function setupLocation() {
    const address = SALON.address.trim();

    const isValidAddress =
        address.length > 0 &&
        !address.includes("REPLACE_WITH_");

    const addressElement =
        document.getElementById("salonAddress");

    const map = document.getElementById("salonMap");
    const directions = document.getElementById("directionsLink");

    if (isValidAddress) {
        addressElement.textContent = address;

        const encodedAddress = encodeURIComponent(address);

        map.src =
            "https://maps.google.com/maps?q=" +
            encodedAddress +
            "&t=&z=15&ie=UTF8&iwloc=&output=embed";

        directions.href =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodedAddress;

        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
    } else {
        addressElement.textContent =
            "Our salon address will be added here.";

        directions.href = "https://www.google.com/maps";
        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
    }
}

setupLocation();


// ==========================================
// WEBSITE STARTUP MESSAGE
// ==========================================

console.log("Braided by Kay&Zee website is ready! 🤎");