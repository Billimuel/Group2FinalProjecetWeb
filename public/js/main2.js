document.getElementById("certificate-residency").addEventListener("click", e => {
  console.log("qqqqq");

  template = `
  <div
  class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 max-w-full max-h-screen overflow-scroll">

  <div
    class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">

    <div class="flex justify-between">

      <h2 class="text-4xl font-oswald">Certificate of Residency</h2>
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
      <tbody class="bg-white"  id="residency-table">
  `;

  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(barangayDoc).collection('requests').where("type", "==", "certificate_residency").get()
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
      id="verify-residency-modal">
      <div class="absolute bg-black opacity-80 inset-0 z-0 max-h-screen h-screen"></div>
      <div class="w-full max-w-3xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white pb-4">
        <!--content-->
        <div class="">
          <!--body-->
          <div class="text-center p-5 flex-auto justify-center">
          <i
              class="fa fa-building text-3xl mr-2" aria-hidden=" true"></i>
            <h2 class="text-xl font-bold py-2 ">Certificate of Residency</h3>
              <p class="text-sm text-gray-500 px-8">Changes are only applied when the form is submitted</p>
          </div>

          <div class="max-w-full flex flex-row max-h-3/4 h-full overflow-scroll">
            <div class="py-4 w-full">
              <div class="w-full mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div class="px-6 bg-white border-b border-gray-200 h-96 overflow-scroll">
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

                    
                    <div class="flex justify-center max-w-full mb-4">
                      <img src="https://via.placeholder.com/400x200" id="cedulaProofImage" class="max-w-full">
                    </div>
                    
                    <div class="flex flex-col w-full">
                    <button role="submit"
                      class="p-3 bg-blue-500 text-white hover:bg-blue-600 mb-2 rounded-md"
                      id="submitRequestResidency">Submit</button>
                    </div>
                    <div class="flex flex-col  w-full">
                      <button class="p-3 bg-red-500 text-white hover:bg-red-600 mb-2 rounded-md"
                        id="cancelRequestResidency">Cancel</button>
                    </div>

                    <div class="flex flex-col  w-full">
                      <button class="p-3 bg-green-500 text-white hover:bg-green-600 rounded-md"
                        id="generateRequestResidency">Generate Certificate</button>
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




      document.getElementById("residency-table").addEventListener("click", e => {
        e.preventDefault();
        if (e.target.id == "view-request-details") {
          document.getElementById("verify-residency-modal").classList.remove("hidden");
          requestID = e.target.parentElement.id;



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



              var imagesRef = storageRef.child('REQUEST');
              storageRef.child(`REQUEST/${doc.data()["storage_id"]}/Cedula`).getDownloadURL().then(function (url) {
                console.log(url)
                document.getElementById('cedulaProofImage').setAttribute('src', url);
              }).catch(function (error) {
                console.log(error.message)
              });


            }).catch((error) => {
              console.log("Error getting document:", error);
            });

        }
      });

      document.getElementById("cancelRequestResidency").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("verify-residency-modal").classList.add("hidden");
        console.log("cancel");
      });

      document.getElementById("submitRequestResidency").addEventListener("click", e => {
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
              certificate_residency: false,
            }).then(function () {
              console.log("Residency Certificate set to False:");
            })
          } else {
            db.collection('barangays').doc(barangayDoc).collection('users').doc(authorID).update({
              certificate_residency: true,
            }).then(function () {
              console.log("Residency Certificate set to True:");
            })
          }
        }).catch((error) => {
          console.log("Error updating document:", error);
        });

        document.getElementById('certificate-residency').click();

        document.getElementById("verify-residency-modal").classList.add("hidden");
        console.log("submit");
      });


      document.getElementById("generateRequestResidency").addEventListener("click", e => {
        if (document.getElementById("pickupDateValue").value != "" && document.getElementById('requestStatus').value == "Pickup") {
          db.collection('barangays').doc(barangayDoc).collection('requests').doc(requestID)
            .get()
            .then(doc => {
              localStorage.setItem("titleBarangay", camel2title(localStorage.getItem("barangay")));

              localStorage.setItem("certificateType", "Certificate of Residency");
              let fullname = doc.data()["fullName"]
              localStorage.setItem("requesterName", fullname);

              let today = new Date(document.getElementById("pickupDateValue").value);
              let text = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
              localStorage.setItem("pickupDate", text);


              window.open(
                './document.html',
                '_blank' // <- This is what makes it open in a new window.
              );

              document.getElementById("submitRequestResidency").click();
            })






        } else {
          window.alert("Pickup Date cannot be empty and Status must be Pickup")

        }
      })


    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
});




