const sidebarLinks = document.querySelectorAll('.sidebar__item');
const imgcloseBtn = document.getElementById('imgCloseBtn')
const addEmployeeBtn = document.getElementById('addEmployeeBtn')
const addEmployeeContainer = document.getElementById('addEmployeeContainer')
const editEmployeeContainer = document.getElementById('editEmployeeContainer')
const deletEmployeeContainer = document.getElementById('deleteEmployeeContainer')
const tableEmploye = document.getElementById("tableEmploye")


const base__url = "http://localhost:3000"



// sidebar navigation

    
if(sidebarLinks.length) {
    sidebarLinks.forEach((link) => {
      
      
        link.onclick = () => {
         
         sidebarLinks.forEach((li) => {
          if (li.classList.contains('activeSidebarLink')) {
            li.classList.remove('activeSidebarLink')
            }
          
         
         })
              link.classList.add('activeSidebarLink')
    }
    })
    
}
// /sidebar navigation

// function for add employee popup
function displayAddEmployeePopup() {
    addEmployeeContainer.style.display = "block"
    addEmployeeContainer.classList.remove('fadeoutPopup')
}


function displayDeleteEmployeePopup(empId) {

    const deleteEmployeBtn = document.getElementById('deleteEmployeBtn')
    
    deletEmployeeContainer.style.display = "block"
    deletEmployeeContainer.classList.remove('fadeoutPopup')

    deleteEmployeBtn.onclick = function (e) {
        deleteEmployee(empId)
        e.stopPropagation()
    }
}

function closeAddEmployeePopup() {
    addEmployeeContainer.classList.add('fadeoutPopup')
    editEmployeeContainer.classList.add('fadeoutPopup')
    deletEmployeeContainer.classList.add('fadeoutPopup')
}

// /function for add employee popup
function displayEditEmployeePopup() {
    editEmployeeContainer.style.display = "block"
    editEmployeeContainer.classList.remove('fadeoutPopup')
  
}

// Function to toggle dropdown
document.addEventListener('click', function(e) {
    const button = e.target.closest('.tableMoreIcon');
   
    if (button) {
        // Close any currently open dropdown
        document.querySelectorAll('.employeeDropdown.activeEmployeeDropdown').forEach(d => {
            if (d !== button.nextElementSibling) {
                d.classList.remove('activeEmployeeDropdown');
            }
        });
        
        // Toggle the clicked dropdown
        const dropdown = button.nextElementSibling;
        dropdown.classList.toggle('activeEmployeeDropdown');
        e.stopPropagation(); // Prevent click from closing the dropdown immediately
    } else {
        // Hide all dropdowns when clicking outside
        document.querySelectorAll('.employeeDropdown.activeEmployeeDropdown').forEach(d => d.classList.remove('activeEmployeeDropdown'));
    }
});


// notification function
// function requestNotification(value) {
//     Notification.requestPermission().then((result) => {
//         // console.log(result);
        
//         // if (result === 'granded'){
//             popUpNotification(value);
//         // } else {
//         //     console.log('Permision denied');
//         // }
//     })
// }

// function popUpNotification(value) {
//     const notification = new Notification('New Notification', {
//         body:value || "This is a default notification message"
//     })

//     notification.onclick = function () {
//         console.log('notification clicked');
        
//     }
// }
// /notification function


// fetch countries for input
  async function fetchCountries() {
            try {
                // Fetch country data from the REST Countries API
                const response = await fetch("https://restcountries.com/v3.1/all");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON response
                const countries = await response.json();
                console.log(countries);
                
                // Get the select element
                const countryAddSelect = document.getElementById('countryAddInp');

                // Populate the select dropdown with country options
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.cca2; // Use country code for value
                    option.textContent = country.name.common; // Use common name for display
                    countryAddSelect.appendChild(option);

                 
                });
                
                countryAddSelect.addEventListener('change', function () {
                   
                    // updateStates(this.value);
                });
                
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
}
        
//  async function updateStates(countryCode) {
//      console.log(countryCode);
     
//             const stateSelect = document.getElementById('stateAddInp');

//             // Clear existing options
         

//             if (countryCode) {
//                 try {
//                     // Fetch state data from the hypothetical API
//                     const response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states`,{headers:{"X-CSCAPI-KEY":apiConfig.cKey}});
//                        console.log(response);
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }

