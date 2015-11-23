var MembershipService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.registerInfluencer = function(form_data) {
		var request = url + "login/register_influencer";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.registerProfessional = function(form_data) {
		// var request = url + "news/get_news_detail" ;
  //       return $.ajax({url: url + "news/get_news_detail/" + id});
  		var request = url + "login/register_professional";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.registerInvestor = function(form_data) {
		var request = url + "login/register_investor";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
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
	
	//get form values
	var form_data = new FormData(this);
		
	$("#influencer_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.registerProfessional(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#influencer_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				
				myApp.closeModal('.popup-influenceup');
				mainView.router.loadPage('influencers.html');
			}
			else
			{
				$("#influencer_response").html('<div class="alert alert-success center-align">'+"Something went wrong. Please try again"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#influencer_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_professional",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#professional_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.registerProfessional(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#professional_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				
				myApp.closeModal('.popup-profup');
				mainView.router.loadPage('professionals.html');
			}
			else
			{
				$("#professional_response").html('<div class="alert alert-warning center-align">'+"Something went wrong. Please try again"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#professional_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_investor",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#investor_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.registerProfessional(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#investor_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				
				myApp.closeModal('.popup-investorup');
				mainView.router.loadPage('investors.html');
			}
			else
			{
				$("#investor_response").html('<div class="alert alert-warning center-align">'+"Something went wrong. Please try again"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#investor_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});