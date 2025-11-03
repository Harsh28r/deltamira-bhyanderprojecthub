
// // Function to show the popup
// function showPopup() {
//     var overlay = $('<div id="overlay"></div>');
//     setTimeout(function(){
//         overlay.show();
//         overlay.appendTo(document.body);
//         $('.popup-onload').show();
//     }, 5000);
//     $('.close2').click(function(){
//         $('.popup-onload').hide();
//         overlay.appendTo(document.body).remove();
//         // window.location.reload();
//         return false;
//     });
// }

// // Function to close the popup
// function closePopup(){
//     $('.popup-onload').hide();
//     $('#overlay').remove();
//     // window.location.reload();
//     return false;
// }

// // function checkPopup() {
// //     // Check if the form is submitted
// //     var isFormSubmitted = sessionStorage.getItem('formSubmitted');

// //     // If form is submitted, return
// //     if (isFormSubmitted === 'true') {
// //         return;
// //     }

// //     // Show popup form
// //     showPopup();

// //     // Schedule next check after 5 seconds
// //     setTimeout(checkPopup, 5000);
// // }

// // // Call the function to start checking
// // checkPopup();

// // // Function to display the popup every 5 seconds
// // function displayPopupEvery5Seconds() {
// //     setInterval(function() {
// //         showPopup();
// //         // setTimeout(closePopup, 3000); // Close the popup after 3 seconds
// //     }, 1000); // Show the popup every 5 seconds
// // }

// if (sessionStorage.getItem("popupformSubmitted") === "yes")  {
//     // Do something if form has been submitted
//     closePopup();
// } else {
//     // Do something if form has not been submitted
//     showPopup();
// }

$(document).ready(function() {
    var formSubmitted = sessionStorage.getItem('popupformSubmitted') === 'yes';

    // Show the modal after 30 seconds
    if (!formSubmitted) {
        setTimeout(function() {
            var overlay = $('<div id="overlay"></div>');
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup-onload').show();
        }, 30000);
        $('.close2').click(function(){
            $('.popup-onload').hide();
            $('#overlay').remove();
            return false;
        });
        $('#downloadLink').data('href', $('#downloadLink').attr('href')).removeAttr('href')
    }

    $('#downloadLink').on('click', function (event) {
        if (!formSubmitted) {
            event.preventDefault();
            var overlay = $('<div id="overlay"></div>');
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup-onload').show();
            $('.close2').click(function(){
                $('.popup-onload').hide();
                $('#overlay').remove();
                return false;
            });
        } else {
            $('#downloadLink').attr('href', $('#downloadLink').data('href'))
            window.location.href = $('#downloadLink').attr('href');
        }
    });

    // Show the modal again after 45 seconds if form not submitted and disable close button
    if (!formSubmitted) {
        setTimeout(function() {
            var overlay = $('<div id="overlay"></div>');
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup-onload').show();
            $('.close2').hide();
            $('#popupForm').on('submit', function (event) {
                $('.close2').show();
                $('.close2').click(function(){
                    $('.popup-onload').hide();
                    $('#overlay').remove();
                    return false;
                });
            });
        }, 45000); // 45 seconds after the initial 30 seconds
    }
});

