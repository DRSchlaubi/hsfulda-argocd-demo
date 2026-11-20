// Define the API base URL - now relative since we're serving from the same origin
const API_BASE_URL = '/api';

// Function to format date to a more readable format
function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to fetch events from the API
async function getEvents() {
  try {
    console.log('Fetching events from API...');
    const response = await axios.get(`${API_BASE_URL}/events`);
    const events = response.data;
    console.log('Events received:', events);

    const eventsList = document.getElementById('events-list');
    
    // If no events, show message
    if (!events || events.length === 0) {
      eventsList.innerHTML = `
        <div class="no-events-message">
          <i class="fas fa-calendar-times"></i>
          <p>No events found. Add your first event!</p>
        </div>
      `;
      return;
    }
    
    eventsList.innerHTML = ''; // Clear previous content

    // Ensure events is an array before sorting
    if (Array.isArray(events)) {
      // Sort events by date (newest first)
      events.sort((a, b) => new Date(a.date) - new Date(b.date));

      events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        
        // Add a random border color for visual distinction
        const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0'];
        eventDiv.style.borderLeftColor = colors[Math.floor(Math.random() * colors.length)];
        
        eventDiv.innerHTML = `
          <h3>${event.name}</h3>
          <p><i class="fas fa-calendar-day"></i> ${formatDate(event.date)}</p>
          <button class="btn-delete" onclick="deleteEvent(${event.id})">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        `;
        eventsList.appendChild(eventDiv);
      });
      
      // Add animation to events
      document.querySelectorAll('.event').forEach((event, index) => {
        event.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
        event.style.opacity = '0';
      });
    } else {
      console.error('Events data is not an array:', events);
      eventsList.innerHTML = `
        <div class="no-events-message">
          <p>Error: Received invalid data format from server.</p>
        </div>
      `;
    }
    
  } catch (error) {
    console.error('Error fetching events:', error);
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = `
      <div class="no-events-message">
        <p>Error loading events. Please try again later.</p>
      </div>
    `;
  }
}

// Function to delete an event with confirmation
async function deleteEvent(eventId) {
  // Ask for confirmation
  if (!confirm('Are you sure you want to delete this event?')) {
    return;
  }
  
  try {
    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`);
    console.log(response.data.message);
    
    // Show toast notification
    showNotification('Event deleted successfully!');

    // Refresh events list after deletion
    getEvents();
  } catch (error) {
    console.error('Error deleting event:', error);
    showNotification('Error deleting event', 'error');
  }
}

// Function to add a new event
async function addEvent() {
  const name = document.getElementById('event-name').value;
  const date = document.getElementById('event-date').value;

  try {
    const response = await axios.post(`${API_BASE_URL}/events`, { name, date });
    console.log(response.data.message);

    // Clear form fields after successful submission
    document.getElementById('event-name').value = '';
    document.getElementById('event-date').value = '';
    
    // Show notification
    showNotification('Event added successfully!');

    // Refresh events list
    getEvents();
  } catch (error) {
    console.error('Error adding event:', error);
    showNotification('Error adding event', 'error');
  }
}

// Toast notification function
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(-20px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Form submit event handler
document.getElementById('event-form').addEventListener('submit', function (event) {
  event.preventDefault();
  addEvent();
});

// Set minimum date for the date input to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('event-date').min = today;

// Load events when page loads
document.addEventListener('DOMContentLoaded', function() {
  getEvents();
}); 