#!/bin/bash
#The line below is used to store a name insert as
#a parameter when the script is executed
name=$1
if [ "$name" = "lets" ];
then
	echo "Your nickname is $name, hi $name!"
else
	echo "$name, You dont have permission to access this file!"
fi
