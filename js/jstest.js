$(document).ready(function(){
		$('.fmsg').isshow=true;
		$('#show').click(function(){
			tmp = $('.fmsg');
			if (tmp.isshow) tmp.hide('slow');
			else tmp.show('slow');
			});
		$('#hide').click(function() {
			$('.fmsg').hide('slow');});
		});
