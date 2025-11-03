<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['number']) 		||
   empty($_POST['project']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['number'],FILTER_VALIDATE_INT))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$number = $_POST['number'];
$project = $_POST['project'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'mirabhayandarpropertieshub@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nNumber: $number\n\nProject: $project\n\nMessage:\n$message";
$headers = "From: mirabhayandarprojectshub@gmail.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
mail($to,$email_subject,$email_body,$headers);
return true;			
?>