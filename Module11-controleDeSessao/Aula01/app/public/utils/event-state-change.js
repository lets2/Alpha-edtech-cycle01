export default function createEventStateChange(_urlParameter) {
    const eventStateChange = new CustomEvent("onstatechange", {
        detail: { url: _urlParameter },
    });

    return eventStateChange;
}
