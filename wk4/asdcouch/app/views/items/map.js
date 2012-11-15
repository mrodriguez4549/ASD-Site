function (doc) {
	if (doc._id.substr(0, 12) === "classifieds:") {
		emit(doc._id.substr(12), {
			"item": doc.item,
			"description": doc.description,
			"model": doc.model,
			"condition": doc.condition,
			"price": doc.price,
			"location": doc.location,
			"shipping": doc.shipping,
			"trades": doc.trades,
			
		});
	}
};