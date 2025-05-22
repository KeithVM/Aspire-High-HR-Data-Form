document.addEventListener('DOMContentLoaded', function() {
    const recruitmentForm = document.getElementById('recruitmentForm');
    if (!recruitmentForm) return;

    let employeeEntries = [];
    
    if(recruitmentForm) {
        function validateForm() {
            let isValid = true;

            // Clear all previous error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach((el) => el.textContent = '');

            function check(id, message) {
                const val = document.getElementById(id).value.trim();
                if (!val) {
                document.getElementById(id + 'Error').textContent = message;
                isValid = false;
                }
                return val;
            }

            check('firstName', 'First Name is required');
            check('lastName', 'Last Name is required');
            const email = check('email', 'Email is required');
            if (email && !/^\S+@\S+\.\S+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            check('phoneNumber', 'Phone Number is required');
            check('gender', 'Gender is required');
            check('jobTitle', 'Job Title is required');
            check('department', 'Department is required');
            check('candidateSource', 'Candidate Source is required');
            check('applicationStatus', 'Application Status is required');
            check('timeToHire', 'Time To Hire is required');

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
                "Time to Hire": document.getElementById('timeToHire').value,
                "sheetName": "Recruitment Data"
            };
        }
        
        // Function to clear form fields
        function clearForm() {
            recruitmentForm.reset();
        }
        
        //https://script.google.com/macros/s/AKfycbzv43vtvP6jvMWZs5rN2KGjFsSaamlOwBTKI2-kg16D89RhahRpA0Y1x5kGieVDKca9/exec

        // Form submission handler
        recruitmentForm.addEventListener('submit', function(event) {
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
    }
});