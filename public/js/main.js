setInterval(showTime, 1000);

function showTime() {
  let time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  AMPM = 'AM';

  if (hr > 12) {
    hr -= 12;
    AMPM = "PM";
  }
  if (hr == 0) {
    hr = 12;
    AMPM = "AM";
  }

  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let curentTime = hr + ":" + min + ":" + sec + AMPM;

  document.getElementById('digital-clock').innerHTML = curentTime;

}
showTime();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

var today = new Date();
var date = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
document.getElementById("date").innerText = date;



const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

document.getElementById("day").innerText = days[today.getDay()];













// Logout
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut().then(() => {
    console.log('signed out')
    window.location.href = "index.html"
    localStorage.removeItem('barangay')
  }).catch((error) => {
    console.log('error: err')
  });
})



const content = document.getElementById('content');

// POSTS
// Show Posts
document.getElementById('manage-posts').addEventListener('click', () => {
  template = `<h2 class="text-4xl font-oswald">Manage Posts</h2>

  <div class="w-4/5 mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
        <thead>
          <tr>
            <th class="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-800 border-b">
              Date</th>
            <th class="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-800 border-b">
              POST</th>
            <th class="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-800 border-b">
              Actions</th>
            <th class="py-4 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-800 border-b">

              <a href="#"
                class="text-gray-50 font-bold py-1 px-3 rounded text-xs bg-green-600 hover:bg-green-800" id="add-post">Add
                Post</a>
            </th>
          </tr>
        </thead>
        <tbody id="action">`
  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(String(barangayDoc)).collection('post').where("author_id", "==", auth.currentUser.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        template += `
        <tr class="hover:bg-grey-lighter" id="${doc.id}">
            <td class="py-4 px-6 border-b border-gray-200">${timeStampToDate(doc.data()['timestamp']['seconds'])}</td>
            <td class="py-4 px-6 border-b border-gray-200">${doc.data()['title']}</td>
            <td class="py-4 px-6 border-b border-gray-200">
              <a href="#"
                class="text-gray-50 font-bold py-1 px-3 rounded text-xs bg-green-600 hover:bg-green-800" id="editPost">Edit</a>
              
              <a href="#"
                class="text-gray-50 font-bold py-1 px-3 rounded text-xs bg-red-600 hover:bg-red-800" id="deletePost">Delete</a>
            </td>
          </tr>
        `
      });


      template += `</tbody>
        </table>
      </div>
      </div>`

      deleteModal =
        `
        <div
              class="min-w-full h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
              id="delete-post-modal">
              <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
              <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <!--content-->
                <div class="">
                  <!--body-->
                  <div class="text-center p-5 flex-auto justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-500 mx-auto"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-bold py-4 ">Are you sure?</h3>
                      <p class="text-sm text-gray-500 px-8">Do you really want to delete the Post?
                        This process cannot be undone</p>
                  </div>
                  <!--footer-->
                  <div class="p-3  mt-2 text-center space-x-4 md:block">
                    <button
                      class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"  id="cancel-post-delete">
                      Cancel
                    </button>
                    <button
                      class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600" id="confirm-post-delete">Delete</button>
                  </div>
                </div>
              </div>
            </div>
        `


      editModal = `
      <div
              class="min-w-full h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
              id="edit-post-modal">
              <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
              <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <!--content-->
                <div class="">
                  <!--body-->
                  <div class="text-center p-5 flex-auto justify-center">
                    <i class="fa fa-edit text-5xl" aria-hidden="true"></i>
                    <h2 class="text-xl font-bold py-2 ">Edit Post</h3>
                      <p class="text-sm text-gray-500 px-8">Changes are only applied when the form is submitted</p>
                  </div>


                  <div class="py-4">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="px-6 bg-white border-b border-gray-200">
                          <form method="POST">
                            <div class="mb-4">
                              <label class="text-xl text-gray-600">Title <span
                                  class="text-red-500">*</span></label></br>
                              <input type="text" class="border-2 border-gray-300 p-2 w-full" name="title" id="edit-title"
                                value="" required>
                            </div>


                            <div class="mb-8">
                              <label class="text-xl text-gray-600">Description <span
                                  class="text-red-500">*</span></label></br>
                              <textarea name="content" class="border-2 border-gray-500 min-w-full h-48 p-2" id="edit-description"></textarea>
                            </div>
                            <div class="flex flex-col ">
                              <button role="submit" class="p-3 bg-blue-500 text-white hover:bg-blue-600 mb-2 rounded-md"
                                id="submitEdit">Submit</button>
                              

                            </div>
                          </form>
                          <div class="flex flex-col ">
                            <button class="p-3 bg-red-500 text-white hover:bg-red-600 rounded-md"
                                  id="cancelEdit">Cancel</button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `

      addModal = `
      <div
              class="min-w-full h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
              id="add-post-modal">
              <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
              <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <!--content-->
                <div class="">
                  <!--body-->
                  <div class="text-center p-5 flex-auto justify-center">
                    <i class="fas fa-book text-5xl" aria-hidden="true"></i>
                    <h2 class="text-xl font-bold py-2 ">Add Post</h3>
                      <p class="text-sm text-gray-500 px-8">Posts are only added when the form is submitted</p>
                  </div>


                  <div class="py-4">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="px-6 bg-white border-b border-gray-200">
                          <form method="POST">
                            <div class="mb-4">
                              <label class="text-xl text-gray-600">Title <span
                                  class="text-red-500">*</span></label></br>
                              <input type="text" class="border-2 border-gray-300 p-2 w-full" name="title" id="add-title"
                                value="" required>
                            </div>


                            <div class="mb-8">
                              <label class="text-xl text-gray-600">Description <span
                                  class="text-red-500">*</span></label></br>
                              <textarea name="content" class="border-2 border-gray-500 min-w-full h-48 p-2" id="add-description"></textarea>
                            </div>
                            <div class="flex flex-col ">
                              <button role="submit" class="p-3 bg-blue-500 text-white hover:bg-blue-600 mb-2 rounded-md"
                                id="submitAdd">Submit</button>
                            </div>
                          </form>
                          <div class="flex flex-col ">
                            <button class="p-3 bg-red-500 text-white hover:bg-red-600 rounded-md"
                                  id="cancelAdd">Cancel</button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `

      template += deleteModal;
      template += editModal;
      template += addModal;
      content.innerHTML = template;

      addPost = document.getElementById('add-post');
      deletePostModal = document.getElementById('delete-post-modal');
      deletePost = document.getElementById('deletePost');

      var confirmPostDelete = document.getElementById('confirm-post-delete');
      var cancelPostDelete = document.getElementById('cancel-post-delete');
      var postID;



      confirmPostDelete.addEventListener('click', (e) => {

        db.collection('barangays').doc(barangayDoc).collection('post').doc(postID).delete().then(() => {
          console.log("Document successfully deleted!");
          document.getElementById('manage-posts').click();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      })

      cancelPostDelete.addEventListener('click', () => {
        deletePostModal.classList.add('hidden');
      })




      editPostModal = document.getElementById('edit-post-modal');
      editPost = document.getElementById('editPost');
      console.log(editPost)


      var actionTab = document.getElementById('action');

      actionTab.addEventListener('click', (e) => {
        if (e.target.id === 'editPost') {
          editPostModal.classList.remove('hidden');
          console.log(e.target.parentElement.parentElement.id)
          postID = e.target.parentElement.parentElement.id;

          db.collection('barangays').doc(barangayDoc).collection('post').doc(postID).get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                document.getElementById('edit-title').value = doc.data()['title'];
                document.getElementById('edit-description').value = doc.data()['description'];
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch((error) => {
              console.log("Error getting document:", error);
            });
        } else if (e.target.id === 'deletePost') {
          deletePostModal.classList.remove('hidden');
          console.log(e.target.parentElement.parentElement.id)
          postID = e.target.parentElement.parentElement.id;
        }

      });


      submitEdit = document.getElementById('submitEdit');
      cancelEdit = document.getElementById('cancelEdit');



      cancelEdit.addEventListener('click', () => {
        editPostModal.classList.add('hidden');
      })



      submitEdit.addEventListener('click', (e) => {
        db.collection('barangays').doc(barangayDoc).collection('post').doc(postID).update(
          {
            title: document.getElementById("edit-title").value,
            description: document.getElementById("edit-description").value
          }
        ).then(() => {
          console.log("Document successfully edited!");
          cancelEdit.click();
          document.getElementById('manage-posts').click();
        }).catch((error) => {
          console.error("Error editing document: ", error);
        });
        e.preventDefault();
      })




      addPostModal = document.getElementById('add-post-modal');
      addPost = document.getElementById('add-post');

      addPost.addEventListener('click', (e) => {
        addPostModal.classList.remove('hidden');
      })


      submitAdd = document.getElementById('submitAdd');
      cancelAdd = document.getElementById('cancelAdd');


      cancelAdd.addEventListener('click', () => {
        addPostModal.classList.add('hidden');
      })



      submitAdd.addEventListener('click', (e) => {
        var today = new Date();
        db.collection('barangays').doc(barangayDoc).collection('post').doc(postID).set({
          title: document.getElementById("add-title").value,
          description: document.getElementById("add-description").value,
          timestamp: new Date(),
          author_id: auth.currentUser.uid,
          date: months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear(),
          time: today.getHours() + ':' + today.getMinutes()
        }).then(() => {
          console.log("Document successfully created!");
          cancelEdit.click();
          document.getElementById('manage-posts').click();
        }).catch((error) => {
          console.error("Error creating document: ", error);
        });
        e.preventDefault();
      })




    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });




});


