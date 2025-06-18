const form = document.getElementById("myForm");
const imgInput = document.querySelector(".img");
const fileInput = document.getElementById("imgInput");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const postInput = document.getElementById("post");
const dateInput = document.getElementById("sDate");

const submitBtn = document.querySelector(".submit");
const newUserBtn = document.querySelector(".newUser");
const userInfo = document.getElementById("data");
const modalTitle = document.querySelector("#userForm .modal-title");

let profiles = JSON.parse(localStorage.getItem("userProfile")) || [];
let isEditing = false;
let editIndex = null;

newUserBtn.addEventListener("click", () => {
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the Form";
  form.reset();
  imgInput.src = "./image/Profile Icon.webp";
  isEditing = false;
});

fileInput.onchange = function () {
  const file = fileInput.files[0];
  if (file && file.size < 1000000) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgInput.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("Image too large!");
  }
};

function displayProfiles() {
  userInfo.innerHTML = "";
  profiles.forEach((profile, index) => {
    userInfo.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td><img src="${profile.picture}" width="50" height="50" /></td>
        <td>${profile.name}</td>
        <td>${profile.age}</td>
        <td>${profile.city}</td>
        <td>${profile.email}</td>
        <td>${profile.phone}</td>
        <td>${profile.post}</td>
        <td>${profile.date}</td>
        <td>
          <button onclick="viewProfile(${index})" data-bs-toggle="modal" data-bs-target="#readData">👁️</button>
          <button onclick="editProfile(${index})" data-bs-toggle="modal" data-bs-target="#userForm">✏️</button>
          <button onclick="deleteProfile(${index})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function viewProfile(index) {
  const p = profiles[index];
  document.querySelector(".showImg").src = p.picture;
  document.getElementById("showName").value = p.name;
  document.getElementById("showAge").value = p.age;
  document.getElementById("showCity").value = p.city;
  document.getElementById("showEmail").value = p.email;
  document.getElementById("showPhone").value = p.phone;
  document.getElementById("showPost").value = p.post;
  document.getElementById("showsDate").value = p.date;
}

function editProfile(index) {
  const p = profiles[index];
  imgInput.src = p.picture;
  nameInput.value = p.name;
  ageInput.value = p.age;
  cityInput.value = p.city;
  emailInput.value = p.email;
  phoneInput.value = p.phone;
  postInput.value = p.post;
  dateInput.value = p.date;
  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update Profile";
  isEditing = true;
  editIndex = index;
}

function deleteProfile(index) {
  if (confirm("Delete this profile?")) {
    profiles.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(profiles));
    displayProfiles();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const profile = {
    picture: imgInput.src ,
    name: nameInput.value,
    age: ageInput.value,
    city: cityInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    post: postInput.value,
    date: dateInput.value,
  };

  if (isEditing) {
    profiles[editIndex] = profile;
    isEditing = false;
  } else {
    profiles.push(profile);
  }

  localStorage.setItem("userProfile", JSON.stringify(profiles));
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the Form";
  form.reset();
  displayProfiles();
});

displayProfiles();
