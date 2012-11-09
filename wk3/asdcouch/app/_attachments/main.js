/* 
	Marco Rodriguez -->
  	11-01-12 -->
 	Project 2 -->
	ASD 1211 -- >
*/
// Javascript file 

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

//any other code needed for addItem page goes here

	
$('#displaylink').on('click', function(){ // display link gets data
	getData();
});	
$('#clearbutton').on('click', function(){ // clear button clears the data
	clearLocal();
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

// auto populate local storage
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};

	// stored data function
	// stores all object data
	function storeData(key){
			// if there is no key, this means this is brand new item and we need a new key.
			if(!key){
			var id 			= Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			}else{
				// set the id to the existing key we're editing so that it will save over the data
				//the key is the same key that's been passed along from the editSubmit event handler
				// id to the validate function, and then passed here, into the storeData function.
			id = key;
			}
		var item  			= {};
			item.fname		= ["First Name:", 				$('#fname').val()];
			item.lname		= ["Last Name:", 				$('#lname').val()];
			item.email		= ["Email:", 					$('#email').val()];
			item.date		= ["Date:", 					$('#date').val()];
			item.make		= ["Make:", 					$('#make').val()];
			item.car		= ["Car:", 						$('#car').val()];
			item.caramount	= ["Number of cars you own:", 	$('#caramount').val()];
			item.comments	= ["Any Comments:", 			$('#comments').val()];

			// save data stringify
			localStorage.setItem(id, JSON.stringify(item));
			alert("Contact Saved!");
	};
	
	// get data
	function getData(){
		//toggleControls("on");
		if(localStorage.length ===0){
			var ask = confirm("No current member data saved. Do you want to load test data?");
		if (ask){
			autoFillData();
		};
	};
		$('#data').empty(); // adding
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);

		makeList.setAttribute("id", "itemslist"); // adding 
		makeDiv.appendChild(makeList); // adding
		$('#data').append(makeDiv); // adding
		$('#items').show; // adding


		for(var i=0, j=localStorage.length; i<j; i++){ // j
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li'); 

			makeli.setAttribute("id", "displaylist"); // look into

			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Converting the string from local storage
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.make[1], makeSubList); // adds image to data
			// loop thru object
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0] + obj[n][1]; // look into
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi); // project 3
			} 
			makeItemLinks(localStorage.key(i), linksLi); // creates our edit and delete buttons
		console.log(getData);
		};
	};

	// needs refactoring
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", ""+ catName + ".png");
		imageLi.appendChild(newImg);
	};

	

	// make item links
	// create edit and delete buttons for stored data

	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#custform"; // shows up sometimes, then it doesn't?
		editLink.key = key;
		var editText = "Edit Contact";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// appends line break to local storage between edit and delete
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		// delete 
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Contact";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

	function editItem(){
		// grab data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// show form
		//toggleControls("off");

		// populate the form fields with current localStorage values.
		$('#fname').val(item.fname[1]);
		$('#lname').val(item.lname[1]);
		$('#email').val(item.email[1]);
		$('#date').val(item.date[1]);
		$('#make').val(item.make[1]);
		$('#car').val(item.car[1]);
		$('#caramount').val(item.caramount[1]);
		$('#comments').val(item.comments[1]);

		// remove the initial listener from the input save button
		save.removeEventListener("click", storeData);

		// change submit button value to edit button
		$('#submit').value = "Edit Contact";
		var editSubmit = $('#submit');

		//save key value
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	};
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact was deleted!");
			//window.location.reload();
			getData();
		}else{
			alert("Contact was not deleted.");
		};
	};	

// clear local data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There are is no current data to clear!");
		} else{
			var ask = confirm("Are you sure you want to clear all saved data?");
			if(ask){
				localStorage.clear();
				alert("Local Storage has been deleted! You will now be directed back to the home page. Enjoy!");
			};
			return false;
		};

};
// end of customer form and local storage js


 //AJAX starts here
    // Load Json Data
      $("#json").on("click", function(){
		$("#ajaxJson").empty(); // empty out current data
		$.ajax({ // ajax call for json data
			url: "xhr/data.json",
			type: "GET",
			dataType: "json",
			success: function(json){
				alert("Congratulations, JSON Data is now loaded."); // alert 
				for(var i = 0, j = json.Resources.length; i < j; i++){
                    var resources = json.Resources[i]; 

                    $('' + 
	                    '<li><p><strong> Shop:</strong> ' + '<em>' + resources.shop + '</em>' + '</p>'+
	                    '<p><strong> Specialty:</strong> ' + '<em>' + resources.specialty + '</em>' + '</p>'+
	                    '<p><strong> Address:</strong> ' + '<em>' + resources.address + '</em>' + '</p>'+
	                    '<p><strong> City:</strong> ' + '<em>' + resources.city + '</em>' + '</p>'+
	                    '<p><strong> State:</strong> ' + '<em>' + resources.state + '</em>' + '</p>'+
	                    '<p><strong> Zip Code:</strong> ' + '<em>' + resources.zip + '</em>' + '</p>'+
	                    '<p><strong> Phone:</strong> ' + '<em>' + resources.phone + '</em>' + '</p>'+
	                    '<p><strong> Email:</strong> ' + '<em>' + resources.email + '</em>' + '</p></li>'

                    ).appendTo('#ajaxJson');  // append json to the id ajaxJson  
                }
				$("#ajaxJson").listview('refresh');
				$('.json').append('<h2>Resources</h2>').addClass('header'); // append h2 header for resources and add the class of header styles

			},
		});
	});


