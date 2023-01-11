#!/bin/bash
echo "------------------------------------"
echo "        Calculadora de IMC"
echo "------------------------------------"
#Massa em quilogramas (kg):"
weight=$1;
#Altura em metros(m)"
height=$2;
echo "------------------------------------"
echo "              Resultado"
echo "------------------------------------"
imc=$(bc <<< "scale=2;$weight/($height*$height)")
echo "O IMC é igual a $imc"
if (( $(echo "$imc < 18.5" | bc -l) ));
then
    echo "Classificação: Magreza"
elif (( $(echo "$imc < 25" | bc -l) ));
then
     echo "Classificação: Peso normal"
elif (( $(echo "$imc < 30" | bc -l) ));
then
    echo "Classificação: Sobrepeso"
elif (( $(echo "$imc < 35" | bc -l) ));
then
    echo "Classificação: Obesidade Grau 1"
elif (( $(echo "$imc <= 40.0" | bc -l) ));
then
    echo "Classificação: Obesidade Grau 2"
else
    echo "Classificação: Obesidade Grau 3"
fi
echo "------------------------------------"

