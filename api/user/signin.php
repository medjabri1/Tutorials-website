<?php

    header('Access-Control-Allow-Origin: *');
    header('content-type:application/json');

    spl_autoload_register(function ($class_name) {
        include '../../classes/'. $class_name . '.php';
    });

    if(!isset($_POST['user_email']) || !isset($_POST['user_password'])) {

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

    $email = $_POST['user_email'];
    $password = sha1($_POST['user_password']);

    if(User::getBy($email, 'email')) {

        //Email already used
        if(User::getBy($email, 'email')->getPassword() == $password) {

            $user = User::getBy($email, 'email');

            if($user->getCreatedAt() == $user->getVerifiedAt()) {

                //User not verified
                echo json_encode([
                    'code' => '002',
                    'result' => 'User not verified',
                    'cause' => 'password',
                    'developer' => 'MJR',
                    'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                    'version' => '1.0'
                ]);
                die();                

            } else {
    
                //Successfully logged in
                session_start();
                $_SESSION['user_id'] = $user->getId();
                $_SESSION['user_name'] = $user->getName();
                $_SESSION['user_email'] = $user->getEmail();
                $_SESSION['user_image'] = $user->getImage();
                $_SESSION['user_created_at'] = $user->getCreatedAt();
                $_SESSION['user_verified_at'] = $user->getVerifiedAt();
                
                echo json_encode([
                    'code' => '003',
                    'result' => 'Logged in successfully',
                    'cause' => '',
                    'developer' => 'MJR',
                    'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                    'version' => '1.0'
                ]);
                die();

            }

        } else {

            //Wrong password
            echo json_encode([
                'code' => '001',
                'result' => 'Wrong password',
                'cause' => 'password',
                'developer' => 'MJR',
                'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                'version' => '1.0'
            ]);
            die();

        }

    } else {

        //Email not found
        echo json_encode([
            'code' => '409',
            'result' => 'Email not found',
            'cause' => 'email',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();

    }

?>