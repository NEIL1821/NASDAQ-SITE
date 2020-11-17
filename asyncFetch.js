export async function getUrlAsync(url) {
    try {
        var response = await fetch(url);
        var data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
