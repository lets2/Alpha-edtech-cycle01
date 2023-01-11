#!/bin/bash
echo "Insert a number:"
read first_number;
echo "Insert another number"
read second_number;
echo "-------"
echo "Results"
echo "-------"
sum=$(( $first_number+$second_number ))
sub=$(( $first_number-$second_number ))
mult=$(( $first_number*$second_number ))
echo "$first_number+$second_number=$sum"
echo "$first_number-$second_number=$sub"
echo "$first_number*$second_number=$mult"
if [ "$second_number" -ne 0 ];#if second number is not zero
then
    div=$(bc <<< "scale=3;($first_number/$second_number)")
    echo "$first_number/$second_number=$div"
else
    echo "$first_number/$second_number=Its not possible division by zero!"
fi
echo "-----------------"
