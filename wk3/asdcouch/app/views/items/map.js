function (doc) {
	if (doc._id.substr(0, 5) === "Item:") {
		emit(doc._id.substr(5), {
			"Item": doc.Item,
			"Description": doc.Description,
			"Model": doc.Model,
			"Condition": doc.Condition,
			"Price": doc.Price,
			"Location": doc.Location,
			"Shipping": doc.Shipping,
			"Pickup": doc.Pickup,
			"Trades": doc.Trades,
			
		});
	}
};