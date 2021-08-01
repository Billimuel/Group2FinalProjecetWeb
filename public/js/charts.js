document.getElementById("dashboard").addEventListener("click", e => {
  e.preventDefault();

  content.innerHTML =
    `
    <h2 class="text-4xl font-oswald pb-4">Dashboard | Charts and Data</h2>
    <div class="grid grid-cols-2 justify-center gap-4 max-h-screen h-screen overflow-y-scroll w-full px-4">
    <div
      class="w-3/4 h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4 col-span-2 mx-auto">
      <h2 class="text-center pt-2">Total Requests</h2>
      <canvas class="w-full h-full" id="totalRequestsChart">

      </canvas>

    </div>
    <div class="w-full h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4">
      <h2 class="text-center pt-2">Total Indigency</h2>
      <canvas class="w-full h-full" id="totalIndigencyChart">

      </canvas>
    </div>
    <div class="w-full h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4">
      <h2 class="text-center pt-2">Total Residency</h2>
      <canvas class="w-full h-full" id="totalResidencyChart">

      </canvas>
    </div>
    <div class="w-full h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4">
      <h2 class="text-center pt-2">Total Barangay Certificate</h2>
      <canvas class="w-full h-full" id="totalBarangayCertificateChart">

      </canvas>
    </div>
    <div class="w-full h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4">
      <h2 class="text-center pt-2">Total Barangay Clearance</h2>
      <canvas class="w-full h-full" id="totalBarangayClearanceChart">

      </canvas>
    </div>

    <div
      class="w-3/4 h-96 rounded shadow-2xl justify-around bg-gray-100 flex flex-col border-box p-4 col-span-2 mx-auto">
      <h2 class="text-center pt-2">Total Barangay ID Request</h2>
      <canvas class="w-full h-full" id="totalBarangayIDChart">

      </canvas>

    </div>
  </div>
  `


  var barangayDoc = localStorage.getItem('barangay');
  db.collection('barangays').doc(barangayDoc).collection('requests')
    .where("timestamp", "<=", new Date())
    .where("timestamp", ">", new Date(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
    .orderBy("timestamp", 'asc')
    .get()
    .then(function (querySnapshot) {
      var requests = ['Indigency', 'Residency', 'Barangay Certificate', 'Barangay Clearance', 'Barangay ID'];
      var requestsValues = [0, 0, 0, 0, 0]

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()["type"] == "barangay_id" || doc.data()["type"] == "barangay_id_replacement") {
          requestsValues[4] += 1;
        } else if (doc.data()["type"] == "certificate_indigency") {
          requestsValues[0] += 1;
        } else if (doc.data()["type"] == "certificate_residency") {
          requestsValues[1] += 1;
        } else if (doc.data()["type"] == "barangay_certificate") {
          requestsValues[2] += 1;
        } else {
          requestsValues[3] += 1;
        };


      });
      console.log(requestsValues);

      let totalRequestsChart = document.getElementById('totalRequestsChart').getContext('2d');
      var myChart = new Chart(totalRequestsChart, {
        type: 'bar',
        data: {
          labels: requests,
          datasets: [{
            label: 'Requests for the last 30 Days',
            data: requestsValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


  // var requests = ['Indigency', 'Residency', 'Barangay Certificate', 'Barangay Clearance', 'Barangay ID'];
  // var requestsValues = [0, 0, 0, 0, 0]
  // db.collection("orders")
  //   .where('timestamp', "<=", new Date())
  //   .where('timestamp', ">", new Date(new Date(Date.now() - days * 24 * 60 * 60 * 1000)))
  //   .orderBy('timestamp', 'asc')
  //   .get()
  //   .then(function (querySnapshot) {


  //     getDayLabels(days)
  //     querySnapshot.forEach(function (doc) {



  // Indigency
  db.collection('barangays').doc(barangayDoc).collection('requests')
    .where('timestamp', "<=", new Date())
    .where('timestamp', ">", new Date(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
    .orderBy('timestamp', 'asc')
    .get()
    .then(function (querySnapshot) {

      // totalNumOfRequests[date] = 0;
      // indigencyRequests[date] = 0;
      // residencyRequests[date] = 0;
      // barangayCertificateRequests[date] = 0;
      // barangayClearanceRequests[date] = 0;
      // barangayIDRequests[date] = 0;

      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let date = String(doc.data().timestamp.toDate()).substring(4, 10);
        if (Object.keys(totalNumOfRequests).includes(String(doc.data().timestamp.toDate()).substring(4, 10))) {
          if (doc.data().type == "certificate_indigency") {
            indigencyRequests[date] += 1;
          } else if (doc.data().type == "certificate_residency") {
            residencyRequests[date] += 1;
          } else if (doc.data().type == "barangay_certificate") {
            barangayCertificateRequests[date] += 1;
          } else if (doc.data()["type"] == "barangay_id" || doc.data()["type"] == "barangay_id_replacement") {
            barangayIDRequests[date] += 1;
          } else {
            barangayClearanceRequests[date] += 1;
          }
        }


      });

      // Residency
      let totalResidencyChart = document.getElementById('totalResidencyChart').getContext('2d');
      var totalResidencyChartctx = new Chart(totalResidencyChart, {
        type: 'line',
        data: {
          labels: Object.keys(residencyRequests),
          datasets: [{
            label: 'Request for the last 7 days',
            data: Object.values(residencyRequests),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });



      // Indigency
      let totalIndigencyChart = document.getElementById('totalIndigencyChart').getContext('2d');
      var totalIndigencyChartctx = new Chart(totalIndigencyChart, {
        type: 'line',
        data: {
          labels: Object.keys(indigencyRequests),
          datasets: [{
            label: 'Request for the last 7 days',
            data: Object.values(indigencyRequests),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });

      // Barangay Certificate
      let totalBarangayCertificateChart = document.getElementById('totalBarangayCertificateChart').getContext('2d');
      var totalBarangayCertificateChartctx = new Chart(totalBarangayCertificateChart, {
        type: 'line',
        data: {
          labels: Object.keys(barangayCertificateRequests),
          datasets: [{
            label: 'Request for the last 7 days',
            data: Object.values(barangayCertificateRequests),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });



      // Barangay Clearance
      let totalBarangayClearanceChart = document.getElementById('totalBarangayClearanceChart').getContext('2d');
      var totalBarangayClearanceChartctx = new Chart(totalBarangayClearanceChart, {
        type: 'line',
        data: {
          labels: Object.keys(barangayClearanceRequests),
          datasets: [{
            label: 'Request for the last 7 days',
            data: Object.values(barangayClearanceRequests),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });



      // Barangay ID
      let totalBarangayIDChart = document.getElementById('totalBarangayIDChart').getContext('2d');
      var totalBarangayIDChartctx = new Chart(totalBarangayIDChart, {
        type: 'line',
        data: {
          labels: Object.keys(barangayIDRequests),
          datasets: [{
            label: 'Request for the last 7 days',
            data: Object.values(barangayIDRequests),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });


    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });




});







var totalNumOfRequests = {};
var indigencyRequests = {};
var residencyRequests = {};
var barangayCertificateRequests = {};
var barangayClearanceRequests = {};
var barangayIDRequests = {};
getDayLabels()

function getDayLabels() {
  let days = 7;


  for (let x = 1; x <= days; x++) {
    let date = String(new Date(Date.now() - (days * 24 * 60 * 60 * 1000) + (x * 24 * 60 * 60 * 1000))).substring(4, 10);
    totalNumOfRequests[date] = 0;
    indigencyRequests[date] = 0;
    residencyRequests[date] = 0;
    barangayCertificateRequests[date] = 0;
    barangayClearanceRequests[date] = 0;
    barangayIDRequests[date] = 0;
  }
  console.log(barangayIDRequests)
}
