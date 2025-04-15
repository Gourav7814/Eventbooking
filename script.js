document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const bookingForm = document.getElementById('bookingForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  let selectedDate = null;

  // Initialize FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    dateClick: function (info) {
      selectedDate = info.dateStr;  // Get the selected date in ISO format
      alert('Selected date: ' + selectedDate); // Alert to confirm the date selected
    },
    events: [] // Initialize with no events (you can dynamically add events later)
  });

  // Render the calendar
  calendar.render();

  // Booking Form Submission
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const contact = formData.get('contact');
    const eventType = formData.get('eventType');
    const attendees = formData.get('attendees');

    // Validate contact number (should be exactly 10 digits)
    if (!/^\d{10}$/.test(contact)) {
      alert('Please enter a valid 10-digit contact number.');
      return;
    }

    // Ensure a date is selected
    if (!selectedDate) {
      alert('Please select a date from the calendar.');
      return;
    }

    // Add the event to the calendar
    calendar.addEvent({
      title: `${eventType} - ${name}`,
      start: selectedDate,
      description: `Contact: ${contact}`,
      backgroundColor: '#4ade80',
      borderColor: '#4ade80'
    });

    // Show Confirmation Message
    confirmationMessage.style.display = 'block';
    confirmationMessage.textContent = "🎉 Your event has been booked successfully!";

    // Reset form and clear selected date
    bookingForm.reset();
    selectedDate = null;

    // Hide confirmation message after 5 seconds
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 5000);
  });
});