// timestamp to  date
function timeStampToDate(timestamp) {
  console.log(timestamp * 1000)
  date = new Date(timestamp * 1000);

  stringDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  return stringDate;
}

var addPost = document.getElementById('add-post');
var deletePostModal = document.getElementById('delete-post-modal');

var editPostModal = document.getElementById('edit-post-modal');
var editPost = document.getElementById('editPost');

var addPostModal = document.getElementById('add-post-modal');
var addPost = document.getElementById('add-post');



document.getElementById('register-users').addEventListener('click', e => {
  console.log('eeee');
  var template = `
            <div
              class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 max-w-full max-h-screen overflow-scroll">
              
              <div
                class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                
                <div class="flex justify-between">
                
                <h2 class="text-4xl font-oswald">Register Users</h2>
                  <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                    <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                      <div class="flex">
                        <span
                          class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                          <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                              stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round"
                              stroke-linejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <input type="text"
                        class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                        placeholder="Search">
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg  max-w-full">
                <table class="max-w-full">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                        Fullname</th>
                      <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                        Email</th>
                      <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                        Status</th>
                      <th
                        class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                        Address</th>
                      <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white" id="users-table">`

  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(barangayDoc).collection('users').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        template += `<tr>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div class="text-sm leading-5 text-blue-900">${doc.data()['firstName']} ${doc.data()['lastName']}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  ${doc.data()['email']}</td>`
        console.log(auth.currentUser.emailVerified)
        if (doc.data()['idVerification'] == "Verified" && doc.data()['proofOfAddress'] == "Verified") {
          template += active
        } else if ((doc.data()['idVerification'] == "Pending" || doc.data()['idVerification'] == "Verified") && (doc.data()['proofOfAddress'] == "Pending" || doc.data()['proofOfAddress'] == "Verified")) {
          template += notActive
        } else {
          template += disabled
        }


        template += `<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    ${doc.data()['detailedAddress']}</td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5" id="${doc.id}">
                    <button
                      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" id="viewUserDetails">View
                      Details</button>
                  </td>
                </tr>`

      });


      template += `</tbody>
                  </table>
                </div>
              </div>
            `

      template += `
      <div
      class="min-w-full max-h-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
      id="verify-user-modal">
      <div class="absolute bg-black opacity-80 inset-0 z-0 max-h-screen h-screen"></div>
      <div class="w-full max-w-3xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white pb-4">
        <!--content-->
        <div class="">
          <!--body-->
          <div class="text-center p-5 flex-auto justify-center">
            <i class="fas fa-users text-5xl" aria-hidden="true"></i>
            <h2 class="text-xl font-bold py-2 ">User Registry</h3>
              <p class="text-sm text-gray-500 px-8">Changes are only applied when the form is submitted</p>
          </div>

          <div class="max-w-full flex flex-row max-h-3/4 h-screen overflow-scroll">
            <div class="py-4 w-2/5">
              <div class="w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div class="px-6 bg-white border-b border-gray-200">
                    <form>
                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Full Name</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="name" value="" id="fullName"
                          disabled>
                      </div>

                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Email</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="email" value="" id="email"
                          disabled>
                      </div>

                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Detailed Address</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="address" value="" id="detailedAddress"
                          disabled>
                      </div>


                      <div class="mb-8">
                        <label class="text-xl text-gray-600">Mobile Number</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="number" value="" id="mobileNumber"
                          disabled>
                      </div>


                      <div class="flex flex-col ">
                        <button role="submit"
                          class="p-3 bg-blue-500 text-white hover:bg-blue-600 mb-2 rounded-md"
                          id="submitVerify">Submit</button>
                      </div>
                    </form>
                    <div class="flex flex-col ">
                      <button class="p-3 bg-red-500 text-white hover:bg-red-600 rounded-md"
                        id="cancelVerify">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="py-4 w-3/5 mx-auto sm:px-6 lg:px-8 max-h-3/4 overflow-scroll">
              <div class="mb-4">
                <div class=" w-full flex flex-row justify-between">
                  <label class="text-xl text-gray-600">Proof Of Address</label>

                  <div class="relative inline-flex mb-4 w-40">
                    <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299" fill-rule="nonzero" />
                    </svg>
                    <select
                      class="border border-gray-300 rounded-xl w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                      id="addressProof">
                      <option>Pending</option>
                      <option>Failed</option>
                      <option>Verified</option>
                    </select>
                  </div>

                </div>

                <img src="https://via.placeholder.com/400x200" id="addressProofImage">
              </div>

              <div class="mb-4">
                <div class=" w-full flex flex-row justify-between">
                  <label class="text-xl text-gray-600">ID with Full Name and Photo</label>

                  <div class="relative inline-flex mb-4 w-40">
                    <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299" fill-rule="nonzero" />
                    </svg>
                    <select
                      class="border border-gray-300 rounded-xl w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                      id="idCard">
                      <option>Pending</option>
                      <option>Failed</option>
                      <option>Verified</option>
                    </select>
                  </div>

                </div>
                
                <img src="https://via.placeholder.com/400x200" id="idCardImage">

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
      `
      content.innerHTML = template;


      var userID;

      document.getElementById('users-table').addEventListener('click', e => {
        e.preventDefault();
        if (e.target.id == "viewUserDetails") {
          console.log("eee")
          document.getElementById("verify-user-modal").classList.remove("hidden");
          console.log(e.target.parentElement.id);
          userID = e.target.parentElement.id;

          var imagesRef = storageRef.child('VALIDATION_FILES');
          var userFilesRef = imagesRef.child(userID);

          console.log(document.getElementById("idCard").options[0].text)
          db.collection('barangays').doc(barangayDoc).collection('users').doc(userID).get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                document.getElementById('fullName').value = doc.data()['firstName'] + " " + doc.data()['lastName'];
                document.getElementById('email').value = doc.data()['email'];
                document.getElementById('detailedAddress').value = doc.data()['detailedAddress'];
                document.getElementById('mobileNumber').value = doc.data()['number'];
                if (doc.data()['proofOfAddress'] == "Pending") {
                  document.getElementById('addressProof').selectedIndex = 0;
                } else if (doc.data()['proofOfAddress'] == "Failed") {
                  document.getElementById('addressProof').selectedIndex = 1;
                } else {
                  document.getElementById('addressProof').selectedIndex = 2;
                }

                if (doc.data()['idVerification'] == "Pending") {
                  document.getElementById('idCard').selectedIndex = 0;
                } else if (doc.data()['idVerification'] == "Failed") {
                  document.getElementById('idCard').selectedIndex = 1;
                } else {
                  document.getElementById('idCard').selectedIndex = 2;
                }


                storageRef.child(`VALIDATION_FILES/users/ ${userID}/ADDRESS_PROOF`).getDownloadURL().then(function (url) {
                  console.log(url)
                  document.getElementById('addressProofImage').setAttribute('src', url);
                }).catch(function (error) {
                  console.log(error.message)
                });

                storageRef.child(`VALIDATION_FILES/users/ ${userID}/ID_VALIDATION`).getDownloadURL().then(function (url) {
                  console.log(url)
                  document.getElementById('idCardImage').setAttribute('src', url);
                }).catch(function (error) {
                  console.log(error.message)
                });

              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }

            }).catch((error) => {
              console.log("Error getting document:", error);
            });
        }


      })

      document.getElementById("cancelVerify").addEventListener('click', e => {
        document.getElementById("verify-user-modal").classList.add("hidden");

        document.getElementById('addressProofImage').setAttribute('src', "https://via.placeholder.com/400x200");
        document.getElementById('idCardImage').setAttribute('src', "https://via.placeholder.com/400x200");
      })

      document.getElementById("submitVerify").addEventListener('click', e => {
        e.preventDefault();
        document.getElementById("verify-user-modal").classList.add("hidden");
        var idVerificationStatus = document.getElementById('idCard').options[document.getElementById('idCard').selectedIndex].innerText;
        var proofOfAddressStatus = document.getElementById('addressProof').options[document.getElementById('addressProof').selectedIndex].innerText;

        // // var credentialStatus;
        // var verifiedStatus;

        // if (idVerificationStatus == "Verified" && proofOfAddressStatus == "Verified") {
        //   // credentialStatus = true;
        //   verifiedStatus = true;
        // } else {
        //   // credentialStatus = false;
        //   verifiedStatus = false;
        // }

        db.collection('barangays').doc(barangayDoc).collection('users').doc(userID).update({
          idVerification: idVerificationStatus,
          proofOfAddress: proofOfAddressStatus,
          // credential: credentialStatus,
          // verified: verifiedStatus
        })
          .then(function () {
            console.log("User successfully updated");
          });

        document.getElementById('addressProofImage').setAttribute('src', "https://via.placeholder.com/400x200");
        document.getElementById('idCardImage').setAttribute('src', "https://via.placeholder.com/400x200");
        document.getElementById('register-users').click();
      })

    }).catch((error) => {
      console.log("Error getting document:", error);
    });




});

