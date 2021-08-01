let barangayName = localStorage.getItem("titleBarangay")
let certificateType = localStorage.getItem("certificateType")
let requesterName = localStorage.getItem("requesterName")
let pickupDate = localStorage.getItem("pickupDate");

document.getElementById("barangay-name").innerText = barangayName;
document.getElementById("certificate-type").innerText = certificateType;
document.getElementById("requester-name").innerText = requesterName;
document.getElementById("date-issued").innerText = pickupDate;
document.getElementById("paragraph-barangay").innerText = barangayName;