//                     // Parse the JSON response
//                     const states = await response.json();
                 
                    

//                     // Populate the state select dropdown
//                     states.forEach(state => {
//                         const option = document.createElement('option');
//                         option.value = state.code; // Assuming state code is provided
//                         option.textContent = state.name; // Assuming state name is provided
//                         stateSelect.appendChild(option);
//                     });

//                 } catch (error) {
//                     console.error('There was a problem with the fetch operation:', error);
//                 }
//             }
//         }
//         // Call the function to fetch and display countries


fetchCountries();


  

let employeeArray = [];

    const rowsPerPage = 5;
    var currentPage = 1;
    let totalPages = Math.ceil(employeeArray.length / rowsPerPage);
   
    

async function getAllEmployee() {
    try {

    let response = await fetch(base__url+"/employees")  
    const data = await response.json();
      employeeArray.push(...data)
      console.log(employeeArray);
      totalPages = Math.ceil(employeeArray.length / rowsPerPage);
        renderPagination(employeeArray)
       
      listPagButtons()
      
} catch (error) {
      console.log(error);
      
}
    
}

getAllEmployee()

  
    

function renderPagination(empArray) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, empArray.length);
    document.querySelector('.prevBtn').disabled = false
    document.querySelector('.nextBtn').disabled = false
    
      
    if (currentPage >= totalPages) {
     
          document.querySelector('.nextBtn').disabled =  true
    }
    if (currentPage < 1) {
    
        
        document.querySelector('.prevBtn').disabled = true
    }
    
    for (let i = startIndex; i < endIndex; i++) {
        let slicedEmp = empArray.slice(startIndex,endIndex)
        listEmployeeTable(slicedEmp,startIndex)
        
    }
}

function changePagBtnColor(page) {
    
     let pagBtn = document.querySelectorAll('.paginationBtn')
     
    for (let i = 0; i < totalPages; i++) {
        if (pagBtn[i].classList.contains('activePagBtn')) {
           pagBtn[i].classList.remove('activePagBtn')
       }
    }
    pagBtn[page-1].classList.add('activePagBtn')
   
}

function prevBtnFunction() {
   
  
    if (currentPage == 1) {
        document.querySelector('.prevBtn').disabled = true

    } else {  
        currentPage--
        changePagBtnColor(currentPage)
        renderPagination(employeeArray)
    }
}
function nextBtnFunction() {

    if (currentPage > 0 || currentPage < totalPages -2) {
      
        currentPage++
        changePagBtnColor(currentPage)
        renderPagination(employeeArray)
       
    }
}

function listPagButtons() {
   
    let paginationBtnBox = document.getElementById('listPagBtns')
  
    for (let i = 0; i < totalPages; i++) {
        paginationBtnBox.innerHTML += `
          <button  onclick="changePagBtns(event)"   class="paginationBtn ">${i+1}</button>
        `
    }
    changePagBtnColor(currentPage)
 
}

function changePagBtns(e) {
   
    let paginationBtn = e.target
    currentPage = paginationBtn.innerHTML
     changePagBtnColor(currentPage)
          
    renderPagination(employeeArray)

}

function listEmployeeTable(employeeArray,startIndex) {
    tableEmploye.innerHTML = " "
    
    let indexElm = startIndex+1
  if (employeeArray.length !== 0) {
    employeeArray.forEach((employee) => {
     
    let imgUrl = `http://localhost:3000/employees/${employee.id}/avatar`
    
   
        
    tableEmploye.innerHTML += 
       `<tr id="employeeRow">
              <td>#${indexElm++}</td>
              <td>${employee.salutation}. ${employee.firstName}</td>
              <td style="padding-left:10%" class="tableProfileRow">
                <img class="tableProfileImg" src="${imgUrl}" alt="">
                ${employee.email}
              </td>
              <td>${employee.phone}</td>
              <td>${employee.gender}</td>
              <td>${employee.dob}</td>
              <td>${employee.country}</td>
              <td class="employeeEditIcon ">
                <span class="tableMoreIcon">
                   <i class="fa-solid fa-ellipsis"></i>
                </span>
                <div id="employeeDropdown" class="employeeDropdown">
                    <a href="/details.html?id=${employee.id}" class="employeeDropDown__item"><i class="fa-regular fa-eye"></i>View Details</a>
                    <span class="employeeDropDown__item" onClick="getOneEmployee('${employee.id}')"><i class="fa-regular fa-edit"></i>Edit</span>
                    <span class="employeeDropDown__item" onClick ="displayDeleteEmployeePopup('${employee.id}')"><i class="fa-regular fa-trash-can"></i>Delete</span>
                </div>
              </td>
            
        </tr>`
    
})

} else {
     tableEmploye.innerHTML += `<td classs="noUserTag">No Users added</td>`
     console.log("no data to display");
    
}

}

