<?php
$name = filter_input(INPUT_POST, 'name');
$role = filter_input(INPUT_POST, 'role');

echo "$name is $role<br>";