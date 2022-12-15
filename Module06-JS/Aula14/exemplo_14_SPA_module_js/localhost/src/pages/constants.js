//List of Contants that can be accessed by other JS files
import { renderHomePage } from "./home.js";
import { renderMoviePage } from "./movie.js";
import { renderContactPage } from "./contact.js";

//Constantes necessárias em todas as páginas
export const container = document.querySelector("#container-pages");
export const header = document.querySelector("header");
export const main = document.querySelector("main");
export const footer = document.querySelector("footer");
export const contentTagA=[
    {
        label:"HOME",
        handle:renderHomePage
    },
    {
        label:"MOVIE",
        handle:renderMoviePage
    },
    {
        label:"CONTACT",
        handle:renderContactPage
    }
];
export const contentTagH1="HOMEM ARANHA: SEM VOLTA PARA CASA";
export const contentCopyright="Copyright © 2022 | Lets";

// Exclusive constants for creating the Home page
export const contentTagP="Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa quando vilões de outras versões de Homem-Aranha de outro universos acabam indo para seu mundo.";
export const contentTagIMG = {
    src:"./src/assets/poster.jpg",
    alt:"Poster do homem aranha"
};

// Exclusive constants for creating the Movie page
export const contentTagH2 = "CRÍTICAS DA IMPRENSA";
export const content1AboutMovie = "Repleto de passagens significativas para quem assistiu a todos os outros longas, com os vilões perambulando de um canto a outro sem medo de serem maus, este filme foi construído para surpreender e emocionar quem o assiste, e consegue fazê-lo de forma constante.";
export const content2AboutMovie = "Todos os aspectos de Sem Volta Para Casa que abordam especificamente a história de Peter Parker são fantásticos, liderado por um Tom Holland melhor do que nunca.";

// Exclusive constants for creating the Contact page

export const contentContact = [
    {
        type:"address",
        content:"Av. Dom Pedro Primeiro, n.132, São Paulo.",
        classIcon:"icon-address"
    },
    {
        type:"whatsapp",
        content:"(88)9.9929-3432",
        classIcon:"icon-whatsapp"
    },
    {
        type:"phone",
        content:"(88)3.3330-3434",
        classIcon:"icon-phone"
    },
    {
        type:"email",
        content:"contact@service.com",
        classIcon:"icon-email"
    },
];

