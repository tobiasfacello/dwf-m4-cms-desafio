function armarItems(items, assets) {
	const itemContainerEl = document.querySelector(".item-container");
	const tplEl = document.querySelector(".item-tpl");

	items.forEach((item) => {
		const nombreEl = tplEl.content.querySelector(".nombre-item");
		const descripcionEl = tplEl.content.querySelector(".descripcion-item");
		const detallesEl = tplEl.content.querySelector(".detalles");

		nombreEl.textContent = item["fields"]["title"];
		descripcionEl.textContent =
			item["fields"]["description"].substring(0, 65) + "...";
		detallesEl.setAttribute("href", item["fields"]["url"]);

		const imgEl = tplEl.content.querySelector(".img-item");
		const urlValue = getImgEl(item, assets);
		imgEl.setAttribute("src", urlValue[0]["fields"]["file"]["url"]);

		const clonTplEl = document.importNode(tplEl.content, true);
		itemContainerEl.appendChild(clonTplEl);
	});
}

function getImgId(item) {
	const imgId = item["fields"]["image"][0]["sys"]["id"];
	return imgId;
}

function getImgEl(item, assets) {
	const id = getImgId(item);
	const urlImg = assets.filter((asset) => {
		if (asset["fields"]["file"]["url"].includes(id)) {
			return asset;
		}
	});
	return urlImg;
}

function main() {
	fetch(
		"https://cdn.contentful.com/spaces/dpse4lvliyip/environments/master/entries?access_token=YzVXGfRAQxbnNkufAPhQDpv_4-8b2NM_D6KC59hhdco"
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			// console.log(data["includes"]["Asset"][0]["fields"]["file"]["url"]);
			armarItems(data["items"], data["includes"]["Asset"]);
		});
}

main();