//load XML Data
	$("#xml").on("click", function(){
		$("#ajaxXML").empty(); // empty out data
		$.ajax({ // ajax call for xml data
			url: "xhr/data.xml",
			type: "GET",
			dataType: "xml",
			success: function(xml){
				alert("Congratulations, XML Data is now loaded."); // alert
	            $(xml).find("Member").each(function(){

	                var fName 		= $(this).find('fName').text(),
	                	lName 		= $(this).find('lName').text(),
	                	email 		= $(this).find('email').text(),
	                	date 		= $(this).find('date').text(),
	                	make 		= $(this).find('make').text(),
	                	car 		= $(this).find('car').text(),
	                	vehicles 	= $(this).find('vehicles').text(),
	                	comments 	= $(this).find('comments').text();

	                $('' +
                        '<li><p><strong> First Name:</strong> ' + '<em>' + fName + '</em>' + '</p>' +
                        '<p><strong> Last Name:</strong> ' + '<em>' + lName + '</em>' + '</p>' +
                        '<p><strong> Email:</strong> ' + '<em>' + email + '</em>' + '</p>' +
                        '<p><strong> Date:</strong> ' + '<em>' + date + '</em>' + '</p>' + 
                        '<p><strong> Make:</strong> ' + '<em>' + make + '</em>' + '</p>' +
                        '<p><strong> Car:</strong> ' + '<em>' + car + '</em>' + '</p>' +
                        '<p><strong> Vehicles:</strong> ' + '<em>' + vehicles + '</em>' + '</p>' +
                        '<p><strong> Comments:</strong> ' + '<em>' + comments + '</em>' + '</p></li>'
                       
	                ).appendTo('#ajaxXML');

	            });
				 $("#ajaxXML").listview('refresh');
				 $('.xml').append('<h2>Members</h2>').addClass('header'); // append h2 header for resources and add the class of header styles

			},
		});
	});


 // Load CSV Data
     $('#csv').on('click', function () {
     		$('#ajaxCSV').empty(); // empty out data
     		$.ajax({
     		    url: "xhr/data.csv",
     		    type: "GET",
     		    dataType: "text",
     		    success: function (data) {
     		    	alert("Congratulations, CSV Data is now loaded."); // alert
     		    	var lines = data.split("\n");
     		    	for (var lineNum = 1; lineNum < lines.length; lineNum++) {
     		    	    var row = lines[lineNum];
     		    	    var columns = row.split(",");

     		    	    $('' +
     		    	    	'<li><p><strong> Item:</strong> ' + '<em>' + columns[0] + '</em>' + '</p>' +
     		    			'<p><strong> Description:</strong> ' + '<em>' + columns[1] + '</em>' + '</p>' +
     		    	    	'<p><strong> Model:</strong> ' + '<em>' + columns[2] + '</em>' + '</p>' +
     		    	    	'<p><strong> Price:</strong> ' + '<em>' + columns[3] + '</em>' + '</p>' +
     		    	    	'<p><strong> Location:</strong> ' + '<em>' + columns[4] + '</em>' + '</p>' +
     		    	    	'<p><strong> Shipping:</strong> ' + '<em>' + columns[5] + '</em>' + '</p>' +
     		    	    	'<p><strong> Pickup:</strong> ' + '<em>' + columns[6] + '</em>' + '</p>' +
     		    	    	'<p><strong> Trades:</strong> ' + '<em>' + columns[7] + '</em>' + '</p></li>'
     		    	    	
     		    	    ).appendTo('#ajaxCSV');
     		    	}
     		    	$('#ajaxCSV').listview('refresh');
     		    	 $('.csv').append('<h2>Classifieds</h2>').addClass('header'); // append h2 header for resources and add the class of header styles
     		 },
     	});
    });
