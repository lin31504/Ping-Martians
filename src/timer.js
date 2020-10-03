var replacer = (key, value) => {  
  // if we get a function give us the code for that function  
  if (typeof value === 'function') {
    return value.toString();  
  }   
  return value;
} 

let reviver = (key, value) => {  
  if (typeof value === 'string' 
      && value.indexOf('function') === 0) {    
    let functionTemplate = `(${value}).call(this)`;    
    return new Function(functionTemplate);  
  }  
  return value;
};

// init global timer
var globalTimer = [];
var globalDelay = 20000;
if (localStorage.getItem("globalTimer") != null){
	globalTimer = JSON.parse(localStorage.getItem("globalTimer"), reviver);
}

var gtc = {
	add: (name, delay, data, cb) => {globalTimer.push({'timestamp': new Date().getTime(), 'delay': delay, 'name': name, 'data': data, 'cb': cb}); gtc.save();},
	get: (name) => {return globalTimer.filter((data)=>{return data.name == name});},
	remove: (index) => {r = globalTimer.splice(index, 1); gtc.save(); return r;},
	list: () => {return globalTimer;},
	save: () => {localStorage.setItem("globalTimer", JSON.stringify(globalTimer, replacer));}
}

setInterval(()=>{
	for (i in globalTimer){
		if (globalTimer[i].timestamp + globalTimer[i].delay <= new Date().getTime()){
			globalTimer[i].cb(globalTimer[i].data)
			gtc.remove(i)
		}
	}
}, 1000);
