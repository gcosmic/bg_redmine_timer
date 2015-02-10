(function (document) {
  'use strict';
  
  window.pad = function(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

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
	
	
	var datePicker = new Pikaday(
    {
        field: document.getElementById('logDate'),
        //position: 'bottom right'
		trigger: document.getElementById('datepicker-button')
    });
	
	var availableStatus = {
		1: "New",
		2: "BGQA",
		3: "Deployed",
		4: "Verified",
		5: "Ready for Client QA",
		6: "In Progress"
	};
	
	var dialogStatus = query("#dialog .taskStatus .itemContent #taskDetailStatus");
	for (var i in availableStatus){
		var el = document.createElement("OPTION");
		el.text = availableStatus[i];
		//var currentStatusText = msg.detail.task.status;
		//currentStatusEl.appendChild(currentStatusText);
		dialogStatus.appendChild(el);
	}
	
	var availableAssignees = {
		1: "Employee 1",
		2: "Employee 2",
		3: "Employee 3",
		4: "Employee 4",
		5: "Employee 5"
	};
	var dialogAssignees = query("#dialog .taskAssignee .itemContent #taskDetailAssignee");
	for (var i in availableAssignees){
		var el = document.createElement("OPTION");
		el.text = availableAssignees[i];
		//var currentStatusText = msg.detail.task.status;
		//currentStatusEl.appendChild(currentStatusText);
		dialogAssignees.appendChild(el);
	}
	var successToast = query("#toastTaskSubmited");
	
	var taskDialog = query("#dialog");
	
	var bodyTheme = "";
	
	query("#blackTheme").addEventListener("click",function(e){
		document.body.className= bodyTheme==="" ? "dark" : "";
		bodyTheme = bodyTheme ==="dark" ? "" : "dark";
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
	
	var invalidTimeToast = query("#toastInvalidTimeInput");
	document.querySelector("task-table").addEventListener("invalid-time-input", function(msg){
		invalidTimeToast.text = msg.detail.msg;
		invalidTimeToast.show();
		
	});
	
	query("task-table").addEventListener("see-task-details", function(msg){
		var taskProject = query("#dialog .taskProject .itemContent"),
		taskIssue = query("#dialog .taskIssue .itemContent"),
		taskPriority = query("#dialog .taskPriority .itemContent"),
		taskStatus = query("#dialog .taskStatus .itemContent #taskDetailStatus"),
		taskAssignee = query("#dialog .taskAssignee .itemContent #taskDetailAssignee"),
		taskComment = query("#dialog #taskComment");
		 
		taskProject.innerHTML = msg.detail.task.project;
		taskIssue.innerHTML = msg.detail.task.issue;
		taskPriority.innerHTML = msg.detail.task.priority;
		var selectOptions = queryAll("#dialog .taskStatus .itemContent #taskDetailStatus option");
		for (var i=0;i<selectOptions.length;i++){
			if (selectOptions[i].text===msg.detail.task.status){
				selectOptions[i].selected = "selected" || true;
			}
		}
		var assigneeOptions = queryAll("#dialog .taskAssignee .itemContent #taskDetailAssignee option");
		assigneeOptions[msg.detail.task.assignee-1].selected = "selected" || true;
		
		//var enteredComment = msg.detail.taskRow.querySelector("task-comment").querySelector("input");
		var enteredComment = msg.detail.taskRow.getElementsByTagName("task-comment")[0].$.commentText.value;
		taskComment.value = enteredComment || "";
		
		successToast.text = "Task "+msg.detail.task.issue+" updated!";
		//{project: "Ricardo", priority: "Normal", status: "New", issue: "#6600 - Create new redmine timer"},
		query("#dialog #taskSubmit").disabled= false;
		query("#dialog #taskSubmit").textContent = "Submit";
		taskDialog.open();
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
	
	query(".projectTab paper-button").addEventListener("click", function(msg){
		var collapseTarget = query("#collapse");
		var tabIcon = query(".projectTab #tabIcon");
		
		tabIcon.icon = collapseTarget.opened ? "expand-less" : "expand-more";
		
		collapseTarget.toggle();
	});
  });
  


// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
