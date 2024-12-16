
function encodeFormData(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

function validateField(field) {
  const id = field.id;
  const value = field.value.trim();

  switch (id) {
      case 'demo_name':
      case 'relation':
          return value.length > 0; // Allow any non-empty value
      case 'people-number':
      case 'demo_vegetarian':
      case 'demo_child_seat':
          return /^[0-9]+$/.test(value); // Allow only digits
      case 'demo_email':
        if (field.required) {
            return value.includes('@'); // Must include '@' if required
        }
        return value === '' || value.includes('@'); // Valid if empty or contains '@'
      case 'demo_address':
        if (field.required) {
            return value.length > 0; // Non-empty for required fields
        }
        return true; // Non-empty for required fields
      default:
          return true;
  }
}

function validateRadioSelection() {
  const invitation = document.querySelector('input[name="demo_invitation"]:checked');
  if (!invitation) return false;

  const emailField = document.getElementById('demo_email');
  const addressField = document.getElementById('demo_address');

  switch (invitation.value) {
      case '紙本喜帖':
          return validateField(addressField);
      case '電子喜帖':
          return validateField(emailField);
      case '都要':
          return validateField(addressField) && validateField(emailField); // Both are required
      case '都不要':
          return true; // No additional validation needed
      default:
          return false;
  }
}

function updateFieldStyles(field) {
  if (field === document.activeElement) {
      field.style.borderColor = '#0f7ef1'; // Blue for focused
  } else if (validateField(field)) {
      field.style.borderColor = 'forestgreen'; // Green for valid
  } else {
      field.style.borderColor = 'firebrick'; // Red for invalid
  }
}

document.addEventListener('DOMContentLoaded', function () {

  const fields = document.querySelectorAll('.form-field');
  const invitationRadios = document.querySelectorAll('input[name="demo_invitation"]');

  // Add focus and input event listeners for real-time validation and styling
  fields.forEach(field => {
      field.addEventListener('focus', () => updateFieldStyles(field));
      field.addEventListener('input', () => updateFieldStyles(field));
      field.addEventListener('blur', () => updateFieldStyles(field));
  });

  // Validate and toggle required fields based on radio selection
  invitationRadios.forEach(radio => {
      radio.addEventListener('change', function () {
          const emailField = document.getElementById('demo_email');
          const addressField = document.getElementById('demo_address');

          emailField.value = '';
          addressField.value = '';

          // Reset email and address field border colors
          emailField.style.borderColor = '#ddd';
          addressField.style.borderColor = '#ddd';

          document.getElementById('need-paper').classList.toggle('hidden-address', radio.id !== 'paper' && radio.id !== 'both');
          document.getElementById('need-electronic').classList.toggle('hidden-email', radio.id !== 'electronic' && radio.id !== 'both');

          if (radio.id === 'paper') {
              addressField.required = true;
              emailField.required = false;
          } else if (radio.id === 'electronic') {
              addressField.required = false;
              emailField.required = true;
          } else if (radio.id === 'both') {
              addressField.required = true;
              emailField.required = true;
          } else {
              addressField.required = false;
              emailField.required = false;
          }
      });
  });

  document.getElementById('submit').addEventListener('click', function () {

    const allValid = Array.from(fields).every(field => validateField(field)) && validateRadioSelection();

    if (!allValid) {
        alert('請確認表單是否填寫完整');
        event.preventDefault();
        return;
    }
    
    // Show loader animation
    document.getElementById('main-form').classList.add('hidden');
    document.getElementById('title').classList.add('hidden');
    document.getElementById('submit').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('thanks-msg').classList.remove('hidden');
    document.getElementById('success').classList.remove('hidden');

    // Gather form data
    const data = {
      'entry.463743869': document.getElementById('demo_name').value.trim(),
      'entry.751692474': document.getElementById('relation').value.trim(),
      'entry.1529339822': document.getElementById('people-number').value.trim(),
      'entry.1149959926': document.getElementById('demo_vegetarian').value.trim(),
      'entry.1016359044': document.getElementById('demo_child_seat').value.trim(),
      'entry.1820708072': document.getElementById('demo_email').value.trim(),
      'entry.1272793801': document.getElementById('demo_address').value.trim(),
      'entry.2106035706': document.getElementById('demo_message').value.trim(),
      'entry.684467016': document.querySelector('input[name=\"demo_invitation\"]:checked')?.value || '未填寫'
    };

    // Send the data using fetch
    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScal-z5FG2j8EqZHcEpY-RKTOjx9IFNqYbLJLmSerEq7jpHAQ/formResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodeFormData(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Submission successful!');
        } else {
            console.error('Failed to submit:', response.status);
        }
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('return').addEventListener('click', function () {
        // Reset form and switch back to input view
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('thanks-msg').classList.add('hidden');
        document.getElementById('success').classList.add('hidden');
        document.getElementById('need-paper').classList.add('hidden-address');
        document.getElementById('need-electronic').classList.add('hidden-email');
        document.getElementById('main-form').classList.remove('hidden');
        document.getElementById('submit').classList.remove('hidden');
        document.getElementById('title').classList.remove('hidden');
        document.getElementById('main-form').reset();

        // Reset field styles to initial state
        const fields = document.querySelectorAll('.form-field');
        fields.forEach(field => {
            field.style.borderColor = '#ddd'; // Reset border color
        });
    });
  });

  document.getElementById('paper').addEventListener('click', function () {
      document.getElementById('need-paper').classList.remove('hidden-address');
      document.getElementById('need-electronic').classList.add('hidden-email');
  });

  document.getElementById('electronic').addEventListener('click', function () {
      document.getElementById('need-paper').classList.add('hidden-address');
      document.getElementById('need-electronic').classList.remove('hidden-email');
  });

  document.getElementById('both').addEventListener('click', function () {
      document.getElementById('need-paper').classList.remove('hidden-address');
      document.getElementById('need-electronic').classList.remove('hidden-email');
  });

  document.getElementById('none').addEventListener('click', function () {
      document.getElementById('need-paper').classList.add('hidden-address');
      document.getElementById('need-electronic').classList.add('hidden-email');
  });
});
