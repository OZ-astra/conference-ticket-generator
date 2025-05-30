/** @format */
const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

if (!storedUserData) {
	window.location.href = "index.html";
}

const personFullname = document.querySelectorAll(".person-name");
const personEmail = document.getElementById("person-email");
const dateOfRegistration = document.getElementById("date-generated");
const github = document.getElementById("github-name");
document.addEventListener("DOMContentLoaded", () => {
	personFullname.forEach((name) => {
		name.textContent = storedUserData.username;
	});
	personEmail.textContent = storedUserData.email;
	const currentDate = new Date();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = monthNames[currentDate.getMonth()];
	const day = currentDate.getDate();
	const year = currentDate.getFullYear();
	dateOfRegistration.textContent = `${month} ${day}, ${year}`;
	console.log("date =", dateOfRegistration);
	// personImage.textContent = storedUserData.image;
	const img = document.createElement("img");
	img.src = storedUserData.image;
	img.id = "person-image";
	document.querySelector(".inputs").prepend(img);

	github.textContent = storedUserData.githubName;
});
