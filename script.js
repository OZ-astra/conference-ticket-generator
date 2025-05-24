/** @format */

const formEl = document.getElementById("form");
const dragDrop = document.getElementById("drag-and-drop");
const uploadFile = document.getElementById("fileInput");
const dragDropText = document.getElementById("drag-drop-text");
const messageContainer = document.querySelector(".info-container");
const errorMessage = document.querySelector(".error-message");
const invalidMail = document.querySelector(".invalid-mail");
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const github = document.getElementById("github");
const submit = document.getElementById("submit");
let myFile;

const validateName = (element) => {
	const usernamePattern = /[a-zA-Z0-9_@#%&$*!?]{3,16}$/;
	if (usernamePattern.test(element.value)) {
		element.style.borderColor = "rgba(255, 255, 255, 0.5);";
		return true;
	} else {
		element.style.borderColor = "rgb(225, 97, 81)";
		return false;
	}
};

const validateEmail = () => {
	const mailPattern = /[a-zA-Z0-9_@.com]$/;
	if (mailPattern.test(email.value)) {
		email.style.borderColor = "rgba(255, 255, 255, 0.5)";
		return true;
	} else {
		email.style.borderColor = "rgb(225, 97, 81)";
		invalidMail.style.display = "block";
		return false;
	}
};

let isAvatarDropped = false;
const validateAvatar = () => {
	if (!isAvatarDropped) {
		dragDrop.style.borderColor = "rgb(225, 97, 81)";
		return false;
	} else {
		return true;
	}
};

const validatorsMap = {
	fullName: () => validateName(fullName),
	github: () => validateName(github),
	email: validateEmail,
	avater: validateAvatar,
};

const fieldNames = Object.keys(validatorsMap);

formEl.addEventListener("submit", async (e) => {
	e.preventDefault();

	const isFormValid = fieldNames.some((field) => {
		const validator = validatorsMap[field];
		return validator();
	});
	if (!isFormValid) return;

	if (!myFile) {
		console.error("No file uploaded");
		return;
	}
	try {
		const base64String = await convertToBase64(myFile);
		const storageObject = {
			username: fullName.value,
			githubName: github.value,
			email: email.value,
			image: base64String,
		};
		console.log("storage object:", storageObject);

		sessionStorage.setItem("userData", JSON.stringify(storageObject));
	} catch (error) {
		console.error("Error converting file to base64:", error);
	}

	location.href = "generated-tickets.html";
});

dragDrop.addEventListener("dragover", (ev) => {
	ev.preventDefault();
});

const dragDropContent = dragDrop.innerHTML;

dragDrop.addEventListener("drop", (ev) => {
	ev.preventDefault();
	dragDrop.style.backgroundColor = "";
	myFile = ev.dataTransfer.files[0];

	if (myFile.type.startsWith("image/")) {
		const img = document.createElement("img");
		img.src = URL.createObjectURL(myFile);
		img.id = "dropped-image";
		img.style.width = "15%";
		dragDrop.innerHTML = "";
		dragDrop.appendChild(img);
	}

	if (ev.dataTransfer.files.length > 0) {
		isAvatarDropped = true;
	}

	if (myFile.size > 500000) {
		messageContainer.style.display = "none";
		errorMessage.style.display = "flex";
	} else {
		messageContainer.style.display = "flex";
		errorMessage.style.display = "none";

		optionContainer();
	}
});

function optionContainer() {
	// imageOpionContainer
	const imageOptionContainer = document.createElement("div");
	dragDrop.appendChild(imageOptionContainer);
	imageOptionContainer.id = "image-option-container";

	// removeImage section
	const removeImage = document.createElement("button");
	removeImage.textContent = "Remove image";
	imageOptionContainer.appendChild(removeImage);

	removeImage.addEventListener("mouseover", () => {
		removeImage.style.textDecoration = "underline";
	});
	removeImage.addEventListener("mouseleave", () => {
		removeImage.style.textDecoration = "";
	});
	removeImage.addEventListener("click", (ev) => {
		dragDrop.innerHTML = dragDropContent;
	});

	// changeImage
	const changeImage = document.createElement("button");
	changeImage.textContent = "Change image";
	imageOptionContainer.appendChild(changeImage);

	changeImage.addEventListener("mouseover", () => {
		changeImage.style.textDecoration = "underline";
	});
	changeImage.addEventListener("mouseleave", () => {
		changeImage.style.textDecoration = "";
	});

	changeImage.addEventListener("click", () => {
		uploadFile.click();
	});
}

// session storage
function convertToBase64(file) {
	return new Promise((resolve, reject) => {
		console.log(file);
		const reader = new FileReader();

		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
}

uploadFile.addEventListener("change", function (ev) {
	myFile = ev.target.files[0];

	if (myFile) {
		const img = document.createElement("img");
		img.src = URL.createObjectURL(myFile);
		img.id = "dropped-image";
		dragDrop.innerHTML = "";
		dragDrop.appendChild(img);
		optionContainer();
	}
});
