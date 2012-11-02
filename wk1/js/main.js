/* 
	Marco Rodriguez -->
  	10-24-12 -->
 	Project 1 -->
	ASD 1210 -- >
*/
// Javascript file 

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#custform').on('pageinit', function(){
	
	var cForm = $('#contactForm');
		cForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
			var data = cForm.serializeArray();
			storeData(data);
		}
	});
});		

//Any other code needed for addItem page goes here!
//function ge(x){
		//var theElement = document.getElementById(x);
		//return theElement;
	//};

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

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
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in local storage so default data was added."); // alert
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('#items').css("display", "block");
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li'); // project 3 
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Converting the string from local storage
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.fname[1], makeSubList); // adds image to data
			// loop thru object
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi); // project 3
			} 
			makeItemLinks(localStorage.key(i), linksLi); // creates our edit and delete buttons
		}
	};

	// get image
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	};

	// auto populate local storage
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};

	// make item links
	// creat edit and delete buttons for stored data

	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Contact";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// line break
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
		toggleControls("off");

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
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact was deleted!");
			window.location.reload();
		}else{
			alert("Contact was not deleted.");
		}
	};	

// toggle controls
	function toggleControls(n){
		switch(n){
			case "on":
				$('#contactForm').css("display", "none");
				$('#clear').css("display", "inline");
				$('#displayLink').css("display", "none");
				$('#addNew').css("display", "inline");
				break;
					// off
			case "off":
				$('#contactForm').css("display", "block");
				$('#clear').css("display", "inline");
				$('#displayLink').css("display", "inline");
				$('#addNew').css("display", "none");
				$('#items').css("display", "none");
				break;
			default:
				return false;		
		}
	};
	//validate needs to be refactored to JQuery
	//function validate(e){
		// define elements
		//var getFname = $('fname');
		//var getLname = $('lname');
		//var getEmail = $('email');

		// reset 
		//errMsg.innerHTML = "";
			//getFname.style.border = "1px solid black";
			//getLname.style.border = "1px solid black";
		//	getEmail.style.border = "1px solid black";

		// error messages
		//var messageArry = [];
		// first name validation
		//if(getFname.value === ""){
		//	var fNameError = "Please enter your First Name."
			//getFname.style.border = "1px solid red";
			//messageArry.push(fNameError);
		//}
		// last name validation
	//	if(getLname.value === ""){
		//	var lNameError = "Please enter your Last Name."
		//	getLname.style.border = "1px solid red";
		//	messageArry.push(lNameError);
		//}
		// email validation
		//var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		//if(!(re.exec(getEmail.value))){
			//var emailError = "Please enter a valid Email Address.";
			//getEmail.style.border = "1px solid red";
			//messageArry.push(emailError);
	//}
		//if(messageArry.length >= 1){
			//for(var i =0, j=messageArry.length; i < j; i++){
			//	var txt = document.createElement('li');
			//	txt.innerHTML =messageArry[i];
			//	errMsg.appendChild(txt);
		//	}
		//	e.preventDefault();
		//	return false;
	//	}else{
			// save our data if everything is okay
		//	storeData(this.key);
	//	}
		
//	};


// clear local data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to delete."); // alert
		}else{
			localStorage.clear();
			alert("All Data Has Been Deleted");
			window.location.reload();
			return false;
		}
	};

	// array data for the drop down fucnctions called 
	var errMsg = $('#errors');

	//this displays the data
	$( '#displayLink' ).on( 'click', getData );
	// clears local data event
	$( '#clearLink' ).on( 'click', clearLocal );
	// submits stored data event 
	$( '#submit' ).on( 'click', validate );

});