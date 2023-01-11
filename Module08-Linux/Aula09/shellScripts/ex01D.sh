#!/bin/bash
echo "------------------------------------"
echo "        Aula 09 - Exercicio 1 - D"
echo "------------------------------------"
#First parameter - name"
name=$1;
#deixei apenas um >, para substituir o conteudo do arquivo
echo "Ola, eu sou $name" > arquivo_original.txt
#cat arquivo_original.txt | tee arquivo_copia.txt
mensagem=$(cat arquivo_original.txt)
echo "Conteudo do arquivo copia:"
echo "$mensagem" > arquivo_copia.txt
cat arquivo_copia.txt
echo "------------------------------------"
