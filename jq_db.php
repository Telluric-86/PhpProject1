<?php
$sql_type = filter_input(INPUT_POST, 'sql_type');

if ( $sql_type === 'select' ){
  $link = mysqli_connect('localhost', 'root', 'root', 'test_db');
  $query = 'SELECT * FROM test';
  $result = mysqli_query($link, $query);
  echo json_encode(mysqli_fetch_all($result));
  mysqli_free_result($result);
  mysqli_close($link);
}