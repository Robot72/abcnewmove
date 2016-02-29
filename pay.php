<?php

$salt = 'tra7ja8c';
$description = isset($_POST['desc'])?$_POST['desc']:'ERROR DESCRIPTION!!!';
$amount = isset($_POST['amount'])?$_POST['amount']:'ERROR AMOUNT!!!';
$transaction_type = 'S';
$currency = 'USD';
$hash = sha1($salt . "|" . $description . "|" . $amount . "|" . $currency . "|" . $transaction_type);
echo json_encode([
    'hash' => $hash,
    'desc' => $description,
    'amount' => $amount
]);
//echo $hash;
/*include_once('wp-content/themes/abcnewmoving/app/PayLineRestClient.php');


$client = new PayLaneRestClient('abcnewmove', 'Vfufpby1-');

$card_params = array(
    'sale'     => array(
        'amount'      => 19.99,
        'currency'    => 'EUR',
        'description' => 'Product #1'
    ),
    'customer' => array(
        'name'    => 'John Doe',
        'email'   => 'john@doe.com',
        'ip'      => '127.0.0.1',
        'address' => array (
            'street_house' => '1600 Pennsylvania Avenue Northwest',
            'city'         => 'Washington',
            'state'        => 'DC',
            'zip'          => '500',
            'country_code' => 'US',
        ),
    ),
    'card' => array(
        'token' => '12a34b45c67d89e00f1aa2bb3cc4dd5ee6ff12a34b45c67d89e00f1aa2bb3cc4',
     ),
);

try {
    $status = $client->cardSaleByToken($card_params);
} catch (Exception $e) {
    // handle exceptions here
}  

// checking transaction status example (optional):
if ($client->isSuccess()) {
    echo "Success, id_sale: {$status['id_sale']} \n";
} else {
    die("Error ID: {$status['error']['id_error']}, \n".
        "Error number: {$status['error']['error_number']}, \n".
        "Error description: {$status['error']['error_description']}");
}*/