$(document).ready(function() {
		$.ajax({
			"url": '_view/items',
			"dataType": "json",
			"success": function(data) {
				$.each(data.rows, function(index, item) {
					//var Item = items.value.Item;
					var Description = item.value.Description;
					var Model = item.value.Model;
					var Condition = item.value.Condition;
					var Price = item.value.Price;
					var Location = item.value.Location;
					var Shipping = item.value.Shipping;
					var Pickup = item.value.Pickup;
					var Trades = item.value.Trades;
					$('#couchList').append(
						$('<li>').append(
								'<li><p><strong> Description:</strong> ' + '<em>' + Description + '</em>' + '</p>' +
		                        '<p><strong> Model:</strong> ' + '<em>' + Model + '</em>' + '</p>' +
		                        '<p><strong> Condition:</strong> ' + '<em>' + Condition + '</em>' + '</p>' +
		                        '<p><strong> Price:</strong> ' + '<em>' + Price + '</em>' + '</p>' + 
		                        '<p><strong> Location:</strong> ' + '<em>' + Location + '</em>' + '</p>' +
		                        '<p><strong> Shipping:</strong> ' + '<em>' + Shipping + '</em>' + '</p>' +
		                        '<p><strong> Pickup:</strong> ' + '<em>' + Pickup + '</em>' + '</p>' +
		                        '<p><strong> Trades:</strong> ' + '<em>' + Trades + '</em>' + '</p></li>'	                             
						)
					);
				});
				$('#couchList').listview('refresh');
				$('.couch').append('<h2>Weekly Classifieds</h2>').addClass('header');
			}
		});

});