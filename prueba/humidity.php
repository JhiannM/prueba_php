<?php

$api_key = 'e9cbad321ff471326dc7a21d5939b8dc';
$base_url = 'https://api.openweathermap.org/data/2.5/weather';

$ciudades = [
    'Miami' => ['lat' => 25.7617, 'lon' => -80.1918],
    'Orlando' => ['lat' => 28.5383, 'lon' => -81.3792],
    'New York' => ['lat' => 40.7128, 'lon' => -74.0060]
];

$humidity_data = [];

if (isset($_GET['city'])) {
    $ciudad = $_GET['city'];
    if (array_key_exists($ciudad, $ciudades)) {
        $coordinates = $ciudades[$ciudad];
        $url = $base_url . '?q=' . urlencode($ciudad) . '&APPID=' . $api_key;
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if (isset($data['main']['humidity'])) {
            $humidity = $data['main']['humidity'];
            $lat = $data['coord']['lat'];
            $lon = $data['coord']['lon'];

            $humidity_data[$ciudad] = [
                'humidity' => $humidity,
                'lat' => $lat,
                'lon' => $lon,
                'city' => $ciudad
            ];
        }
    }
} else {
    $humidity_data = [
                'error' => "No existe ciudad"
            ];
} 

header('Content-Type: application/json');
echo json_encode($humidity_data);
