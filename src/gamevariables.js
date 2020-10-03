var currentGameProgress = 0
if (localStorage.getItem("currentGameProgress") != null){
	var inputVal = localStorage.getItem("currentGameProgress");
}
/*	Example:

	currentGameProgress = 2000});
	localStorage.setItem("currentGameProgress", currentGameProgress);
*/

var sentMSG = new Array()
if (localStorage.getItem("sentMSG") != null){
	sentMSG = JSON.parse(localStorage.getItem("sentMSG"));
}
/*	Example:

	sentMSG.push({MSG:inputVal, ETA:2000});
	localStorage.setItem("sentMSG", JSON.stringify(sentMSG));
*/


