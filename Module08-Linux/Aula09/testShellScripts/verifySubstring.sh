#!/bin/bash
read -p "Enter with a sentence:" sentence
read -p "Enter with a word:" substring
if [[ "$sentence" == *"$substring"* ]];
then
	echo "The word $substring belong to sentence that you inserted"
else
	echo "The word $substring doesnt belong to sentence"
fi
