var MembershipService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.registerInfluencer = function() {
		var request = url + "news/get_news" ;
        return $.ajax({url: request});
    }
    this.registerProfessional = function(id) {
		var request = url + "news/get_news_detail" ;
        return $.ajax({url: url + "news/get_news_detail/" + id});
    }

    this.registerInfluencer = function() {
		var request = url + "initiatives/get_initiatives" ;
        return $.ajax({url: request});
    }
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});


//cpd forum query member
$(document).on("submit","form#register_influencer",function(e)
{
	e.preventDefault();
	
	$( "#loader-wrapper" ).removeClass( "display_none" );

	var service = new MembershipService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.registerInfluencer().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#influencer_response" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			/*window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);*/
		}
		
		else
		{

		}
	});
	// get_profile_details();
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_professional",function(e)
{
	e.preventDefault();
	
	$( "#loader-wrapper" ).removeClass( "display_none" );

	var service = new MembershipService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.registerInfluencer().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#professional_response" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			/*window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);*/
		}
		
		else
		{

		}
	});
	// get_profile_details();
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_investor",function(e)
{
	e.preventDefault();
	
	$( "#loader-wrapper" ).removeClass( "display_none" );

	var service = new MembershipService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.registerInfluencer().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#investor_response" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			/*window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);*/
		}
		
		else
		{

		}
	});
	// get_profile_details();
	return false;
});