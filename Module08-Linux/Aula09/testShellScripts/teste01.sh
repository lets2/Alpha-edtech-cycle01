#!/bin/bash
x=10
if [ ! $x = 12 ];
then
	echo "x is different of twelve"
else
	echo "x is equal than twelve"
fi

if [ ! $x = 10 ];
then
        echo "x is different of ten"
else
        echo "x is equal than ten"
fi
for i in 1 2 3 4 5 6 7
do
	echo "$i"
done 

for i in {20..40..4}
do
	echo "another for in $i"
done 

for ((j=1; j<=10; j++))
do
	echo "show $j"
done 

