document.addEventListener('DOMContentLoaded', function() {
    const attendanceForm = document.getElementById('attendanceForm');
    if (!attendanceForm) return;

    if (attendanceForm) {
        const attendanceEntries = [];

        function validateForm() {
            let isValid = true;

            // Clear all previous error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');

            function check(id, message) {
            const val = document.getElementById(id).value.trim();
            if (!val) {
                document.getElementById(id + 'Error').textContent = message;
                isValid = false;
            }
            return val;
            }

            check('employeeID', 'Employee ID is required');
            check('date', 'Date is required');
            check('attendanceStatus', 'Attendance Status is required');

            return isValid;
        }

        function collectFormData() {
            return {
            "Employee ID": document.getElementById('employeeID').value.trim(),
            "Date": document.getElementById('date').value,
            "Attendance Status": document.getElementById('attendanceStatus').value,
            "Leave Type": document.getElementById('leaveType').value,
            "Overtime Hours Worked": document.getElementById('overtimeHours').value,
            "Leave Balance": document.getElementById('leaveBalance').value,
            "sheetName": "Attendance and Leave Data"
            };
        }

        function clearForm() {
            attendanceForm.reset();
        }

        attendanceForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (validateForm()) {
            const formDataObj = collectFormData();
            const formData = new URLSearchParams();
            for (const [key, value] of Object.entries(formDataObj)) {
                formData.append(key, value);
            }

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwbL2K-BEhZ2yq8qqbE3RY9lCaepstIORXDe0BRIQsQpq9-HQ6XYRv1IbNJ41gDqew/exec';

            fetch(scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
                .then(response => response.text())
                .then(result => {
                console.log('Response from script:', result);
                attendanceEntries.push(formDataObj);
                clearForm();
                })
                .catch(error => {
                console.error('Error submitting to Google Sheet:', error);
                });
            }
        });
    }
});