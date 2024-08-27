const sidebarLinks = document.querySelectorAll('.sidebar__item');
const imgcloseBtn = document.getElementById('imgCloseBtn')
const editEmployeeContainer = document.getElementById('editEmployeeContainer')
const deletEmployeeContainer = document.getElementById('deleteEmployeeContainer')
const base__url = "http://localhost:3000"

if(sidebarLinks.length) {
    sidebarLinks.forEach((link) => {
      
      
        link.onclick = () => {
         
         sidebarLinks.forEach((li) => {
          if (li.classList.contains('activeSidebarLink')) {
            li.classList.remove('activeSidebarLink')
            }
            link.classList.add('activeSidebarLink')
         
        })
    }
    })
    
}
// /sidebar navigation

// notification function
function requestNotification() {
    Notification.requestPermission().then((result) => {
        if (result === 'granded'){
            popUpNotification();
        } else {
            console.log('Permision denied');
        }
    })
}

function popUpNotification(value) {
    const notification = new Notification('New Notification', {
        body:value || "This is a default notification message"
    })

    notification.onclick = function () {
        console.log('notification clicked');
        
    }
}
// /notification function



const viewPage = new URLSearchParams(document.location.search)
const empId = viewPage.get("id")

// function that convert dob to age
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

async function getEmployeeDetails() {    
     
    try {
      
      const response = await fetch(base__url+"/employees/" + empId)
      const data = await response.json()
     
        console.log(data);
            document.getElementById("employeeName").innerHTML = data.firstName +data.lastName              
            document.getElementById("employeeEmail").innerHTML =  data.email              
            document.getElementById("employeeGender").innerHTML = data.gender                
            document.getElementById("employeeAge").innerHTML = calculateAge(data.dob)                
            document.getElementById("employeeDob").innerHTML = data.dob                
            document.getElementById("employeeMobile").innerHTML = data.phone                
            document.getElementById("employeeQualifications").innerHTML = data.qualifications                
            document.getElementById("employeeAddress").innerHTML = data.address   
            document.getElementById("employeeUsername").innerHTML = data.username   
            let imgUrl = `http://localhost:3000/employees/${data.id}/avatar`
            document.getElementById("employeeProfileImg").src = `${imgUrl}`
            
   
    } catch (error) {
        console.log(error);
        
    }
}

getEmployeeDetails()


function displayDeleteEmployeePopup() {

    const deleteEmployeBtn = document.getElementById('deleteEmployeBtn')
    
    deletEmployeeContainer.style.display = "block"
    deletEmployeeContainer.classList.remove('fadeoutPopup')

    deleteEmployeBtn.onclick = function (e) {
        deleteEmployee(empId)
        e.stopPropagation()
    }
}

function displayEditEmployeePopup() {

    editEmployeeContainer.style.display = "block"
    editEmployeeContainer.classList.remove('fadeoutPopup')
     
   
  
}


function closeAddEmployeePopup() {
  
    editEmployeeContainer.classList.add('fadeoutPopup')
    deletEmployeeContainer.classList.add('fadeoutPopup')
}

async function getOneEmployee() {
   
    try {
      
      const response = await fetch(base__url + "/employees/" + empId)
      const data = await response.json()
   
   
        
   
        if (data) {

            let imgUrl = `http://localhost:3000/employees/${data.id}/avatar`

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
            document.getElementById('editImgPreview').src = imgUrl 
            
         
           
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

function previewImage(event) {
   
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('editImgPreview').src = e.target.result;
        };
        
        reader.readAsDataURL(file);
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
       
        


        //  const [year, month, day] = dobEditInp..split('-');
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

        console.log(formDetails);
        
      
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
     
        console.log(data);
        if(data) uploadImage(empId,editImgInp)
       
        
     
    } catch (error) {
        console.log(error);
        
    }
    
}

async function deleteEmployee() {
    

   
    try {
        
        const response = await fetch(base__url + "/employees/" + empId,{ method: 'DELETE' })
        const data = await response.json()
     
        console.log(data);
        location.href = "/index.html"
    } catch (error) {
        console.log(error);
        
    }
  
    
}