document.getElementById("certificate-indigency").addEventListener("click", e => {
  console.log("qqqqq");

  template = `
  <div
  class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 max-w-full max-h-screen overflow-scroll">

  <div
    class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">

    <div class="flex justify-between">

      <h2 class="text-4xl font-oswald">Certificate of Indigency</h2>
      <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
        <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
          <div class="flex">
            <span
              class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
              <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                  stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <input type="text"
            class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
            placeholder="Search">
        </div>
      </div>
    </div>
  </div>
  <div
    class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg  max-w-full">
    <table class="max-w-full min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Fullname</th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Purpose</th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Status</th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
            Requested At</th>
          <th class="px-6 py-3 border-b-2 border-gray-300"></th>
        </tr>
      </thead>
      <tbody class="bg-white"  id="indigency-table">
  `;

  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(barangayDoc).collection('requests').where("type", "==", "certificate_indigency").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        template += `
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">`

        template += `<div class="text-sm leading-5 text-blue-900" id="${doc.data()['author_id']}">${doc.data()['fullName']}</div>`
        template += `</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    ${doc.data()['purpose']}</td>`

        if (doc.data()['status'] == "Pending") {
          template += pending;
        } else if (doc.data()['status'] == "In-Progress") {
          template += inProgress;
        } else if (doc.data()['status'] == "Failed") {
          template += rejected;
        } else if (doc.data()['status'] == "Pickup") {
          template += pickup;
        } else {
          console.log(doc.data()['status'])
          template += completed;
        }
        // `<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        //   <span class="relative inline-block px-2 py-1 font-semibold text-red-900 leading-tight">
        //     <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
        //     <span class="relative text-xs">rejected</span>
        //   </span>
        // </td>`

        template += `<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    ${doc.data()['date_request']}</td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"  id="${doc.id}">
                    <button
                      class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" id ="view-request-details">View
                      Details</button>
                  </td>
                </tr>

                `
      });

      template += `
                  </tbody>
                </table>
              </div>
            </div>
      `

      template += `
      <div
      class="min-w-full max-h-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
      id="verify-indigency-modal">
      <div class="absolute bg-black opacity-80 inset-0 z-0 max-h-screen h-screen"></div>
      <div class="w-full max-w-3xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white pb-4">
        <!--content-->
        <div class="">
          <!--body-->
          <div class="text-center p-5 flex-auto justify-center">
          <i
              class="fa fa-id-card text-3xl mr-2" aria-hidden=" true"></i>
            <h2 class="text-xl font-bold py-2 ">Certificate of Indigency</h3>
              <p class="text-sm text-gray-500 px-8">Changes are only applied when the form is submitted</p>
          </div>

          <div class="max-w-full flex flex-row max-h-3/4 h-screen overflow-scroll">
            <div class="py-4 w-full">
              <div class="w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div class="px-6 bg-white border-b border-gray-200">
                    <form class="grid grid-cols-2 gap-4">
                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Full Name</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="name" value="" id="fullNameValue"
                          disabled>
                      </div>

                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Date Requested</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="requestDate" value="" id="requestDateValue"
                          disabled>
                      </div>

                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Detailed Address</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="address" value="" id="detailedAddressValue"
                          disabled>
                      </div>



                      
                      <div class="mb-4 grid grid-cols-2 gap-2">
                        <div >
                        <label class="text-xl text-gray-600">Copies</label></br>
                          <input type="text" class="border-2 border-gray-300 p-2 w-full" name="number" value="" id="copiesValue"
                            disabled>
                        </div>

                        
                        <div>
                          <label class="text-xl text-gray-600">Price</label></br>
                          <input type="text" class="border-2 border-gray-300 p-2 w-full" name="number" value="" id="priceValue"
                            disabled>
                        </div>
                      </div>

                      

                      <div class="mb-4">
                        <label class="text-xl text-gray-600">Purpose</label></br>
                        <input type="text" class="border-2 border-gray-300 p-2 w-full" name="purpose" value="" id="purposeValue"
                          disabled>
                      </div>

                      <div class=" w-full flex flex-col justify-evenly mb-4">
                        <label class="text-xl text-gray-600">Status</label>

                        <div class="relative inline-flex w-full">
                          <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                            <path
                              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                              fill="#648299" fill-rule="nonzero" />
                          </svg>
                          <select
                            class="border border-gray-300 rounded-xl w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                            id="requestStatus">
                            <option>Pending</option>
                            <option>In-Progress</option>
                            <option>Failed</option>
                            <option>Pickup</option>
                            <option>Completed</option>
                          </select>
                        </div>
                      </div>

                      <div class="mb-4 col-span-2 mx-auto">
                        <label class="text-xl text-gray-600">Pickup Date</label></br>
                        <input type="date"  name="pickup" value="" id="pickupDateValue"
                          >
                      </div>

                      
                    </form>
                    
                    <div class="flex flex-col w-full">
                    <button role="submit"
                      class="p-3 bg-blue-500 text-white hover:bg-blue-600 mb-2 rounded-md"
                      id="submitRequestIndigency">Submit</button>
                    </div>
                    <div class="flex flex-col  w-full">
                      <button class="p-3 bg-red-500 text-white hover:bg-red-600  mb-2 rounded-md"
                        id="cancelRequestIndigency">Cancel</button>
                    </div>

                    <div class="flex flex-col  w-full">
                      <button class="p-3 bg-green-500 text-white hover:bg-green-600 rounded-md"
                        id="generateRequestIndigency">Generate Certificate</button>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
      `


      content.innerHTML = template;
      var requestID;
      var authorID;




      document.getElementById("indigency-table").addEventListener("click", e => {
        e.preventDefault();
        if (e.target.id == "view-request-details") {
          document.getElementById("verify-indigency-modal").classList.remove("hidden");
          requestID = e.target.parentElement.id;
          authorID = e.target.parentElement.parentElement.children[0].children[0].id;



          var barangayDoc = localStorage.getItem('barangay');
          db.collection('barangays').doc(barangayDoc).collection('requests').doc(requestID).get()
            .then((doc) => {
              console.log(doc.data())


              var today = new Date();

              var reqDate = timeStampToDate(doc.data()['timestamp']['seconds'])


              document.getElementById("fullNameValue").value = doc.data()["fullName"];
              document.getElementById("requestDateValue").value = reqDate;
              document.getElementById("detailedAddressValue").value = doc.data()["address"];
              document.getElementById("copiesValue").value = doc.data()["copies"];
              document.getElementById("priceValue").value = doc.data()["price"];
              document.getElementById("purposeValue").value = doc.data()["purpose"];
              document.getElementById("pickupDateValue").value = doc.data()["date_complete"];

              if (doc.data()['status'] == "Pending") {
                document.getElementById('requestStatus').selectedIndex = 0;
              } else if (doc.data()['status'] == "In-Progress") {
                document.getElementById('requestStatus').selectedIndex = 1;
              } else if (doc.data()['status'] == "Failed") {
                document.getElementById('requestStatus').selectedIndex = 2;
              } else if (doc.data()['status'] == "Pickup") {
                document.getElementById('requestStatus').selectedIndex = 3;
              } else {
                document.getElementById('requestStatus').selectedIndex = 4;
              }

            }).catch((error) => {
              console.log("Error getting document:", error);
            });

        }
      });

      document.getElementById("cancelRequestIndigency").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("verify-indigency-modal").classList.add("hidden");
        console.log("cancel");
      });

      document.getElementById("submitRequestIndigency").addEventListener("click", e => {
        e.preventDefault();

        var pickupDateValue = document.getElementById("pickupDateValue").value
        var barangayDoc = localStorage.getItem('barangay');
        var statusValue = document.getElementById('requestStatus').value;

        console.log(requestID)
        db.collection('barangays').doc(barangayDoc).collection('requests').doc(requestID).update({
          date_complete: pickupDateValue,
          status: statusValue,
        }).then(function () {
          console.log("User successfully updated");
          if (statusValue == "Completed" || statusValue == "Failed") {
            db.collection('barangays').doc(barangayDoc).collection('users').doc(authorID).update({
              certificate_indigency: false,
            }).then(function () {
              console.log("Indigency Certificate set to False:");
            })
          } else {
            db.collection('barangays').doc(barangayDoc).collection('users').doc(authorID).update({
              certificate_indigency: true,
            }).then(function () {
              console.log("Indigency Certificate set to True:");
            })
          }

        }).catch((error) => {
          console.log("Error updating document:", error);
        });

        document.getElementById('certificate-indigency').click();

        document.getElementById("verify-indigency-modal").classList.add("hidden");
        console.log("submit");
      });

      document.getElementById("generateRequestIndigency").addEventListener("click", e => {
        if (document.getElementById("pickupDateValue").value != "" && document.getElementById('requestStatus').value == "Pickup") {
          db.collection('barangays').doc(barangayDoc).collection('requests').doc(requestID)
            .get()
            .then(doc => {
              localStorage.setItem("titleBarangay", camel2title(localStorage.getItem("barangay")));

              localStorage.setItem("certificateType", "Certificate of Indigency");
              let fullname = doc.data()["fullName"]
              localStorage.setItem("requesterName", fullname);

              let today = new Date(document.getElementById("pickupDateValue").value);
              let text = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
              localStorage.setItem("pickupDate", text);

              window.open(
                './document.html',
                '_blank' // <- This is what makes it open in a new window.
              );

              document.getElementById("submitRequestIndigency").click();
            })



        } else {
          window.alert("Pickup Date cannot be empty and Status must be Pickup")

        }
      })
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
})


