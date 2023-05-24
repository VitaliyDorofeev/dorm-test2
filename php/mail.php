<?php

//Script Foreach
$c = true;

// For POST method only!

// Save Basic Form parameters
$project_name = "dorof.vital92@gmail.com";
$admin_email = "dorof.vital92@gmail.com";
$email_from = "info@ck71607.tmweb.ru";

// Create an associative array to store form data
$form_data = array();

// Serialize form fields - that filled-in by User
foreach ($_POST as $key => $value) {
    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" && $key != "email_from") {
        $form_data[$key] = $value;
    }
}

// Convert form data to JSON string
$json_data = json_encode($form_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Function to save user data in a file
function save_user_data_in_json_file($json_data)
{
    $file_path = 'anyName.json'; // Specify the file path to save the JSON data

    // Check if the file exists
    if (file_exists($file_path)) {
        // Read the existing data from the file
        $existing_data = file_get_contents($file_path);

        // Decode the existing JSON data
        $existing_json_data = json_decode($existing_data, true);

        // Append the new data to the existing data
        $existing_json_data[] = json_decode($json_data, true);

        // Convert the merged data back to JSON string
        $merged_json_data = json_encode($existing_json_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        // Save the merged JSON data to the file
        file_put_contents($file_path, $merged_json_data);
    } else {
        // If the file doesn't exist, simply save the new JSON data to the file
        file_put_contents($file_path, $json_data);
    }
}

// Adjusting text encoding
function adopt($text) {
    return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$form_subject = 'Заявка с сайта Portfolio';

// Preparing header
$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $email_from . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;

// Sending email to admin
mail($admin_email, $form_subject, $json_data, $headers);

// Saving user data in a JSON file
save_user_data_in_json_file($json_data);

echo "<div class='contact-form__success'>
        <h2>Заявка принята!<br>
        Мы свяжемся с&nbsp;Вами в&nbsp;ближайшее время!
        </h2>
      </div> ";

?>
