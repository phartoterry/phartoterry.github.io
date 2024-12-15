// $(function() {
//     $('#submit').on('click', function() {
      
//       // Show loader animation
//       $('#main-form').addClass('hidden');
//       $('#title').addClass('hidden');
//       $('#loader').removeClass('hidden');
//       $('#thanks-msg').removeClass('hidden');
//       $('#success').removeClass('hidden');

//       // 姓名
//       var name = $('#demo_name').val() || '未填寫';

//       var relation = $('#relation').val() || '未填寫';

//       var num_people = $('#people-number').val() || '未填寫';

//       // Vegetarian number
//       var num_vegetarian = $('#demo_vegetarian').val() || '未填寫';

//       // Child seat number
//       var num_child_seat = $('#demo_child_seat').val() || '未填寫';

//       // need_invitation radio check
//       var invitaiton_type = $('input[name="demo_invitation"]:checked').val() || '未填寫';

//       // Email for electronic invitation
//       var mail = $('#demo_email').val() || '無';

//       // Address for paper invitation
//       var address = $('#demo_address').val() || '無';

//       // Message
//       var messages = $('#demo_message').val() || '無';

//       // post
//       var data = {
//         'entry.2011968773': name,
//         'entry.1537783585': relation,
//         'entry.999905413': num_people,
//         'entry.1476509680' : num_vegetarian,
//         'entry.1197285354': num_child_seat,
//         'entry.1953885259': mail,
//         'entry.589875455': address,
//         'entry.686852954': messages,
//         'entry.955700446': invitaiton_type
//       };
      
//       $.ajax({
//         type: 'POST',
//         url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeyaMygKukmQTOcMA9hhXEOJse9a3lKdGAVSL2fXop38rDEOA/formResponse',
//         data: data,
//         contentType: 'application/json',
//         dataType: 'jsonp',
//         complete: function() {
//           console.log('資料已送出！');
//         }
//       });

//       $('#return').on('click', function () {
//         // Reset form and switch back to input view
//         $('#loader').addClass('hidden');
//         $('#thanks-msg').addClass('hidden');
//         $('#success').addClass('hidden');
//         $('#main-form').removeClass('hidden');
//         $('#title').removeClass('hidden');
//         $('#main-form')[0].reset();
//       });
      
//     });

//     $('#paper').on('click', function() {
//       $('#need-paper').removeClass('hidden-address');
//       $('#need-electronic').addClass('hidden-email');
//     });

//     $('#electronic').on('click', function() {
//       $('#need-paper').addClass('hidden-address');
//       $('#need-electronic').removeClass('hidden-email');
//     });

//     $('#both').on('click', function() {
//       $('#need-paper').removeClass('hidden-address');
//       $('#need-electronic').removeClass('hidden-email');
//     });

//     $('#none').on('click', function() {
//       $('#need-paper').addClass('hidden-address');
//       $('#need-electronic').addClass('hidden-email');
//     });
// });

function encodeFormData(data) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit').addEventListener('click', function () {
      // Show loader animation
      document.getElementById('main-form').classList.add('hidden');
      document.getElementById('title').classList.add('hidden');
      document.getElementById('submit').classList.add('hidden');
      document.getElementById('loader').classList.remove('hidden');
      document.getElementById('thanks-msg').classList.remove('hidden');
      document.getElementById('success').classList.remove('hidden');

      // Gather form data
      const data = {
        'entry.2011968773': document.getElementById('demo_name').value || '未填寫',
        'entry.1537783585': document.getElementById('relation').value || '未填寫',
        'entry.999905413': document.getElementById('people-number').value || '未填寫',
        'entry.1476509680': document.getElementById('demo_vegetarian').value || '未填寫',
        'entry.1197285354': document.getElementById('demo_child_seat').value || '未填寫',
        'entry.1953885259': document.getElementById('demo_email').value || '無',
        'entry.589875455': document.getElementById('demo_address').value || '無',
        'entry.686852954': document.getElementById('demo_message').value || '無',
        'entry.955700446': document.querySelector('input[name=\"demo_invitation\"]:checked')?.value || '未填寫'
      };

      // Send the data using fetch
      fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeyaMygKukmQTOcMA9hhXEOJse9a3lKdGAVSL2fXop38rDEOA/formResponse', {
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
          document.getElementById('main-form').classList.remove('hidden');
          document.getElementById('submit').classList.remove('hidden');
          document.getElementById('title').classList.remove('hidden');
          document.getElementById('main-form').reset();
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
