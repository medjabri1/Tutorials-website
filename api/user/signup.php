<?php

    header('Access-Control-Allow-Origin: *');
    header('content-type:application/json');

    spl_autoload_register(function ($class_name) {
        include '../../classes/'. $class_name . '.php';
    });

    if(!isset($_POST['user_name']) || !isset($_POST['user_email']) || !isset($_POST['user_password'])) {

        //Request params not complete
        echo json_encode([
            'code' => '000',
            'result' => 'Request Params not complete',
            'cause' => 'params',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();

    }

    $name = $_POST['user_name'];
    $email = $_POST['user_email'];
    $password = sha1($_POST['user_password']);

    if(User::getBy($email, 'email')) {

        //Email already used
        echo json_encode([
            'code' => '409',
            'result' => 'Email already used',
            'cause' => 'email',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();
    }

    $user = new User();
    $user->setName($name);
    $user->setEmail($email);
    $user->setPassword($password);
    $user->setImage('default.jpg');

    if(User::addUser($user)) {

        //User registered
        echo json_encode([
            'code' => '200',
            'result' => 'Signed up successfully',
            'cause' => '',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();

    } else {

        //Unknown Error / Server Error
        echo json_encode([
            'code' => '520',
            'result' => 'Unknonw error / Server problem',
            'cause' => 'unknown',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();

    }

?>