function camel2title(camelCase) {
  // no side-effects
  return camelCase
    // inject space before the upper case letters
    .replace(/([A-Z])/g, function (match) {
      return " " + match;
    })
    // replace first char with upper case
    .replace(/^./, function (match) {
      return match.toUpperCase();
    });
}


var notActive = `
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
  <span class="relative inline-block px-2 py-1 font-semibold text-red-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">not active</span>
  </span>
</td>
  `

var active = `
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
  <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">active</span>
  </span>
</td>
  `

var disabled = `
  <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
  <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
    <span aria-hidden class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
    <span class="relative text-xs">disabled</span>
  </span>
</td>
  `;


var rejected = `
<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span class="relative inline-block px-2 py-1 font-semibold text-red-900 leading-tight">
                          <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                          <span class="relative text-xs">rejected</span>
                        </span>
                      </td>
`

var pending = `
<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span class="relative inline-block px-2 py-1 font-semibold text-yellow-900 leading-tight">
                          <span aria-hidden class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                          <span class="relative text-xs">pending</span>
                        </span>
                      </td>

`

var inProgress = `
<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span class="relative inline-block px-2 py-1 font-semibold text-indigo-900 leading-tight">
                          <span aria-hidden class="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"></span>
                          <span class="relative text-xs">In Progress</span>
                        </span>
                      </td>
`

var pickup = `
<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span class="relative inline-block px-2 py-1 font-semibold text-blue-900 leading-tight">
                          <span aria-hidden class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                          <span class="relative text-xs">Ready For Pickup</span>
                        </span>
                      </td>
`

var completed = `
<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                        <span class="relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                          <span class="relative text-xs">Completed</span>
                        </span>
                      </td>
`

