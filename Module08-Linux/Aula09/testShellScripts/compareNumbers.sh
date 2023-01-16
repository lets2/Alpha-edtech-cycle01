#!/bin/bash
read -p "Insert a number:" firstNumber
read -p "Insert another number:" secondNumber

if [ $firstNumber -gt $secondNumber ];
then
	echo "$firstNumber is greater than $secondNumber"
elif [ $firstNumber -lt $secondNumber ]
then
	echo "$secondNumber is greater than $firstNumber"
else
	echo "Two numbers are equals!"
fi	
