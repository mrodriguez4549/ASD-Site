$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#custform').on('pageinit', function(){

	delete $.validator.methods.date;

	var cForm = $('#contactForm'),
		errorslink = $('#errorslink')
		;

    	cForm.validate({
		invalidHandler: function(form, validator) {
			errorslink.click();				
			var html = '';
			$("#errors ul").html("");
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldname = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldname +'</li>';
				
			};
			$("#errors ul").html(html);
		},
		submitHandler: function() {
		var data = cForm.serializeArray();
		console.log(data);
		storeData(data);
		}
	});
});

// WEEK 1-3 removed //
     
// WEEK 4 starts here


// display the list
$("#myList").live("pageshow", function() {
		$.couch.db("asdproject").view("asdproject/items", {
			success: function(data) {
				console.log(data);
				$("#classList").empty();
				$.each(data.rows, function(index, value) {
					var id = value.id;
					var item = (value.value || value.doc);
					$('#classList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "items.html?items=" + item.item) 
							.text(item.item)
							)
						);
					});
					$('#classList').listview('refresh');
				}
			});

	});

//get key

var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

// single item view 

$('#items').live("pageshow", function(){
	var item = urlVars()["item"];

	$.couch.db("asdproject").view("asdproject/items", {
    	success: function(data) {
    			var item 			= data.item;
				var description		= data.description;
				var model 			= data.model;
				var condition 		= data.condition;
				var price 			= data.price;
				var location 		= data.location;
				var shipping 		= data.shipping;
				var trades 			= data.trades;
				
        	$('<div class="singlepage">'+
        			'<h2>Item: '+ item +'</h2>'+
					'<ul class="info">'+
						'<li>Description: '+ description +'</li>'+
						'<li>Model: '+ model +'</li>'+
						'<li>Condition: '+ condition +'</li>'+
						'<li>Price: '+ price +'</li>'+
						'<li>Location: '+ location +'</li>'+
						'<li>Shipping: '+ shipping +'</li>'+
						'<li>Trades: '+ trades + '</li>'+ '<br/>' +
						'<li><a href="#" id="elink">Edit</a></li>' +
						'<li><a href="#" id="dlink">Delete</a></li>'+
					'</ul>'+
					'</div>' 
        	  
        	).appendTo('#itemsList');
        	console.log(data);
        	$('#dlink').on('click', function(){
        		var ask = confirm("Are you sure you want to delete?");
        		if(ask) {
        		$.couch.db("asdproject").removeDoc(data, {
        			
        			success: function(data) {
        				console.log(data);
        				document.location.href = 'index.html#list';
        			},
        			error: function(status) {
        				console.log(status);
        			}
        		});
        		}else{ 
        			alert("Sorry, data was not removed.");
        			document.location.href = 'index.html';
        		}
        	});
        }
	});
});



// edit

$('#elink').live('click', function(){
	var items = urlVars()["items"];
	$.mobile.changePage("index.html#custform");
	$.couch.db("asdproject").openDoc(items, {
    	success: function(data) {
    		item = data.item;
    		description = data.description;
    		model = data.model;
    		condition = data.condition;
    		price = data.price;
    		location = data.location;
    		trades = data.trades;
			$('#item').val(item);
		    $('#description').val(description);
		    $('#model').val(model);
		    $('#condition').val(condition);
			$('#price').val(price);
		    $('#location').val(trades);
		    $('#trades').val(trades);

			// save 
			$('#eitem').on('click', function(){
				console.log("eitem");
				var item = $('#description').val();
			    var description = $('#description').val();
			    var model = $('#model').val();
			    var condition = $('#condition').val();
				var price = $('#price').val();
			    var location = $('#location').val();
			    var shipping = $('#location').val();
			    var trades = $('#trades').val();

			    var item = {
					"_id": data._id,
					"_rev": data._rev,
					"item": item,
					"description": description,
					"condition": condition,
					"price": price,
					"location": location,
					"shipping": shipping,
					"trades": trades		
					};
					console.log(item);

				$.couch.db("asdproject").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Yay, item was updated!");
						document.location.href = 'index.html';
					},
					error: function(status) {
        				console.log(status);
        				alert("Sorry, item was not updated.");
    				}
				});
			return false;
			});
		}
	});

});


// save

$('#submit').on('click', function(){
	var d = {
        	_id:idValue,
        	_rev:revValue,
        	item:$('#item').val(),
        	description:$('#description').val(),
        	model:$('#model').val(),
        	condition:$('#condition').val(),
        	price:$('#price').val(),
        	location:$('#location').val(),
        	shipping:$('#shipping').val(),
        	trades:$('#trades').val()
        	        	
        	};
	console.log(item);
	$.couch.db("asdproject").saveDoc(item, {
		success: function(data) {
			console.log(data);
			alert("Item has been added!");
			document.location.href = 'index.html'; 
		},
		error: function(status) {
			console.log(status);
			alert("Item was not added.");
		}
	});
return false;

});

