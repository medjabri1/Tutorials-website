<?php

    spl_autoload_register(function ($class_name) {
        include './'. $class_name . '.php';
    });

    class Model {

        protected static function getBy($value, $column = "", $table_name = "") {

            $conn = Database::getConnection();
            $query = "select * from ". $table_name ." where $column = '$value'";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $data = $stmt->fetchAll();

            return $data;
        }

        protected static function getAll($table_name = "") {
            $conn = Database::getConnection();
            $query = "select * from ". $table_name ." order by created_at desc";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $data = $stmt->fetchAll();

            return $data;
        }

        public static function submitData($query, $params) : bool {
            $conn = Database::getConnection();
            $stmt = $conn->prepare($query);
            
            if($stmt->execute($params)) return true;
            else return false;
        }

    }

?>