<?php
//echo filter_input(INPUT_POST, 'xyz').'<br>';
//echo 'Pong!';

class tree_node {
  public $data;
  //public $parent;
  public $children = array();
}

$a = new tree_node();
$b = new tree_node();
$c = new tree_node();
$b1 = new tree_node();
$b2 = new tree_node();

$a->data = 1;
$b->data = 2;
$c->data = 4;
$b1->data = 3;
$b2->data = 6;

array_push($a->children, $b);
array_push($a->children, $c);
array_push($b->children, $b1);
array_push($b->children, $b2);
//$a->parent = null;
//$b->parent = $a;
//$c->parent = $a;

$str = json_encode($a);

echo $str;