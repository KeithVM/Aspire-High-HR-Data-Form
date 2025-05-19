document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employeeForm');
    const entriesTableBody = document.getElementById('entriesTableBody');
    
    // Array to store submitted entries
    let employeeEntries = [];
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Clear previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        // Validate First Name
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            document.getElementById('firstNameError').textContent = 'First Name is required';
            isValid = false;
        }

        // Validate Last Name
        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            document.getElementById('lastNameError').textContent = 'Last Name is required';
            isValid = false;
        }
        
        // Validate Email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        //Validate Phone Number
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        if (!phoneNumber) {
            document.getElementById('phoneNumberError').textContent = 'Phone Number is required';
            isValid = false;
        }

        //Validate Gender
        const gender = document.getElementById('gender').value.trim();
        if (!gender) {
            document.getElementById('genderError').textContent = 'Gender is required';
            isValid = false;
        }

        // Validate Job Title
        const jobTitle = document.getElementById('jobTitle').value.trim();
        if (!jobTitle) {
            document.getElementById('jobTitleError').textContent = 'Job Title is required';
            isValid = false;
        }
        
        // Validate Department
        const department = document.getElementById('department').value;
        if (!department) {
            document.getElementById('departmentError').textContent = 'Department is required';
            isValid = false;
        }
        
        //Validate Candidate Source
        const candidateSource = document.getElementById('candidateSource').value;
        if (!candidateSource) {
            document.getElementById('candidateSourceError').textContent = 'Candidate Source is required';
            isValid = false;
        }

        // Validate Application Status
        const applicationStatus = document.getElementById('applicationStatus').value;
        if (!applicationStatus) {
            document.getElementById('applicationStatusError').textContent = 'Application Status is required';
            isValid = false;
        }

        // Validate Time To Hire
        const timeToHire = document.getElementById('timeToHire').value;
        if (!timeToHire) {
            document.getElementById('timeToHireError').textContent = 'Time To Hire is required';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to collect form data
    function collectFormData() {
        return {
            "First Name": document.getElementById('firstName').value.trim(),
            "Last Name": document.getElementById('lastName').value.trim(),
            "Email-ID": document.getElementById('email').value.trim(),
            "Phone": document.getElementById('phoneNumber').value.trim(),
            "Gender": document.getElementById('gender').value,
            "University": document.getElementById('university').value,
            "Position Applied": document.getElementById('jobTitle').value,
            "Department": document.getElementById('department').value,
            "Candidate Source": document.getElementById('candidateSource').value,
            "Application Status": document.getElementById('applicationStatus').value,
            "Interview Feedback": document.getElementById('interviewFeedback').value.trim(),
            "Time to Hire": document.getElementById('timeToHire').value
        };
    }
    
    // Function to clear form fields
    function clearForm() {
        employeeForm.reset();
    }
    
    //https://script.google.com/macros/s/AKfycbzv43vtvP6jvMWZs5rN2KGjFsSaamlOwBTKI2-kg16D89RhahRpA0Y1x5kGieVDKca9/exec

    // Form submission handler
    employeeForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Validate the form
        if (validateForm()) {
            const employeeData = collectFormData();

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwbL2K-BEhZ2yq8qqbE3RY9lCaepstIORXDe0BRIQsQpq9-HQ6XYRv1IbNJ41gDqew/exec';
            const formData = new URLSearchParams();
            for (const [key, value] of Object.entries(employeeData)) {
                formData.append(key, value);
            }

            fetch(scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                console.log('Response from script:', result);
                employeeEntries.push(employeeData);
                clearForm();
            })
            .catch(error => {
                console.error('Error submitting to Google Sheet:', error);
            });

        }
    });
});