<?php

$salt = 'tra7ja8c';
$description = 'DESC';// . isset($_POST['desc'])?$_POST['desc']:'ERROR DESCRIPTION!!!';
$amount = isset($_POST['amount'])?$_POST['amount']:'ERROR AMOUNT!!!';
$transaction_type = 'S';
$currency = 'USD';
$hash = sha1($salt . "|" . $description . "|" . $amount . "|" . $currency . "|" . $transaction_type);
echo json_encode([
    'hash' => $hash,
    'desc' => $description,
    'amount' => $amount
]);