function ucfirst( str ) {
	var f = str.charAt(0).toUpperCase();
	return f + str.substr(1, str.length - 1);
}


jQuery(function() {
	if (location.pathname.indexOf('browse') === -1) return;

	var actions = $('<ul />', { 'class': 'toolbar-group pluggable-ops' });
	$('#opsbar-opsbar-transitions').after(actions);
	var report = $('<a />', { 'class' : 'toolbar-trigger', href: '#'});
	var git = $('<a />', { 'class': 'toolbar-trigger', href: '#' });

	report.text('Copy for report');
	git.text('Copy for GIT');

	actions.append($('<li />', { 'class': 'toolbar-item' }).append(git));
	actions.append($('<li />', { 'class': 'toolbar-item' }).append(report));

	function tryToCopy(text) {
		var temporaryContainer = $('<p />').text(text);
		$('#summary-val').append(temporaryContainer);

		var range = document.createRange();
		range.selectNode(temporaryContainer.get(0));
		window.getSelection().addRange(range);

		try {
			// Now that we've selected the anchor text, execute the copy command
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copy text command was ' + msg);
		} catch(err) {
			console.log('Oops, unable to copy');
		}

		// Remove the selections - NOTE: Should use
		// removeRange(range) when it is supported
		window.getSelection().removeAllRanges();
		temporaryContainer.remove();
	}

	git.click(function() {
		var id = '#' + $('.issue-link').data('issue-key').replace('CNXT-', '');
		var title = $('#summary-val').text()
			.replace('Mobile and Web. ', '')
			.replace('Web: ', '')
			.replace('Web. ', '')
			.replace('Mobile. ', '')
			.replace('Mobile: ', '')
			.replace('UI. ', '')
			.replace('UI: ', '')
			.replace('API. ', '')
			.replace('API: ', '')
			.replace('Staging. ', '')
			.replace('Staging: ', '')
			.replace('Prod. ', '')
			.replace('Prod: ', '')
			.replace('Preview. ', '')
			.replace('Preview: ', '')
			.replace('Ruby. ', '')
			.replace('Ruby: ', '')
			.replace('Web, mobile:', '')
			.replace(/[\[\]']+/g,'');

		tryToCopy(id + ' ' + ucfirst(title));
	});

	report.click(function() {
		var id = $('.issue-link').data('issue-key');
		var title = $('#summary-val').text();

		tryToCopy(id + ' - ' + title);
	});
});