function filterEmployee() {
    
    let searchInp = document.getElementById('searchInp').value
    
    tableEmploye.innerHTML = " "
    const lowerCaseInput = searchInp.toLowerCase();
          
    let filteredArray = employeeArray.filter(employee => 
         employee.firstName.toLowerCase().includes(lowerCaseInput) ||
         employee.email.toLowerCase().includes(lowerCaseInput) ||
         employee.lastName.toLowerCase().includes(lowerCaseInput)
     )
    
    return filteredArray
}
  
function searchUser() {
         
            let employeeArrayLocal =  filterEmployee()
             
            renderPagination(employeeArrayLocal)
}


 
    
async function getOneEmployee(empId) {
   
    try {
      
      const response = await fetch(base__url + "/employees/" + empId)
      const data = await response.json()
     
        console.log(data);
   
        if (data) {
                    
            document.getElementById('salutationEditInp').value = data.salutation                
            document.getElementById("firstnameEditInp").value = data.firstName                
            document.getElementById("lastnameEditInp").value = data.lastName                
            document.getElementById("emailEditInp").value = data.email                
            document.getElementById("mobileEditInp").value = data.phone                
            document.getElementById("dobEditInp").value = data.dob                
            document.getElementById("qualificationsEditInp").value = data.qualifications                
            document.getElementById("addressEditInp").value = data.address                
            document.getElementById("countryEditInp").value = data.country   
            document.getElementById("stateEditInp").value = data.state   
            document.getElementById("cityEditInp").value = data.city   
            document.getElementById("pinEditInp").value = data.pin   
            document.getElementById("editEmployeeId").value = data.id  
           let imgUrl = `http://localhost:3000/employees/${data.id}/avatar`
            document.getElementById('ImgPreview').src = imgUrl
              if (data.gender === 'Male') {
                  document.getElementById('genderEditMale').checked = true;
                } else if (data.gender === 'Female') {
                    document.getElementById('genderEditFemale').checked = true;
            }
            
          
        }
        

      
        displayEditEmployeePopup()
    
     
    } catch (error) {
        console.log(error);
        
    }

   
}

async function deleteEmployee(empId) {
 
   
    try {
        
        const response = await fetch(base__url + "/employees/" + empId,{ method: 'DELETE' })
        const data = await response.json()
     
          console.log(data);
    } catch (error) {
        console.log(error);
        
    }
  
    
}


async function addEmployee(e) {
        
    e.preventDefault()

    try {

        const salutationAddInp = document.getElementById("salutationAddInp")?.value
        const firstnameAddInp = document.getElementById("firstnameAddInp")?.value
        const lastnameAddInp = document.getElementById("lastnameAddInp")?.value
        const emailAddInp = document.getElementById("emailAddInp")?.value
        const mobileAddInp = document.getElementById("mobileAddInp")?.value
        const dobAddInp = document.getElementById("dobAddInp")?.value
        const qualificationsAddInp = document.getElementById("qualificationsAddInp")?.value
        const addressAddInp = document.getElementById("addressAddInp")?.value
        const countryAddInp = document.getElementById("countryAddInp")?.value
        const stateAddInp = document.getElementById("stateAddInp")?.value
        const cityAddInp = document.getElementById("cityAddInp")  ?.value  
        const pinAddInp = document.getElementById("pinAddInp")?.value
        const genderAddInp = document.querySelector('input[name="genderOption"]:checked')?.value
         const addImgInp = document.getElementById('addImgInp')
 
         const [year, month, day] = dobAddInp.split('-');
         const formattedDate = `${day}-${month}-${year}`;
        
      
 

    // form validation
        if (!firstnameAddInp || !lastnameAddInp || !emailAddInp || !mobileAddInp || !mobileAddInp || !dobAddInp || !qualificationsAddInp || !addressAddInp || !countryAddInp || !stateAddInp || !cityAddInp || !pinAddInp || !genderAddInp)
            return alert('please enter all the fields')
        
        if (mobileAddInp.length !== 10) {
           return alert('please enter correct mobile number')
       }
       
        

const formDetails ={
 
            salutation: salutationAddInp,
            firstName: firstnameAddInp,
            lastName: lastnameAddInp,
            email: emailAddInp,
            phone: mobileAddInp,
            dob: formattedDate,
            gender: genderAddInp,
            qualifications: qualificationsAddInp,
            address: addressAddInp,
            country: countryAddInp,
            state: stateAddInp,
            city: cityAddInp,
            pin: pinAddInp,
            username:firstnameAddInp +lastnameAddInp,
            password:"pass1234"
  }


                                   
   const response = await fetch(base__url+"/employees", {
                            method: 'POST',
                            mode: 'cors', // this cannot be 'no-cors'
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formDetails),
                                                                   
                                    
   });
        
        const data = await response.json()

        if (data.id) {
            uploadImage(data.id, addImgInp)
           
       }
       
    } catch (error) {
        console.log(error);
        
    }
}

