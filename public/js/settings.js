document.getElementById("account-settings").addEventListener("click", e => {
  e.preventDefault();

  template = `
  <div class="mx-auto container max-w-2xl md:w-3/4 shadow-md max-h-screen h-full overflow-scroll">
    <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-blue-400 rounded-t">
      <div class="max-w-sm mx-auto md:w-full md:mx-0">
        <div class="inline-flex items-center space-x-4">
          <img class="w-10 h-10 object-cover rounded-full" alt="User avatar"
            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png" />

          <h1 class="text-gray-600" id="account-name">Charly Olivas</h1>
        </div>
      </div>
    </div>
    <div class="bg-white space-y-6">
      <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
        <h2 class="md:w-1/3 max-w-sm mx-auto">Account</h2>
        <div class="md:w-2/3 max-w-sm mx-auto">
          <label class="text-sm text-gray-400">Email</label>
          <div class="w-full inline-flex border">
            <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
              <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input type="email" id="account-email" class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
              placeholder="email@example.com" disabled />
          </div>
        </div>
      </div>

      <hr />
      <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
        <h2 class="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
        <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
          <div>
            <label class="text-sm text-gray-400">Full name</label>
            <div class="w-full inline-flex border">
              <div class="w-1/12 pt-2 bg-gray-100">
                <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input type="text" id="account-full-name" class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                placeholder="Charly Olivas" disabled />
            </div>
          </div>
          <div>
            <label class="text-sm text-gray-400">Address</label>
            <div class="w-full inline-flex border">
              <div class="pt-2 w-1/12 bg-gray-100">
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path fill="none"
                    d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z">
                  </path>
                </svg>
              </div>
              <input type="text" id="account-address" class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                placeholder="Zone 2" disabled />
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-400">Phone number</label>
            <div class="w-full inline-flex border">
              <div class="pt-2 w-1/12 bg-gray-100">
                <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <input type="text" id="account-phone" class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                placeholder="12341234" disabled />
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
        <h2 class="md:w-4/12 max-w-sm mx-auto">Change password</h2>

        <div class="flex flex-col md:w-5/12 w-full md:pl-9">
          <div class="max-w-sm mx-auto space-y-5 md:inline-flex pl-2 pb-2">
            <div class="w-full inline-flex border-b">
              <div class="w-1/12 pt-2">
                <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input type="password" id="account-old-pass" class="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                placeholder="Old Password" />
            </div>
          </div>
          <div class="max-w-sm mx-auto space-y-5 md:inline-flex pl-2 pb-2">
            <div class="w-full inline-flex border-b">
              <div class="w-1/12 pt-2">
                <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input type="password" id="account-new-pass" class="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                placeholder="New Password" />
            </div>
          </div>
          <div class="max-w-sm mx-auto space-y-5 md:inline-flex pl-2 pb-2">
            <div class="w-full inline-flex border-b">
              <div class="w-1/12 pt-2">
                <svg fill="none" class="w-6 text-gray-400 mx-auto" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input type="password" id="account-confirm-pass" class="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                placeholder="Confirm Password" />
            </div>
          </div>
        </div>

        <div class="md:w-3/12 text-center md:pl-6">
          <button
            class="text-white w-full mx-auto max-w-sm rounded-md text-center bg-blue-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right"  id="account-update-btn">
            <svg fill="none" class="w-4 text-white mr-2" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>

  `;
  content.innerHTML = template;

  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(barangayDoc).collection('users').doc(firebase.auth().currentUser.uid)
    .get()
    .then(function (doc) {
      console.log("hehe =>", doc.data());
      document.getElementById("account-name").innerText = doc.data().firstName + " " + doc.data().lastName;
      document.getElementById("account-email").value = doc.data().email;
      document.getElementById("account-full-name").value = doc.data().firstName + " " + doc.data().lastName;
      document.getElementById("account-address").value = doc.data().detailedAddress;
      document.getElementById("account-phone").value = doc.data().number;
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  document.getElementById("account-update-btn").addEventListener("click", e => {
    e.preventDefault();
    let oldPass = document.getElementById("account-old-pass").value;
    let newPass = document.getElementById("account-new-pass").value;
    let confirmPass = document.getElementById("account-confirm-pass").value;
    console.log(oldPass)
    console.log(newPass)
    console.log(confirmPass)
    if (newPass != confirmPass) {
      window.alert("Password does not match");
    } else if (!checkPassword(newPass)) {
      window.alert("Password should contain 8 characters with uppercase, lowercase symbol, and number");
    } else {
      let credential = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPass
      );

      auth.currentUser.reauthenticateWithCredential(credential).then(() => {
        auth.currentUser.updatePassword(newPass).then(() => {
          console.log("Updated");
          window.alert("Password successfully changed");
        }).catch((error) => {
          console.log("Update Pass Error => ", error)
        });
      }).catch((error) => {
        console.log("Reauthenticate Error => ", error)
        window.alert("Password incorrect");
      });
    }
  })

})


// Check if password has Uppercase lowercase number and symbols
function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (re.test(str) && str.length >= 8) {
    return true
  } else {
    return false
  }
}

