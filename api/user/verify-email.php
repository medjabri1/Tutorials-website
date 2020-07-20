<?php

    header('Access-Control-Allow-Origin: *');
    header('content-type:application/json');

    spl_autoload_register(function ($class_name) {
        include '../../classes/'. $class_name . '.php';
    });

    if(!isset($_GET['id']) || !isset($_GET['email']) || !isset($_GET['token'])) {

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

    $id = $_GET['id'];
    $email = $_GET['email'];
    $token = $_GET['token'];
    $user = User::getBy($id);

    if($user) {

        if($user->getEmail() == $email) {

            if($user->verifyEmail()) {

                echo json_encode([
                    'code' => '200',
                    'result' => 'Email verified successfully',
                    'cause' => '',
                    'developer' => 'MJR',
                    'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                    'version' => '1.0'
                ]);

                header('Location: /tutorialswebsite/');

                die();

            } else {

                echo json_encode([
                    'code' => '520',
                    'result' => 'Unknown error / Server error',
                    'cause' => '',
                    'developer' => 'MJR',
                    'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                    'version' => '1.0'
                ]);

                header('Location: /tutorialswebsite/');

                die();

            }

        } else {

            //Incorrect email
            echo json_encode([
                'code' => '409',
                'result' => 'Email and user dont match',
                'cause' => 'id',
                'developer' => 'MJR',
                'github' => 'https://github.com/medjabri1/TutorialsWebsite',
                'version' => '1.0'
            ]);
            die();

        }

    } else {

        //User not found
        echo json_encode([
            'code' => '409',
            'result' => 'User not found',
            'cause' => 'id',
            'developer' => 'MJR',
            'github' => 'https://github.com/medjabri1/TutorialsWebsite',
            'version' => '1.0'
        ]);
        die();

    }

?>