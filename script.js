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
        const firstName = document.getElementById('fisrtName').value.trim();
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
        if (!lastName) {
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
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            gender: document.getElementById('gender').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            department: document.getElementById('department').value,
            candidateSource: document.getElementById('candidateSource').value,
            applicationStatus: document.getElementById('applicationStatus').value,
            interviewFeedback: document.getElementById('interviewFeedback').value.trim(),
            timeToHire: document.getElementById('timeToHire').value
        };
    }
    
    // Function to clear form fields
    function clearForm() {
        employeeForm.reset();
    }
    
    // Function to update the entries table
    function updateEntriesTable() {
        // Clear existing table rows
        entriesTableBody.innerHTML = '';
        
        // Add each entry to the table
        employeeEntries.forEach(entry => {
            const row = document.createElement('tr');
            
            // Format date for display
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toLocaleDateString();
            };
            
            row.innerHTML = `
                <td>${entry.firstName}</td>
                <td>${entry.lastName}</td>
                <td>${entry.email}</td>
                <td>${entry.phoneNumber}</td>
                <td>${entry.gender}</td>
                <td>${entry.jobTitle}</td>
                <td>${entry.department}</td>
                <td>${entry.candidateSource}</td>
                <td>${entry.employmentStatus}</td>
                <td>${entry.timeToHire}</td>
            `;
            
            entriesTableBody.appendChild(row);
        });
    }
    
    // Form submission handler
    employeeForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Validate the form
        if (validateForm()) {
            // Collect form data
            const employeeData = collectFormData();
            
            // Log the data to console
            console.log('Employee Data:', employeeData);
            
            // Add to entries array
            employeeEntries.push(employeeData);
            
            // Update the table
            updateEntriesTable();
            
            // Clear the form
            clearForm();
        }
    });
});