(function (document) {
  'use strict';
  
  window.pad = function(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

  document.addEventListener('polymer-ready', function () {
    // Perform some behaviour
    //console.log('Polymer is ready to rock!');
	document.querySelector("task-table").addEventListener("ouch", function(msg){
		console.log(msg);
	});
  });
  


// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
