(function (document) {
  'use strict';
  
  window.pad = function(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	window.toCamelCase = function (str) {
		str = str || false;
		if (typeof str !== "string") { return false; }
		var res = str;
		if (/^.*\-.*$/.test(res)) {
			var arrStr = str.split("-");
			res = "";
			var word = "";
			for (var i = 0; i < arrStr.length; i++) {
				word = arrStr[i];
				if (i > 0) {
					word = arrStr[i].slice(0, 1).toUpperCase() + arrStr[i].slice(1);
				}
				res = res + word;
			}
		}
		return res;
	};
	window.getCSS = function(el, prop) {
		if (!el || !prop || typeof prop !== "string") {
			return null;
		}
		el = typeof el === "string"?document.querySelector(el):el;
		var cssValue = "";
		try {
			cssValue = window.getComputedStyle ? (window.getComputedStyle(el).getPropertyValue(prop)) : (el.currentStyle ? el.currentStyle[toCamelCase(prop)] : "");
		   
		}
		catch(e){}
		return cssValue;
	}
	window.encodeHTML = function(text) {
        var characters = {
            '<' : '&lt;',
            '>' : '&gt;',
            '&' : '&amp;',
            '"' : '&quot;',
            '\'': '&#x27;',
            '/' : '&#x2F;'
        };
        return (text + '').replace(/[<>&"'\/]/g, function(c) {
            return characters[c];
        });
    
	}
	document.body.className = getCookie("bodyTheme");
	
  document.addEventListener('polymer-ready', function () {
	var query = function(sel){
		return document.querySelector(sel);
	};
	var queryAll = function(sel){
		return document.querySelectorAll(sel);
	};
	
	//var realLinks = document.getElementsByTagName("task-table")[0].$.querySelectorAll("a");
	// console.log(realLinks);
	// for (var i=0;i<realLinks.length;i++){
		// realLinks[i].addEventListener("click",function(e){
			// e.stopPropagation();
			// return false;
		// });
	// } 
	
	
	//console.log(datePicker);
	
	var availableStatus = {
		1: "New",
		2: "BGQA",
		3: "Deployed",
		4: "Verified",
		5: "Ready for Client QA",
		6: "In Progress"
	};
	
	//var dialogStatus = query("#taskDrawer .taskStatus .itemContent #taskDetailStatus");
	/*for (var i in availableStatus){
		var el = document.createElement("OPTION");
		el.text = availableStatus[i];
		//var currentStatusText = msg.detail.task.status;
		//currentStatusEl.appendChild(currentStatusText);
		dialogStatus.appendChild(el);
	}*/
	
	/*var availableAssignees = {
		1: "Employee 1",
		2: "Employee 2",
		3: "Employee 3",
		4: "Employee 4",
		5: "Employee 5"
	};
	var dialogAssignees = query("#taskDrawer .taskAssignee .itemContent #taskDetailAssignee");
	for (var i in availableAssignees){
		var el = document.createElement("OPTION");
		el.text = availableAssignees[i];
		//var currentStatusText = msg.detail.task.status;
		//currentStatusEl.appendChild(currentStatusText);
		dialogAssignees.appendChild(el);
	}*/
	var successToast = query("#toastTaskSubmited");
	
	var taskDialog = document.getElementById("dialog");
	
	
	//document.body.classList.toggle("dark");
	
	query("task-table").$.blackTheme.addEventListener("click",function(e){
		document.body.classList.toggle("dark");
		//query("task-table").classList.toggle("dark");
		setCookie("bodyTheme",document.body.className,700);
	});
	
	
    // Perform some behaviour
    //console.log('Polymer is ready to rock!');
	var activeTimerToast = query("#toastTimerStarted");
	document.querySelector("task-table").addEventListener("active-timer", function(msg){
		if (msg.detail.active && !msg.detail.showToast){
			activeTimerToast.text = "Timer started at "+msg.detail.msg+" !";
			activeTimerToast.show();
		}
	});
	
	var miscToast = query("#toastMisc");
	/*document.querySelector("task-table").addEventListener("invalid-time-input", function(msg){
		invalidTimeToast.text = msg.detail.msg;
		invalidTimeToast.show();
		
	});*/
	document.querySelector("task-table").addEventListener("setKey", function(msg){
		miscToast.text = "Api key set! Refreshing page...";
		miscToast.show();
		setTimeout(function () { location.reload(true); }, 3000);
	});
	
	document.querySelector("task-table").addEventListener("invalidTaskNum", function(msg){
		miscToast.text = "Invalid task #";
		miscToast.show();
		
	});
	
	document.querySelector("task-table").addEventListener("lostTaskNum", function(msg){
		miscToast.text = "Task not found";
		miscToast.show();
		
	});
	
	
	/*query("task-table").$.taskDrawer.addEventListener("core-select", function(msg){
		var main = query("#taskDrawer").$.main;
		var drawer = query("#taskDrawer").$.drawer;
		var drawerContent = query("#taskDrawer").$.drawer.querySelector("content").getDistributedNodes()[0];//.$.querySelector("#taskComment").$.eh.value;
		var drawerComment = drawerContent.querySelector("#taskComment").$.eh.value;
		var row = query("task-table").$.tbody.querySelector(".details");
		var rowCommentText = query("task-table").$.tbody.querySelector(".details task-comment").$.paper1.querySelector("#commentText").value;
		
		if (main===msg.detail.item && query("#taskDrawer").selected==="main"){
			//if (drawerComment !== )
			console.log(msg);
			query("task-table").$.tbody.querySelector(".details task-comment").$.paper1.querySelector("#commentText").value = rowCommentText===drawerComment ? rowCommentText : drawerComment;
			row.classList.remove("details");
		}
		
	});*/

	
	query("task-table").addEventListener("see-task-details", function(msg){
		return false;
		// var taskProject = query("#dialog .taskProject .itemContent"),
		// taskIssue = query("#dialog .taskIssue .itemContent"),
		// taskPriority = query("#dialog .taskPriority .itemContent"),
		// taskStatus = query("#dialog .taskStatus .itemContent #taskDetailStatus"),
		// taskAssignee = query("#dialog .taskAssignee .itemContent #taskDetailAssignee"),
		// taskComment = query("#dialog #taskComment");
		 
		// taskProject.innerHTML = msg.detail.task.project;
		// taskIssue.innerHTML = msg.detail.task.issue;
		// taskPriority.innerHTML = msg.detail.task.priority;
		// var selectOptions = queryAll("#dialog .taskStatus .itemContent #taskDetailStatus option");
		// for (var i=0;i<selectOptions.length;i++){
			// if (selectOptions[i].text===msg.detail.task.status){
				// selectOptions[i].selected = "selected" || true;
			// }
		// }
		// var assigneeOptions = queryAll("#dialog .taskAssignee .itemContent #taskDetailAssignee option");
		// assigneeOptions[msg.detail.task.assignee-1].selected = "selected" || true;
		
		// //var enteredComment = msg.detail.taskRow.querySelector("task-comment").querySelector("input");
		// var enteredComment = msg.detail.taskRow.getElementsByTagName("task-comment")[0].$.commentText.value;
		// taskComment.value = enteredComment || "";
		
		// successToast.text = "Task "+msg.detail.task.issue+" updated!";
		// //{project: "Ricardo", priority: "Normal", status: "New", issue: "#6600 - Create new redmine timer"},
		// query("#dialog #taskSubmit").disabled= false;
		// query("#dialog #taskSubmit").textContent = "Submit";
		// taskDialog.open();
		
		/* dialog box ^-*/
		
		var taskProject = query("#taskDrawer .taskProject .itemContent"),
		taskIssue = query("#taskDrawer .taskIssue .itemContent"),
		taskPriority = query("#taskDrawer .taskPriority .itemContent"),
		taskStatus = query("#taskDrawer .taskStatus .itemContent #taskDetailStatus"),
		taskAssignee = query("#taskDrawer .taskAssignee .itemContent #taskDetailAssignee"),
		taskComment = query("#taskDrawer #taskComment").$.eh;
		 
		taskProject.innerHTML = msg.detail.task.project;
		taskIssue.innerHTML = msg.detail.task.issue;
		taskPriority.innerHTML = msg.detail.task.priority;
		var selectOptions = queryAll("#taskDrawer .taskStatus .itemContent #taskDetailStatus option");
		for (var i=0;i<selectOptions.length;i++){
			if (selectOptions[i].text===msg.detail.task.status){
				selectOptions[i].selected = "selected" || true;
			}
		}
		var assigneeOptions = queryAll("#taskDrawer .taskAssignee .itemContent #taskDetailAssignee option");
		assigneeOptions[msg.detail.task.assignee-1].selected = "selected" || true;
		
		//var enteredComment = msg.detail.taskRow.querySelector("task-comment").querySelector("input");
		var enteredComment = msg.detail.taskRow.getElementsByTagName("task-comment")[0].$.commentText.value;
		taskComment.value = enteredComment || "";
		
		successToast.text = "Task "+msg.detail.task.issue+" updated!";
		// //{project: "Ricardo", priority: "Normal", status: "New", issue: "#6600 - Create new redmine timer"},
		// query("#drawer #taskSubmit").disabled= false;
		// query("#drawer #taskSubmit").textContent = "Submit"; 
		
		query("core-drawer-panel").openDrawer();
	});
	
	/*query("core-drawer-panel #datepicker-button").addEventListener("click", function(e){
		
	});*/
	
	query("task-table").addEventListener("taskupdate",function(e){
		
		successToast.text = e.detail.msg;
		successToast.show();
	});
	
	query("#dialog #taskSubmit").addEventListener("mousedown", function(e){
	
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		  var xmlhttp=new XMLHttpRequest();
		}
		else{// code for IE6, IE5
		  var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		
		e.target.disabled = true;
		e.target.textContent = "Sending...";
		
		
		
		xmlhttp.open("GET","scripts/sample.xml",false);
		xmlhttp.send();
		var xmlDoc=xmlhttp.responseXML;
		
		if (xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue.trim() === "SUCCESS"){
			successToast.show();
			taskDialog.close();
		}
	});
	
	/*query(".projectTab paper-button").addEventListener("click", function(msg){
		var collapseTarget = query("#collapse");
		var tabIcon = query(".projectTab #tabIcon");
		
		tabIcon.icon = collapseTarget.opened ? "expand-less" : "expand-more";
		
		collapseTarget.toggle();
	});*/
	
  });
  


// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
