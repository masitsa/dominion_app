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


var EmployeeNewsService = function() {

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

    this.get_influencers = function() {
		var request = url + "news/get_blog_items/25" ;
        return $.ajax({url: request});
    }

    this.get_professionals = function() {
		var request = url + "news/get_blog_items/26" ;
        return $.ajax({url: request});
    }

    this.get_investors = function() {
		var request = url + "news/get_blog_items/27" ;
        return $.ajax({url: request});
    }

    this.getallLatesNews = function() {
		var request = url + "news/get_news" ;
        return $.ajax({url: request});
    }
    this.getNewsDetail = function(id) {
		var request = url + "news/get_news_detail" ;
        return $.ajax({url: url + "news/get_news_detail/" + id});
    }

    this.getallinitiatives = function() {
		var request = url + "initiatives/get_initiatives" ;
        return $.ajax({url: request});
    }
    this.getInitiativeDetail = function(id,parent_id) {
		var request = url + "initiatives/get_news_detail" ;
        return $.ajax({url: url + "initiatives/get_initiative_detail/"+id+"/"+parent_id});
    }
    this.getallarms = function() {
		var request = url + "arms/get_arms" ;
        return $.ajax({url: request});
    }
    this.getArmsDetail = function(id) {
		var request = url + "arms/get_news_detail" ;
        return $.ajax({url: url + "arms/get_arms_detail/" + id});
    }
    this.getInitativePage = function(id) {
		var request = url + "initiatives/get_initiative_page" ;
        return $.ajax({url: url + "initiatives/get_initiative_page/" + id});
    }
    this.getbibleschooldetail = function() {
		var request = url + "bible_school/get_bible_school_detail" ;
        return $.ajax({url: request});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_news_items_old()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesNews().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#icpak_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}

function get_news_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 5)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var created = field['created'];
					var timestamp = new Date(created).getTime()
					var date = new Date(timestamp);
					var month = date.getMonth();
					var day = date.getDay();
					
					//news_item_post = '<div class="accordion-item"><div class="accordion-item-toggle"><i class="icon icon-plus">+</i><i class="icon icon-minus">-</i><span>'+title+'</span></div><div class="accordion-item-content">'+post_content+'</div> </div>';
					news_item_post = 
					'<li>'+
						'<div class="post_entry">'+
							'<div class="post_date">'+
								'<span class="day">'+day+'</span>'+
								'<span class="month">'+month+'</span>'+
							'</div>'+
							'<div class="post_title">'+
								'<h3><a href="sermon.html?id='+id+'" onclick="get_sermons_description('+id+')">'+title+'</a></h3>'+
							'</div>'+
						'</div>'+
					'</li>';
					$( "#icpak_news" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_news_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getNewsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#news_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

function get_initiative_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 12)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var mini_string = getWords(post_content);
					
					news_item_post = 
					'<li>'+
						'<div class="feat_small_details" style="margin:0 45px 3px;">'+
							'<a href="initiative-page.html?id='+id+'" onclick="get_initiative_page('+id+')"><h4>'+title+'</h4></a>'+
							'<a href="initiative-page.html?id='+id+'" onclick="get_initiative_page('+id+')">'+mini_string +'</a>'+
						'</div>'+
						'<div class="view_more"><a href="initiative-page.html?id='+id+'" onclick="get_initiative_page('+id+')"><img src="images/load_posts_disabled.png" alt="" title="" /></a></div>'+
					'</li>';
					$( "#initiatives_list" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_initiative_items_old()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallinitiatives().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			// alert(data.result);
			$( "#initiatives_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			// window.localStorage.setItem("initiative_history", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}

function get_initiatives_description(post_id, parent_id)
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
				var id = field['post_id'];
				
				if(id == post_id)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var post_image = field['post_image'];
					
					news_item_post = 
					'<div class="navbarpages">'+
		       			'<div class="nav_left_logo"><a href="index.html"><img src="images/crown86.png" alt="" title="" /></a></div>'+
		       			'<div class="nav_right_button">'+
		       				'<a href="#" data-popup=".popup-menu" class="open-popup"><img src="images/icons/white/menu.png" alt="" title="" /></a>'+
		       				'<a href="initiative-page.html?id='+parent_id+'" onClick="get_initiative_page('+parent_id+')"><img src="images/icons/white/back.png" alt="" title=""  /></a>'+
		       			'</div>'+
		       		'</div>'+
		       		
					'<div id="pages_maincontent">'+
		       			'<h2 class="page_title">'+title+'</h2>'+
		       			'<div class="page_content"> '+
							'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" />'+
							post_content+
						'</div>'+
		      		'</div>';
					$( "#initiative_detail" ).html( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_initiatives_description_old(id,parent_id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	
	
	service.getInitiativeDetail(id,parent_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			
			$( "#initiative_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

function get_arms_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 16)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var post_image = field['post_image'];
					var mini_string = getWords(post_content);
					
					news_item_post = 
					'<li>'+
						'<div class="feat_small_icon"><img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" /></div>'+
						'<div class="feat_small_details">'+
							'<h4>'+title+'</h4>'+
							'<a href="dominion-generation.html?id='+id+'" onclick="get_arms_description('+id+')">'+mini_string +'+..</a>'+
						'</div>'+
						'<div class="view_more"><a href="dominion-generation.html?id='+id+'" onclick="get_arms_description('+id+')"><img src="images/load_posts_disabled.png" alt="" title="" /></a></div>'+
					'</li>';
					$( "#arms_list" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}
function get_arms_items_old()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallarms().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#arms_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			// window.localStorage.setItem("initiative_history", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}

function bible_school_detail_old()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getbibleschooldetail().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#bible_school_detail" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("bible_school_detail", data.result);
		}
		
		else
		{

		}
	});
}

function bible_school_detail()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var news_item_post = '';
	
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			
			for(var r = 0; r < rows; r++)
			{
				var field = arr[r];
				var blog_category_id = field['blog_category_id'];
				if(blog_category_id == 23)
				{
					var id = field['post_id'];
					var title = field['post_title'];
					var post_content = field['post_content'];
					var post_image = field['post_image'];
					var mini_string = getWords(post_content);
					
					/*news_item_post = 
					'<div class="post_single">'+
						'<div class="page_content"> '+
						  '<div class="entry">'+
							post_content+
						  '</div>'+
						'</div>'+
					  '</div>';*/
					  news_item_post = 
					  '<li>'+
					  	'<div class="feat_small_icon"><img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" /></div>'+
					  		'<div class="feat_small_details">'+
					  			'<a href="college-detail.html?id='+id+'" onclick="get_college_details('+id+')"><h4>'+title+'</h4></a>'+
					  			'<a href="college-detail.html?id='+id+'" onclick="get_college_details('+id+')">'+mini_string +'+..</a>'+
					  		'</div>'+
					  		
							'<div class="view_more"><a href="college-detail.html?id='+id+'" onclick="get_college_details('+id+')"><img src="images/load_posts_disabled.png" alt="" title="" /></a></div>'+
					  	'</li>';
					$( "#bible_school_detail" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_college_details(post_id)
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
					
					news_item_post = 
					'<blockquote>'+title+'</blockquote>'+
					'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" />'+
					'<p>'+post_content+'</p>';
					$( "#college_title" ).html(title);
					$( "#college_details" ).html( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_arms_description(post_id)
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
					
					news_item_post = 
					'<blockquote>About '+title+'</blockquote>'+
					'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="" title="" />'+
					'<p>'+post_content+'</p>';
					
					$( "#sermons_detail" ).html( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_arms_description_old(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getArmsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#arms_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{
			
		}
	});
}

function get_initiative_page(post_id)
{
	var cat_id = 15;//spiritual
	
	if(post_id == 26)
	{
		// economic
		cat_id = 13;
	}
	else if(post_id == 27)
	{
		// social
		cat_id = 14;
	}
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
				var id = field['post_id'];
				var title = field['post_title'];
				var post_content = field['post_content'];
				var post_image = field['post_image'];
				
				//alert(id+' -- '+post_id);
				if(id == post_id)
				{
					//alert(title+' -- '+post_content);
					
					$( "#page_title" ).html( title );
					$( "#tab3_title" ).html( 'About '+title );
					$( "#initiative_content" ).html( post_content );
				}
				
				if(blog_category_id == cat_id)
				{
					//alert('cat = '+cat_id+' -- '+blog_category_id);
					
					news_item_post = 
					'<li>'+
						'<a href="initiative-detail.html?id='+id+'" onclick="get_initiatives_description('+id+','+post_id+');" title="'+title+'" >'+
							'<img src="'+site_url+'assets/img/posts/'+post_image+'" alt="'+title+'"/>'+
							'<h3>'+title+'</h3>'+
						'</a>'+
					'</li>'+
					'<div class="clearleft"></div>';
					$( "#photoslist" ).append( news_item_post );
				}
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
}

function get_initiative_page_old(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getInitativePage(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			
			$( "#initiative_page" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

//pass the variable in the link as follows e.g. news.html?id=1
//on the news.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




