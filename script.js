/** @format */

const form = document.getElementById("form");
const dragDrop = document.getElementById("drag-and-drop");
const dragDropText = document.getElementById("drag-drop-text");
const messageContainer = document.querySelector(".info-container");
const errorMessage = document.querySelector(".error-message");
const invalidMail = document.querySelector(".invalid-mail");
const fullName = document.getElementById("fullname");
const mail = document.getElementById("email");
const github = document.getElementById("github");
const submit = document.getElementById("submit");

const usernamePattern = /[a-zA-Z0-9_@#%&$*!?]{3,16}$/;
const mailPattern = /[a-zA-Z0-9_@.com]$/;

form.addEventListener("submit", (e) => {
	if (!usernamePattern.test(fullName.value)) {
		fullName.style.borderColor = "rgb(225, 97, 81)";
		e.preventDefault();
		console.log("an error occured");
	} else {
		fullName.style.borderColor = "rgba(255, 255, 255, 0.5);";
	}

	// github validation

	if (!usernamePattern.test(github.value)) {
		github.style.borderColor = "rgb(225, 97, 81)";
		e.preventDefault();
	} else {
		github.style.borderColor = "rgba(255, 255, 255, 0.5);";
	}
	// mail validation

	if (!mailPattern.test(mail.value)) {
		mail.style.borderColor = "rgb(225, 97, 81)";
		invalidMail.style.display = "block";

		e.preventDefault();
	} else {
		mail.style.borderColor = "rgba(255, 255, 255, 0.5);";
	}
});

dragDrop.addEventListener("dragover", (ev) => {
	ev.preventDefault();
	dragDrop.style.backgroundColor = "red";
});

const dragDropContent = dragDrop.innerHTML;

dragDrop.addEventListener("drop", (ev) => {
	ev.preventDefault();
	dragDrop.style.backgroundColor = "";
	const file = ev.dataTransfer.files[0];
	if (file.type.startsWith("image/")) {
		const img = document.createElement("img");
		img.src = URL.createObjectURL(file);
		img.id = "dropped-image";
		dragDrop.innerHTML = "";
		dragDrop.appendChild(img);
	}

	if (file.size > 500000) {
		dragDrop.style.backgroundColor = "rgb(0, 255, 0)";
		messageContainer.style.display = "none";
		errorMessage.style.display = "flex";
	} else {
		// dragDrop.style.backgroundColor = "blue";

		messageContainer.style.display = "flex";
		errorMessage.style.display = "none";

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
			dragDrop.innerHTML = "";
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
	}

	console.log("file dropped:", file.name);
	console.log("file size:", file.size);
});

let fileDropped = false;

dragDrop.addEventListener("drop", (ev) => {
	ev.preventDefault();
	if (ev.dataTransfer.files.length > 0) {
		fileDropped = true;
	}
});

submit.addEventListener("click", (event) => {
	if (!fileDropped) {
		event.preventDefault();
		dragDrop.style.borderColor = "rgb(225, 97, 81)";
	}
});
