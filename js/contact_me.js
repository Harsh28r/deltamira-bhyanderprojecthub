
$(document).ready(function() {
    var form1Submitted = false;
    var form2Submitted = false;

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Additional error handling...
        },
        submitSuccess: function($form, event) {
            // Prevent multiple submissions based on form ID or class
            var formID = $form.attr('id');
            if (formID === 'popupForm' && form1Submitted) {
                return;
            }
            if (formID === 'contactForm' && form2Submitted) {
                return;
            }

            // Mark the form as submitted
            if (formID === 'popupForm') {
                form1Submitted = true;
            } else if (formID === 'contactForm') {
                form2Submitted = true;
            }

            event.preventDefault(); // Prevent default submit behavior
            // Get values from the form
            var name = $form.find("input#name").val();
            var number = $form.find("input#number").val();
            var project = $form.find("select#project").val();
            var message = $form.find("textarea#message").val();
            var firstName = name; // For success/failure message
            // Check for white space in the name for success/fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    number: number,
                    project: project,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message for popupForm
                    if (formID === 'popupForm') {
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');
                        sessionStorage.setItem('popupformSubmitted', 'yes');
                    }
                    // Success message for contactForm
                    else if (formID === 'contactForm') {
                        $('#success2').html("<div class='alert alert-success'>");
                        $('#success2 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success2 > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success2 > .alert-success')
                            .append('</div>');
                        sessionStorage.setItem('popupformSubmitted', 'yes');
                    }

                    // Clear all fields
                    $form.trigger("reset");
                },
                error: function() {
                    // Fail message for popupForm
                    if (formID === 'popupForm') {
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#success > .alert-danger').append('</div>');
                    }
                    // Fail message for contactForm
                    else if (formID === 'contactForm') {
                        $('#success2').html("<div class='alert alert-danger'>");
                        $('#success2 > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success2 > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#success2 > .alert-danger').append('</div>');
                    }

                    // Clear all fields
                    $form.trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    // When clicking on Full hide fail/success boxes
    $('#name').focus(function() {
        $('#success').html('');
    });

    // When clicking on Full hide fail/success boxes for contactForm
    $('#name').focus(function() {
        $('#success2').html('');
    });

});

