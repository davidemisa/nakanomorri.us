<?php

// check for form submission - if it doesn�t exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != "contact-form") {
    header("Location: .html#rsvp"); exit;
}


// get the posted data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$attending = $_POST['radio_group'];
$location = $_POST['location'];

// write the email content
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Message:\n\n$message";
$email_content .= "Attending:\n\n$attending";
$email_content .= "Where:\n\n$location";

// TODO send the email
mail ("morridavide@gmail.com", "New Contact Message from NakanoMorri", $email_content);

// send the user back to the form
//TODO capire per pagine separate
header("Location: italy.html#rsvp"); exit;

?>
