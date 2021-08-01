// login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;
  const sel = document.getElementById('barangay');
  const barangay = sel.options[sel.selectedIndex].text;

  console.log(email);
  console.log(password);
  console.log(barangay);

  var barangayDoc = camelize(barangay);

  console.log(barangayDoc);




  if (email !== "" && password !== "") {
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user)
      console.log(cred.user.uid)

      db.collection('barangays').doc(barangayDoc).collection('users').doc(cred.user.uid).get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          if (doc.data()['admin']) {
            window.location.href = "home.html"
            console.log('admin')
            localStorage.setItem("barangay", barangayDoc);
          } else {
            auth.signOut().then(() => {
              console.log('not an admin, logged out')
            })
          }
        } else {
          // doc.data() will be undefined in this case
          auth.signOut().then(() => {
            console.log('wrong barangay')
          })
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });


    });
  }
});

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}



auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user)
  }
});