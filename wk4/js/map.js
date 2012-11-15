function(doc) {
  if (doc._id.substr(0, 6) === "Event:") {
    emit(doc._id,{
    	"group": doc.group,
    	"firstName": doc.firstName,
    	"lastName": doc.lastName,
    	"address": doc.address,
    	"city": doc.city,
    	"state": doc.state,
    	"phoneNumber": doc.phoneNumber,
    	"email": doc.email,
    	"timeEVent": doc.timeEVent,
    	"date": doc.date,
    	"textBox": doc.textBox,
    	"iq": doc.iq,
    	"checkBox": doc.checkBox
    	
    
    });
    		
  }
};


{
    "name": "Eventures",
    "description": "Event Planner"
}


function(doc) {
  if (doc.created_at) {
    emit(doc.created_at, doc);
  }
};



frielselfallyesenestring
Key
frielselfallyesenestring
Password
H8HJuvniBL8LYB3FUEVWhdnx