async function uploadImage(empId,addImgInp) {
    
    try {
         
        if (addImgInp.files.length > 0) {
            // Get the file
              const imgFile = addImgInp.files[0]; // Assuming only one file is selected
              const formData = new FormData();
            // Create a FormData object
              formData.append('avatar', imgFile);
            
             const response = await fetch(base__url+"/employees/"+empId+"/avatar", { 
                               method: 'POST',
                               body: formData
                              }); 
            const data = await response.json()
          
            console.log(data);

        } 


        
          
      } catch (error) {
        console.error(error)
      }
}


function previewImage(event) {
   
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('ImgPreview').src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }

}

async function editEmployee() {
   
    try {
        let salutationEditInp = document.getElementById("salutationEditInp")?.value
        let firstnameEditInp = document.getElementById("firstnameEditInp")?.value
        let lastnameEditInp = document.getElementById("lastnameEditInp")?.value
        let emailEditInp = document.getElementById("emailEditInp")?.value
        let mobileEditInp = document.getElementById("mobileEditInp")?.value
        let dobEditInp = document.getElementById("dobEditInp")?.value
        let qualificationsEditInp = document.getElementById("qualificationsEditInp")?.value
        let addressEditInp = document.getElementById("addressEditInp")?.value
        let countryEditInp = document.getElementById("countryEditInp")?.value
        let stateEditInp = document.getElementById("stateEditInp")?.value
        let cityEditInp = document.getElementById("cityEditInp")  ?.value  
        let pinEditInp = document.getElementById("pinEditInp")?.value
        let empId = document.getElementById("editEmployeeId")?.value 
        let genderEditInp = document.querySelector('input[name="genderEditInp"]:checked')?.value
        const editImgInp = document.getElementById('editImgInp')

       

       
        //  const [year, month, day] = dobAddInp.split('-');
        //  const formattedDate = `${year}-${month}-${day}`;
            
        const formDetails = {
            salutation: salutationEditInp,
            firstName: firstnameEditInp,
            lastName: lastnameEditInp,
            email: emailEditInp,
            phone: mobileEditInp,
            dob: dobEditInp,
            qualifications: qualificationsEditInp,
            address: addressEditInp,
            country: countryEditInp,
            state: stateEditInp,
            city: cityEditInp,
            pin: pinEditInp,
            gender: genderEditInp,
            username: firstnameEditInp + lastnameEditInp,
            password: "pass1234",
            
        }        
      
       // form validatioeEditInp
        if (!firstnameEditInp || !lastnameEditInp || !emailEditInp || !mobileEditInp || !mobileEditInp || !dobEditInp || !qualificationsEditInp || !addressEditInp|| !countryEditInp|| !stateEditInp || !cityEditInp || !pinEditInp || !genderEditInp)
            return alert('please enter all the fields')
        
       
        if (mobileEditInp.length !== 10) {
           return alert('please enter correct mobile number')
       }
       
      
      
      const response = await fetch(base__url+"/employees/"+empId, { 
                                method: 'PUT', 
                                headers: { 
                                  'Content-type': 'application/json'
                                }, 
                                body: JSON.stringify(formDetails) 
                              }); 
      
        const data = await response.json()
        
        if (data) {
             uploadImage(empId, editImgInp)
           
        }
       
        
     
    } catch (error) {
        console.log(error);
        
    }
    
}






