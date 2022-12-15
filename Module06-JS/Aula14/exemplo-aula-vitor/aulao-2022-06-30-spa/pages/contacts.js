export default () => {
	const container = document.createElement("div");

	const template = `
    <h2>Contacts</h2>
    <p> (xx)xx-xxx-xxxx </p>
    <p> email@email.com.js </p>
    <p> R.Av.Brazil, drama </p>
    `;
	container.innerHTML = template;
	return container;
};
