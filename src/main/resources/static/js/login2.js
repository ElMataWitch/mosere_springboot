$(function() {
	$('#frmLogin').formValidation({
		excluded: [':disabled', ':hidden'],
		live: 'enabled'
	});
});