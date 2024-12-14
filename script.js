$(function() {
    $('#submit').on('click', function() {
      
      // Show loader animation
      $('#main-form').addClass('hidden');
      $('#loader').removeClass('hidden');
      $('#plane').addClass('animation');

      // Simulate form submission delay
      setTimeout(function () {
        $('#loader').addClass('hidden');
        $('#success').removeClass('hidden');
        $('#plane').removeClass('animation');
        $('#check').addClass('animation2');
      }, 3000);

      // 姓名
      var name = $('#demo_name').val() || '未填寫';

      var relation = $('#relation').val() || '未填寫';

      var num = $('#people-number').val() || '未填寫';

      // 電子郵件
      var mail = $('#demo_email').val() || '未填寫';

      // vegetarian radio check
      var is_vegetarian = $('[name="demo_veg"]').prop('checked') ? '是' : '否';

      // need_child_seat radio check
      var need_child_seat = $('[name="demo_child_chair"]').prop('checked') ? '是' : '否';

      // need_invitation radio check
      var need_invitation = $('[name="demo_invitation"]').prop('checked') ? '是' : '否';

      // post
      var data = {
        'entry.2011968773': name,
        'entry.1537783585': relation,
        'entry.999905413': num,
        'entry.1953885259': mail,
        'entry.1476509680': is_vegetarian,
        'entry.1197285354': need_child_seat,
        'entry.955700446': need_invitation, 
      };
      $.ajax({
        type: 'POST',
        url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeyaMygKukmQTOcMA9hhXEOJse9a3lKdGAVSL2fXop38rDEOA/formResponse',
        data: data,
        contentType: 'application/json',
        dataType: 'jsonp',
        complete: function() {
          console.log('資料已送出！');
        }
      });

      $('#return').on('click', function () {
        // Reset form and switch back to input view
        $('#success').addClass('hidden');
        $('#check').removeClass('animation2');
        $('#main-form').removeClass('hidden');
        $('#main-form')[0].reset();
      });
      
    });
});