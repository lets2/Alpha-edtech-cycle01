export default () => {
	const container = document.createElement("div");

	const template = `
    <h2>We really love cats</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nam sint quae nisi. Ratione consequuntur sapiente dicta rem libero, accusamus eveniet similique eius, nihil voluptate saepe ad eligendi, architecto aliquid ullam qui iure deleniti. Numquam harum maxime at. Dolores velit et ratione modi ad dignissimos voluptatibus commodi neque fuga sed.</p>
    `;
	container.innerHTML = template;
	return container;
};
