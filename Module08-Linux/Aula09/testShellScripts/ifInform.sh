#!/bin/bash
string=$1
if [[ -z $string ]];
then
	echo "String is empty. You didnt add any parameter"
else
	echo "The string that you have inserted: $string "
fi
