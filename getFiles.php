<?php
$dir    = './resources';
$files = scandir($dir);
$uniqueArr = [];
// echo '{ images:[';
foreach ($files as $key => $value) {
	if(preg_match("/.(gif|jpg|png)$/i", $value)){
		$res = preg_replace("/[.](.+)/i", "", $value);
		if(!preg_match("/(.+small)/i",$res)){
			array_push($uniqueArr,$res);
		}
	}
}
$result = '{ "images": [ ';
foreach ($uniqueArr as $key => $value) {
	$result .= '{"filename": "'.$value.'",
				"raw": "'.$value.'.jpg",
				"thumb": "'.$value.'_small.jpg"
			},';
}
$result = rtrim($result,',');
$result .=']}';
echo $result;
?>