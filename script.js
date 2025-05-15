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
        
        // Validate Full Name
        const firstName = document.getElementById('fisrtName').value.trim();
        if (!firstName) {
            document.getElementById('firstNameError').textContent = 'First Name is required';
            isValid = false;
        }

        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            document.getElementById('lastNameError').textContent = 'Last Name is required';
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
        
        // Validate Email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate Employment Status
        const employmentStatus = document.getElementById('employmentStatus').value;
        if (!employmentStatus) {
            document.getElementById('employmentStatusError').textContent = 'Employment Status is required';
            isValid = false;
        }
        
        // Validate Start Date
        const startDate = document.getElementById('startDate').value;
        if (!startDate) {
            document.getElementById('startDateError').textContent = 'Start Date is required';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to collect form data
    function collectFormData() {
        return {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            jobTitle: document.getElementById('jobTitle').value.trim(),
            department: document.getElementById('department').value,
            email: document.getElementById('email').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            employmentStatus: document.getElementById('employmentStatus').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            notes: document.getElementById('notes').value.trim()
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
                <td>${entry.jobTitle}</td>
                <td>${entry.department}</td>
                <td>${entry.email}</td>
                <td>${entry.employmentStatus}</td>
                <td>${formatDate(entry.startDate)}</td>
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