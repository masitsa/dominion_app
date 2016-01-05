/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}


var EmployeeSermonService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.getallLatesSermon = function() {
		var request = url + "sermons/get_sermons" ;
        return $.ajax({url: request});
    }

    this.getLatestSermon = function() {
		var request = url + "sermons/get_latest_sermon" ;
        return $.ajax({url: request});
    }
    this.getSermonDetail = function(id) {
		var request = url + "sermons/get_sermons_detail" ;
        return $.ajax({url: url + "sermons/get_sermons_detail/" + id});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_sermons()
{
	get_latest_sermon();
	get_sermons_items();
}

function get_latest_sermon()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			var display = 0;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 9)
				{
					if(display == 0)
					{
						display++;
						var id = field['post_id'];
						var title = field['post_title'];
						var post_content = field['post_content'];
						var post_image = field['post_image'];
						var post_audio = field['post_audio'];
						var post_video = field['post_video'];
						
					var audio = '';
					var video = '';
					if(post_audio != '')
					{
						audio = 
						'<blockquote>'+
							'Audio'+
							'<audio controls>'+
								'<source src="'+site_url+'assets/img/posts/'+post_audio+'" type="audio/mpeg" class="align-centre">'+
								'Your browser does not support the audio element.'+
							'</audio>'+
						'</blockquote>';
					}
					if(post_video != '')
					{
						video = 
						'<blockquote>'+
								'<iframe width="560" height="315" frameborder="0" allowfullscreen="" src="'+site_url+'assets/img/posts/'+post_video+'?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;autohide=1&amp;controls=0;"></iframe>'+
						'</blockquote>';
					}
					
					news_item_post = '<div class="page_content">'+
					'<blockquote>'+title+'</blockquote>'+
					'<div class="post_social2">'+
						'<a href="#" class="share_post"><img src="images/share.png" alt="" title="" /></a>'+
					'</div>'+
					'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" />'+audio+video+
					
					'<p>'+post_content+'</p>'+
					'</div>'+
					'<input type="hidden" id="title" value="'+title+'"/>'+
					'<input type="hidden" id="audio" value="'+audio+'"/>'+
					'<input type="hidden" id="image" value="'+site_url+'assets/img/posts/'+post_image+'"/>'+
					'<input type="hidden" id="content" value="'+post_content+'"/>'+
					'<blockquote></blockquote>';
						$( "#latest_sermon" ).html( news_item_post );
					}
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_sermons_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			var display = 0;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 9)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var post_image = field['post_image'];
					var post_audio = field['post_audio'];
					var post_video = field['post_video'];
					var created = field['created'];
					var timestamp = new Date(created).getTime()
					var date = new Date(timestamp);
					var month = date.getMonth();
					var day = date.getDay();
					
					news_item_post = 
					'<li>'+
						'<div class="post_entry">'+
							'<div class="post_date">'+
								'<span class="day">'+day+'</span>'+
								'<span class="month">'+month+'</span>'+
							'</div>'+
							'<div class="post_title">'+
							'<h2><a href="sermon.html?id='+id+'" onclick="get_sermons_description('+id+')">'+title+'</a></h2>'+
							'</div>'+
						'</div>'+
					'</li>';
					$( "#all_sermons" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_sermons_description(post_id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			var display = 0;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var id = field['post_id'];
				
				if(id == post_id)
				{
					var title = field['post_title'];
					var post_content = field['post_content'];
					var post_image = field['post_image'];
					var post_audio = field['post_audio'];
					var post_video = field['post_video'];
					var audio = '';
					var video = '';
					
					if(post_audio != '')
					{
						audio = 
						'<blockquote>'+
							'Audio'+
							'<audio controls>'+
								'<source src="'+site_url+'assets/img/posts/'+post_audio+'" type="audio/mpeg" class="align-centre">'+
								'Your browser does not support the audio element.'+
							'</audio>'+
						'</blockquote>';
					}
					
					if(post_video != '')
					{
						video = 
						'<blockquote>'+
								'<iframe width="560" height="315" frameborder="0" allowfullscreen="" src="'+site_url+'assets/img/posts/'+post_video+'?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;autohide=1&amp;controls=0;"></iframe>'+
						'</blockquote>';
					}
					
					news_item_post = '<div class="page_content">'+
					'<blockquote>'+title+'</blockquote>'+
					'<div class="post_social2">'+
						'<a href="#" class="share_post"><img src="images/share.png" alt="" title="" /></a>'+
					'</div>'+
					'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" />'+
					audio+
					video+
					'<p>'+post_content+'</p>'+
					'</div>'+
					'<input type="hidden" id="title" value="'+title+'"/>'+
					'<input type="hidden" id="audio" value="'+audio+'"/>'+
					'<input type="hidden" id="image" value="'+site_url+'assets/img/posts/'+post_image+'"/>'+
					'<input type="hidden" id="content" value="'+post_content+'"/>'+
					'<blockquote></blockquote>';
					
					$( "#sermons_detail" ).html( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

//pass the variable in the link as follows e.g. sermons.html?id=1
//on the sermons.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




