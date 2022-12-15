export default function Evento(urlRecebido) {
	const eventoNovo = new CustomEvent("onstatechange", {
		detail: { url: urlRecebido },
	});

	return eventoNovo;
}
