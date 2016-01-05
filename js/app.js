var myApp = new Framework7({
	init: false //Disable App's automatica initialization
});
var $$ = Dom7;
	
myApp.onPageInit('install', function (page) {
	
	var database_service = new Database();
	database_service.initialize().done(function () {
		//alert("Database service initialized");
	});
	
	var response = database_service.delete_database();
});


//login & registration functions
var Login_service = function() {

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

    this.register_member = function(form_data) {
		var request = url + "login/register_user";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
}

//login & registration functions
var Database = function() {

    var db;

    this.initialize = function(serviceURL) {
        db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.delete_database = function() 
	{
		$( "#loader-wrapper" ).removeClass( "display_none" );
		
		var successFn2 = function(count){
			//alert("Successfully wiped "+count+" tables");
			var database_service = new Database();
			database_service.initialize().done(function () {
				//alert("Database service initialized");
			});
			
			var response2 = database_service.create_database();
			$( "#loader-wrapper" ).addClass( "display_none" );
		};
		var errorFn2 = function(error){
			//alert("The following error occurred: "+error.message);
			$( "#loader-wrapper" ).addClass( "display_none" );
		};
		var progressFn2 = function(current, total){
			//alert("Wiped "+current+"/"+total+" tables");
		};
		
		cordova.plugins.sqlitePorter.wipeDb(db, {
			successFn: successFn2,
			errorFn: errorFn2,
			progressFn: progressFn2
		});
    }

    this.create_database = function() {
		var sql = "CREATE TABLE IF NOT EXISTS blog_category ([blog_category_id] PRIMARY KEY,[blog_category_name],[blog_category_status],[created],[created_by],[last_modified],[modified_by],[blog_category_parent],[created_status],[read_status]);INSERT INTO blog_category (blog_category_id, blog_category_name, blog_category_status, created, created_by, last_modified, modified_by, blog_category_parent, created_status, read_status) VALUES(4, 'Events', 1, '2014-09-20 17:15:02', 3, '2015-10-27 12:50:01', 0, 0, 1, 1),(5, 'News', 1, '2014-09-20 17:15:09', 3, '2015-10-27 12:51:00', 0, 0, 1, 1),(8, 'Uziri Institute Programs', 1, '2014-10-23 16:47:03', 11, '2015-11-04 19:34:48', 0, 16, 1, 1),(9, 'Sermons', 1, '2015-07-10 13:38:11', 3, '2015-10-27 13:10:21', 0, 0, 1, 1),(10, 'Individual', 1, '0000-00-00 00:00:00', 0, '2015-11-04 20:23:09', 0, 12, 1, 1),(11, 'Uzuri Institute Events', 1, '2015-10-27 15:54:06', 0, '2015-11-04 19:34:33', 0, 16, 1, 1),(12, 'Initiatives', 1, '2015-10-28 18:27:20', 0, '2015-10-28 15:27:20', 0, 0, 1, 1),(13, 'Church', 1, '2015-10-28 18:28:00', 0, '2015-10-28 15:28:00', 0, 12, 1, 1),(14, 'Corporates', 1, '2015-10-28 18:28:15', 0, '2015-10-28 15:28:15', 0, 12, 1, 1),(15, 'Institution Of Learning', 1, '2015-10-28 18:28:40', 0, '2015-10-28 15:28:40', 0, 12, 1, 1),(16, 'Arms', 1, '2015-10-29 11:27:58', 0, '2015-10-29 08:27:58', 0, 0, 1, 1),(19, 'Dominion Generation News', 1, '2015-10-29 12:22:37', 0, '2015-10-29 09:22:37', 0, 16, 1, 1),(20, 'Dominion Generation Events', 1, '2015-10-29 12:23:13', 0, '2015-10-29 09:23:13', 0, 16, 1, 1),(21, 'Dpc News', 1, '2015-11-04 22:35:39', 0, '2015-11-04 19:35:39', 0, 16, 1, 1),(22, 'Dpc Events', 1, '2015-11-04 22:35:55', 0, '2015-11-04 19:35:55', 0, 16, 1, 1),(23, 'Bible School', 1, '2015-11-04 22:41:03', 0, '2015-11-04 19:41:03', 0, 0, 1, 1),(24, 'Dominion Empowerment Forum', 1, '2015-11-21 16:13:05', 0, '2015-11-21 13:13:05', 0, 0, 1, 1),(25, 'Dg Influencers', 1, '2015-11-21 16:13:24', 0, '2015-11-21 13:13:24', 0, 24, 1, 1),(26, 'Dg Young Professionals', 1, '2015-11-21 16:14:02', 0, '2015-11-21 13:14:02', 0, 24, 1, 1),(27, 'Dg Investors', 1, '2015-11-21 16:14:55', 0, '2015-11-21 13:14:55', 0, 24, 1, 1);CREATE TABLE IF NOT EXISTS contacts ( [contacts_id] PRIMARY KEY,[email],[phone],[address],[post_code],[building],[facebook],[company_name],[logo],[motto],[pintrest],[city],[floor],[location],[working_weekday],[working_weekend],[mission],[vision],[thumb],[twitter],[about],[objectives],[core_values],[created_status],[read_status]);INSERT INTO contacts (contacts_id, email, phone, address, post_code, building, facebook, company_name, logo, motto, pintrest, city, floor, location, working_weekday, working_weekend, mission, vision, thumb, twitter, about, objectives, core_values, created_status, read_status) VALUES(1, 'info@dominiongenerationevangelism.co.ke', '', '', '', '', '', 'Dominion Generation Evangelism', 'e4505e2a9d24a793b790f782c911f903.png', '0', '', '', '', '', '', '', 'Our mission is to <br>', 'Our vision is to<br>', 'thumbnail_e4505e2a9d24a793b790f782c911f903.png', '', 'Campus Diary is a youthful publication focusing majorly on university and college students and the youth in general.<br><p>We strive at improving lives of the young generation for a better <br>future, creating a platform for them to air their views and have their <br>opinions count in various decision making processes. </p><br><p>We strive at changing the perceptions of students as loud and idle to<br> visionary capable individuals who will rule tomorrow; to inspire them <br>to rise beyond their average thinking to be useful individuals to the <br>society; to educate on the issues that matter to them for their own <br>personal developments. </p><br><br>', 'Our objective is to let young voices be heard and their experiences felt.<br>', '<ul><li>Integrity</li><li>Respect </li><li>Teamwork</li><li>Creativity and Innovation</li><li>Social Responsibility</li></ul>', 1, 1);CREATE TABLE IF NOT EXISTS event ([event_id] PRIMARY KEY,[event_name],[event_description],[event_image_name],[event_web_name],[created],[created_by],[last_modified],[modified_by],[event_status],[event_venue],[event_start_time],[event_end_time],[event_location],[event_admission],[created_status],[read_status]);CREATE TABLE IF NOT EXISTS post ([post_id] PRIMARY KEY,[post_title],[post_content],[created],[post_status],[post_views],[post_image],[created_by],[modified_by],[last_modified],[post_thumb],[post_comments],[blog_category_id],[tiny_url],[post_video],[post_audio],[created_status],[read_status]);INSERT INTO post (post_id, post_title, post_content, created, post_status, post_views, post_image, created_by, modified_by, last_modified, post_thumb, post_comments, blog_category_id, tiny_url, post_video, post_audio, created_status, read_status) VALUES(9, 'About Us', 'Dominion Generation is an Non Profit Organization that functions to empower its members by engaging them in spiritual, social and economic activities.<br>At Dominion Generation, members are also encouraged to participate in investment ventures that target to empower their economic ability to sustain themselves though business.', '2015-10-29', 1, 48, '8a1a35c0d4ab3080acf230a88187efa9.jpg', 3, 0, '2014-09-20 17:25:36', 'thumbnail_8a1a35c0d4ab3080acf230a88187efa9.jpg', 0, 16, 'http://tinyurl.com/p6jgbxc', '', '', 1, 1),(10, 'Arms', '<span>There are two major arms:</span><div><span>1  Uzuri institute Uzuri Institute</span><span> was started back in August 2001.</span></div><div><span><br></span></div><span>At UZURI We believe that anyone can achieve whatever they put their mind to, thus our slogan </span><span>&quotAnything is possible&quot</span><div><span>There are various schools found here at Uzuri which include:</span><div><blockquote><span><div>1  School of Technology and Media </div></span><span><div>2  School of Development </div></span><span><div>3  School of leadership </div></span><span><div>4  School of Hospitality and Tourism </div></span><span><div>5  School of Business </div></span><span><div>6  School of Cosmetology and Fashion </div></span></blockquote><div><span>2 Dominion Position Chapel</span> </div><span>We have a chapel within Uzuri Institute that takes care of the community as well as the students community around Thika and its environs. </span></div></div><div><span><br></span></div><span>Our order of services are as follows:</span><br><blockquote></blockquote><blockquote><span>1st service : </span> 8 am - 10:00 am : <br><span>2nd service : </span>10 am - 12 noon</blockquote><span>Contact us on 0715603362</span><div><span><span class=&quotApple-tab-span&quot>  </span>All are welcome</span></div>', '2015-10-29', 1, 20, 'a1689376df28de342633ad04989bcde5.jpg', 3, 0, '2014-09-20 17:26:08', 'thumbnail_a1689376df28de342633ad04989bcde5.jpg', 0, 16, 'http://tinyurl.com/nc22xzw', '', '', 1, 1),(12, 'Empowerment Forums', 'The empowerment forums include: <br>1 Dominion generation influencers -These are leaders drawn from church, business arenas, community and the government<br>2 Young Professionals -They include college students and working class youths up to the age of 35. <br>3. Dominion generation investor -This will involve those people who are willing to invest in DG real estate investments.', '2015-10-29', 1, 12, 'a0e56715c5dd8d4fb6a899551992aeec.jpg', 3, 0, '2014-09-20 19:04:53', 'thumbnail_a0e56715c5dd8d4fb6a899551992aeec.jpg', 0, 16, 'http://tinyurl.com/pdlxoas', '', '', 1, 1),(13, 'Essay Writing Competition', 'DISCOVER YOUR POTENTIAL Do you have untapped writing skills, Uzuri institute is the place to be. Annual Essy writing competitions are held and students from all over Kenya are encouraged to take part. <br> Below is a list of the best schools and students who took part in the August 2015 competition <br><strong >Best school: Precious Blood girls high school-Riruta <br>Number 2: St. Ann Gichocho girls high school <br>Number 3: Ngararia girls high school<br>Best student: Agutu Tracy Vera -Precious Blood girls high school-Riruta <br>1st runners up: Kibet Jackline Cheruto -Precious Blood girls high school -Riruta <br>2nd runners up: June Akhwale Anachoni- Precious Blood girls high school -Riruta <br>The most creative: Beverly Muhonja -St. Ann Gichocho girls high school</strong>\n', '2014-09-20', 1, 6, 'd6a2a92ea5819f5c9754f841c3698840.jpg', 3, 0, '2014-09-20 19:25:13', 'thumbnail_d6a2a92ea5819f5c9754f841c3698840.jpg', 0, 5, 'http://tinyurl.com/pup5v7u', '', '', 1, 1),(15, 'Essay Writing Competition', 'Discover your potential', '2014-09-20', 1, 51, 'e640266dedd18bb784052fb2c640a54f.jpg', 11, 0, '2014-10-27 15:21:18', 'thumbnail_e640266dedd18bb784052fb2c640a54f.jpg', 0, 4, 'http://tinyurl.com/o8guvue', '', '', 1, 1),(16, 'Uzuri Institute', 'Uzuri institute was started back in August 2001, and has since then seen the successful graduation of over 200 students. <br> There are various categories of schools namely; <br><bgcolor fffrrrf>School of Technology <br>School of Development <br>School of leadership', '2015-10-28', 1, 1, '134669c4766ff1b0d616a309707ccb8a.png', 3, 0, '2015-07-10 10:48:02', 'thumbnail_134669c4766ff1b0d616a309707ccb8a.png', 0, 15, 'http://tinyurl.com/nfcyuhn', '', '', 1, 1),(17, 'Dominion Projects', '<br> Towards the end of November 2015, all roads lead to Nakuru. <br>FrontLine Ministries invites all to FrontLine Apostolic Leadership Summit. <br> VENUE: EastMore Girls High School <br> DATES: 24th -28th November 2015<br>HOST: Meshack Gachago- The Founding Apostolic Father - FrontLine Apostolic Ministries & JoyLand Bible Churches<br>CO-HOST: James Njuguna-National Chairman FrontLine Ministries &Joyland Bible Churches<br>GUEST MINISTERS:8<ol><li>Dr. Judy Nyaga- New Covenant Church Nairobi & School of Faith International</li><li>Martin Vaughan-USA</li></ol><br>OTHER MINISTERS <ol><li>P.M Elisha - Nairobi</li><li>Ken Kirui - Bomet</li><li>Patrick Cheruiyot - Kericho </li><li>Dr. Peter Koros - Nakuru </li></ol><br>For more information call us on 0723103042 or 0710760108 or 0714711766<br>CHARGES: KSH 2,200 per per son full board\n<br><br>All church ministers and leaders are invited for the 3rd edition of <br>DOMINION PASTORS AND MINISTRY LEADERS CONFERENCE(An International Strategic Gathering for Relevant Equipping)<br>DATES:24th - 27th November 2015<br>TIME:8:00am - 4:30pm Daily<br>HOST MINISTERS: JAMES AND RD. LUCY MBUGUA <br>GUEST MINISTERS:<ol><li>PS. RANDOLPH BARNWELL -Gate Ministries South Africa </li><li>ENG. SIMON NGURE - Director KenGen<br><br><li>CORDINATOR: PS. SAMUEL KIMARU - Uhai Center Kiambu</ol><br>VENUE: Fountain Gate Church Nairobi<br> REGISTRATION :2000Ksh For meals and materials<br>Call us on +254 716919783 or +254 736919783<br>www.fountaingatechurch.org<br>Email:dmc@jamesmbugua.com', '2015-10-28', 1, NULL, '34a09be88390059a1a52421ef0484e85.jpg', 3, 0, '2015-07-10 10:56:21', 'thumbnail_34a09be88390059a1a52421ef0484e85.jpg', 0, 13, 'http://tinyurl.com/pruymwg', '', '', 1, 1),(18, 'Young Professionals Forum', '<br> Mission <br> To build a people, who are professionally, socially and financially strong to be influencers where they are planted, and who reflec Christ''s image.', '2015-10-29', 1, NULL, '63818e73f7f8da993e86f1845e3724eb.jpg', 3, 0, '2015-07-10 10:58:45', 'thumbnail_63818e73f7f8da993e86f1845e3724eb.jpg', 0, 19, 'http://tinyurl.com/o7gtvsz', '', '', 1, 1),(19, 'We Need Christ To Reign In Life', '<p>Hello and welcome to the 5 min church with Pastor Mercy<br><br>When God begins any work, He has it''s fulfillment and continuity in place even before He begins it. It is written He is the alpha and omega. The beginning and the end. The eternal God.<br><br>Just looking at the creation story in Genesis tells you and me that the eternal, heavenly unseen realm is so real as to be the the place from which all things come.<br>Heb 11;3 says '' by faith we understand that the worlds were framed by the word of God, so that the things which are seen were not made of things which are visible.''<br><br>Also John 1; 1-3 points us to The Word being that which creates, sustains and establishes all things.<br>'' in the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through Him, and without Him nothing was made that was made.''<br><br>Heb 1;3 describes Christ as the brightness of the Fathers glory and the express image of His person, and upholding all things by the Word of His power.<br><br>As we have read in the scriptures, this Word is a person. The Word is Christ. Who is also the image and glory of God.<br><br>And according to this image, who is Christ Jesus, man was made and given dominion over Gods creation.<br><br>This tells us that the life we live is not of ourselves. The source is Christ. The sustainer is Christ. And whatever He forms, He has eternity in mind.<br><br>This also tells us that there is an order of things. The spiritual first before the physical- hence mans quest to discover and relate with the Creator of all things who is our Father.<br><br>That is why Jesus said '' when you pray, pray ''our Father who art in heaven''<br>That is to say Our Father who owns, rules and sits in the unseen but very real realm and from whom all our providence and sustenance comes.<br><br>Therefore to attempt to live life according to what we see is to live a very limited unfulfilling life which is upside down of the correct order of things.<br><br>It is from Him that we have all things! We need Christ! We need Christ to reign in Life!<br><br>Thank you for taking time to join us in the Word today. This is Pst Mercy Githinji.</p>', '2015-11-06', 1, NULL, '7984b108ad43148e6af6033c70589c0b.jpg', 0, 0, '2015-10-29 14:52:00', 'thumbnail_7984b108ad43148e6af6033c70589c0b.jpg', 0, 9, 'http://tinyurl.com/osuyrnk', '', 'sermon.mp3', 1, 1),(20, 'Bible School', '<br> Come Jan 2016, Uzuri is launching a Bible school arm dubbed &quotThe Bible school by Extension&quot.<br> For more information, contact us on 0715603362 on how you can be a participant in your church or organization', '2015-11-04', 1, NULL, '5a206196889263bf3eeca9dd3547f75b.jpg', 0, 0, '2015-11-04 19:44:55', 'thumbnail_5a206196889263bf3eeca9dd3547f75b.jpg', 0, 23, 'http://tinyurl.com/ouwhppx', '', '', 1, 1),(21, 'Dominion Generation Young Professionals Forum', 'All young professionals are invited to Dominion Generation meetings that happen every alternate thursday. Bring someone along <div><span >For more information contact us on dominiongeneration@gmail.com</span></div>', '2014-09-20', 1, NULL, 'b1a0770ac5a7e170413001bd1d41e474.jpg', 0, 0, '2015-11-05 19:35:18', 'thumbnail_b1a0770ac5a7e170413001bd1d41e474.jpg', 0, 5, 'http://tinyurl.com/orrptrq', '', '', 1, 1),(22, 'Lorem Ipsum', '<p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique magna in nisi ultricies, sed tristique dui porta. Nunc interdum tristique hendrerit. Integer dolor erat, imperdiet quis ultrices vitae, pellentesque pharetra libero. Vivamus eget sollicitudin risus. Morbi rhoncus velit elementum urna feugiat blandit. Phasellus venenatis bibendum ante, nec lobortis velit viverra eu. In eget volutpat lectus, sed cursus nibh. Pellentesque ultricies velit ut elit scelerisque congue. Aliquam aliquam, sem id rutrum tincidunt, quam libero ornare lacus, non fringilla risus velit id turpis. Sed sagittis massa ac eleifend egestas. Integer sapien odio, rutrum a sem eu, commodo fringilla orci. Duis sodales fringilla mi, quis faucibus nunc. Maecenas ac feugiat purus. Curabitur eleifend tortor tincidunt sapien ultrices, eu facilisis nulla eleifend. Aliquam lacinia dapibus elit sed posuere.</p><p >Donec aliquet pretium dui, at varius odio volutpat at. Integer ac pharetra libero, sed vehicula enim. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam porttitor sem nisl. Vestibulum quis urna euismod augue posuere mollis. Sed auctor odio ut luctus vestibulum. Suspendisse non viverra risus, ac vulputate urna. Aenean consequat est libero, id viverra quam auctor quis. Integer ac dui at nulla imperdiet viverra ac eleifend felis. Curabitur bibendum quam a dictum sodales. Fusce convallis pellentesque tortor. Curabitur faucibus est nunc, porttitor condimentum orci pellentesque non. Phasellus lacinia, lectus ac porta imperdiet, leo quam elementum arcu, sit amet accumsan sem risus eget sapien. Vestibulum sed odio sit amet libero bibendum ullamcorper nec a ex.</p>', '2014-12-01', 1, NULL, '15f6dc4934ad01c79cb6ddbf947c1d04.png', 0, 0, '2015-11-21 13:18:02', 'thumbnail_15f6dc4934ad01c79cb6ddbf947c1d04.png', 0, 25, 'http://tinyurl.com/nzf42ha', 'https://www.youtube.com/watch?v=CO6ClvOf92A', 'SermonAudio.com - Media Player.mp3', 1, 1),(24, 'Lorem Ipsum', '<p >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique magna in nisi ultricies, sed tristique dui porta. Nunc interdum tristique hendrerit. Integer dolor erat, imperdiet quis ultrices vitae, pellentesque pharetra libero. Vivamus eget sollicitudin risus. Morbi rhoncus velit elementum urna feugiat blandit. Phasellus venenatis bibendum ante, nec lobortis velit viverra eu. In eget volutpat lectus, sed cursus nibh. Pellentesque ultricies velit ut elit scelerisque congue. Aliquam aliquam, sem id rutrum tincidunt, quam libero ornare lacus, non fringilla risus velit id turpis. Sed sagittis massa ac eleifend egestas. Integer sapien odio, rutrum a sem eu, commodo fringilla orci. Duis sodales fringilla mi, quis faucibus nunc. Maecenas ac feugiat purus. Curabitur eleifend tortor tincidunt sapien ultrices, eu facilisis nulla eleifend. Aliquam lacinia dapibus elit sed posuere.</p><p >Donec aliquet pretium dui, at varius odio volutpat at. Integer ac pharetra libero, sed vehicula enim. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam porttitor sem nisl. Vestibulum quis urna euismod augue posuere mollis. Sed auctor odio ut luctus vestibulum. Suspendisse non viverra risus, ac vulputate urna. Aenean consequat est libero, id viverra quam auctor quis. Integer ac dui at nulla imperdiet viverra ac eleifend felis. Curabitur bibendum quam a dictum sodales. Fusce convallis pellentesque tortor. Curabitur faucibus est nunc, porttitor condimentum orci pellentesque non. Phasellus lacinia, lectus ac porta imperdiet, leo quam elementum arcu, sit amet accumsan sem risus eget sapien. Vestibulum sed odio sit amet libero bibendum ullamcorper nec a ex.</p>', '2015-08-11', 1, NULL, '5d32afdd6fc59d6f78318613997de562.png', 0, 0, '2015-11-21 13:53:56', 'thumbnail_5d32afdd6fc59d6f78318613997de562.png', 0, 27, 'http://tinyurl.com/pmx99xo', 'https://www.youtube.com/watch?v=CO6ClvOf92A', 'SermonAudio.com - Media Player.mp3', 1, 1),(25, 'Lorem Ipsum', '<br>Join Dominion Generation young professionals forum', '2015-11-21', 1, NULL, 'e4bed77567dd5e2c0453ae2e7b9876a2.jpg', 0, 0, '2015-11-21 13:55:32', 'thumbnail_e4bed77567dd5e2c0453ae2e7b9876a2.jpg', 0, 26, 'http://tinyurl.com/qyjdeyf', 'https://www.youtube.com/watch?v=CO6ClvOf92A', 'SermonAudio.com - Media Player.mp3', 1, 1),(26, 'Economic Projects', '<br>Uzuri Institute staff and students at a community service.', '2015-10-28', 1, NULL, '3db53a77f176cf3cd268bd9cc167b15e.jpg', 0, 0, '2015-11-21 14:39:46', 'thumbnail_3db53a77f176cf3cd268bd9cc167b15e.jpg', 0, 12, 'http://tinyurl.com/pjlyf7y', '', '', 1, 1),(27, 'Social Projects', 'Social projects', '2015-11-04', 1, NULL, '266a7e7e9ab89dc717ca7fe0ee1db29e.jpg', 0, 0, '2015-11-21 14:40:27', 'thumbnail_266a7e7e9ab89dc717ca7fe0ee1db29e.jpg', 0, 12, 'http://tinyurl.com/prh5acp', '', '', 1, 1),(28, 'Spiritual Projects', '<br>All  hurch Ministers and Leaders are invited for the 3rd edition of DOMINION PASTORS AND MINISTRY LEADERS CONFERENCE.<br>DATES:24TH-27TH NOVEMBER 2015<br> TIME:8.00 AM - 4.30PM<br>HOST MINISTERS: DR. LUCY & JAMES MBUGUA-FOUNTAIN GATE CHURCH NAIROBI<br>GUEST MINISTERS:<ol><li>PS. RANDOLPH BARNWELL -GATE MINISTRIES S.A<li> ENG. SIMON NGURE- DIRECTOR KENGEN <li> PS. SAMUEL KIMARU-UHAI CENTER KIAMBU-CORDINATOR </ol><br>VENUE: FOUNTAIN GATE CHURCH NAIROBI<br>REGISTRATION: 2, 000KSH FOR MEALS AND MATERIALS<br>THEME: EFFECTIVE SHEPHERDING ', '2015-10-28', 1, NULL, '89a3f5d14c2e43afa0ac45e96f0c3b3c.jpg', 0, 0, '2015-11-21 14:41:13', 'thumbnail_89a3f5d14c2e43afa0ac45e96f0c3b3c.jpg', 0, 12, 'http://tinyurl.com/psgstut', '', '', 1, 1);CREATE TABLE IF NOT EXISTS post_comment ([post_comment_id] PRIMARY KEY,[post_id],[comment_created],[post_comment_user],[post_comment_email],[post_comment_description],[post_comment_status],[comment_last_modified],[created_status],[read_status]);INSERT INTO post_comment (post_comment_id, post_id, comment_created, post_comment_user, post_comment_email, post_comment_description, post_comment_status, comment_last_modified, created_status, read_status) VALUES(1, 22, '2015-11-23 10:31:50', 'Alvaro', 'alvaromasitsa@gmail.com', 'Comment\nI was here in 2015', 1, '2015-11-23 07:31:50', 1, 1),(2, 22, '2015-11-23 10:32:58', 'Martin', 'marttkip@gmail.com', 'Martin was here in 2014', 1, '2015-11-23 07:32:58', 1, 1),(3, 22, '2015-11-23 10:35:27', 'Martin', 'marttkip@gmail.com', 'Second try on comments', 1, '2015-11-23 07:35:27', 1, 1),(4, 22, '2015-11-23 10:36:25', 'Alvaro', 'alvaromasitsa@gmail.com', 'asdfasdfadsf', 1, '2015-11-23 07:36:25', 1, 1),(5, 22, '2015-11-23 10:37:16', 'Alvaro', 'alvaromasitsa@gmail.com', 'aucibus est nunc, porttitor condimentum orci pellentesque non. Phasellus lacinia, lectu', 1, '2015-11-23 07:37:16', 1, 1),(6, 22, '2015-11-23 10:38:12', 'Martin', 'marttkip@gmail.com', 'Third time is the charm', 1, '2015-11-23 07:38:12', 1, 1),(7, 24, '2015-11-23 11:11:41', 'Alvaro', 'alvaromasitsa@gmail.com', 'asdfasdfadsf', 1, '2015-11-23 08:11:41', 1, 1),(8, 22, '2015-11-24 08:24:04', 'Martin', 'marttkip@gmail.com', 'My comment is here', 1, '2015-11-24 05:24:04', 1, 1),(9, 25, '2015-11-24 15:28:33', 'Peninah', 'pwwanjiru@gmail.com', 'Hello', 1, '2015-11-24 12:28:33', 1, 1),(10, 25, '2015-11-24 15:28:38', 'Peninah', 'pwwanjiru@gmail.com', 'Hello', 1, '2015-11-24 12:28:38', 1, 1),(11, 22, '2015-11-29 15:01:38', 'nancy', '', 'It''s  a great app', 1, '2015-11-29 12:01:38', 1, 1),(12, 22, '2015-11-29 15:01:53', 'nancy', '', 'It''s  a great app', 1, '2015-11-29 12:01:53', 1, 1),(13, 22, '2015-11-29 15:01:55', 'nancy', '', 'It''s  a great app', 1, '2015-11-29 12:01:55', 1, 1),(14, 22, '2015-11-29 15:01:57', 'nancy', '', 'It''s  a great app', 1, '2015-11-29 12:01:57', 1, 1);";
		
		$( "#loader-wrapper" ).removeClass( "display_none" );
		
		var successFn = function(count){
			//alert("Successfully imported "+count+" SQL statements to DB");
			window.localStorage.setItem('database_check', 'created');
			var mainView = myApp.addView('.view-main');
			var newPageContent = '<div data-page="index" class="page homepage" >' +
									'<div class="page-content">' +
									  '<div class="logo"><img src="images/dominion_logo.png" alt="" title="" /></div>' +
									'</div>' +
								  '</div>';
			 
			//Load new content as new page
			mainView.router.loadContent(newPageContent);
			
			$( "#loader-wrapper" ).addClass( "display_none" );
		};
		var errorFn = function(error){
			//alert("The following error occurred: "+error.message);
			$( "#loader-wrapper" ).addClass( "display_none" );
		};
		var progressFn = function(current, total){
			//alert("Imported "+current+"/"+total+" statements");
		};
		
		//insert into database
		cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
			successFn: successFn,
			errorFn: errorFn,
			progressFn: progressFn
		});
    }
}


/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
	//localStorage.clear();
	//check if database has been created
	var database_check = window.localStorage.getItem('database_check');
	
	//if database has not been created
	if(database_check != 'created')
	{
		// HTML Content of new page:
		var mainView = myApp.addView('.view-main');
		mainView.router.loadPage('install.html');
		/*var newPageContent = '<div class="page" data-page="install">' +
								'<div class="page-content">' +
								  '<p>Installing Please wait</p>' +
								'</div>' +
							  '</div>';
		 
		//Load new content as new page
		mainView.router.loadContent(newPageContent);*/
	}
	
	//background mode
    cordova.plugins.backgroundMode.setDefaults({ title:'Dominion Generation', text:'Reign in Life', silent: true});
    
    //check if background action is enabled
    var enabled = cordova.plugins.backgroundMode.isEnabled();
    if(enabled === false)
    {
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
    }

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        
        //clear other timeouts
        //clearTimeout(all_message_timeout);
        //clearTimeout(single_message_timeout);
        
    };
    
    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        cordova.plugins.backgroundMode.configure({
                        text:errorCode
                    });        
    };
}

(function message_cheker() {
	
	//select last post ID
	var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
	var last_post = 0;
	
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			
			var rows = arr.length;
			
			for(var r = 0; r < rows; r++)
			{
				name = arr[r];
				var post_id = name['post_id'];
				
				if(post_id > last_post)
				{
					last_post = post_id;
				}
			}
			
		}
	}, true);
	
	if(last_post != 0)
	{
        $.ajax({
            url: base_url+'sermons/get_new_sermons/'+last_post,
            cache:false,
            contentType: false,
            processData: false,
            dataType: 'json',
            statusCode: {
                302: function() {
                    //alert('302');
                }
            },
            success: function(data) 
            {
                if(data.message == 'new')
                {
					var query = data.result;
					var post_title = data.post_title;
					
					//save post to db
					var db = window.openDatabase("Test", "1.0", "TestDB", 10 * 1024);
					var sql = query;
					var successFn = function(count){
						//display notification
						cordova.plugins.backgroundMode.configure({title:'New item', text:post_title, silent: false});
					};
					var errorFn = function(error){
						//alert("The following error occurred: "+error.message);
					};
					var progressFn = function(current, total){
						//console.log("Imported "+current+"/"+total+" statements");
					};
					cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
						successFn: successFn,
						errorFn: errorFn,
						progressFn: progressFn
					});
                }
            },
            complete: function() 
            {
                setTimeout(message_cheker, 10000);
            }
        });
	}
})();

$(document).ready(function(){
});

//Register member
$(document).on("submit","form#register_member",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#register_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.register_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("member_email", $("input[name=email]").val());
				window.localStorage.setItem("member_password", $("input[name=password]").val());
				window.localStorage.setItem("member_phone", $("input[name=phone]").val());
				window.localStorage.setItem("member_first_name", $("input[name=first_name]").val());
				window.localStorage.setItem("member_last_name", $("input[name=last_name]").val());
				window.localStorage.setItem("member_company", $("input[name=company]").val());
				window.localStorage.setItem("member_no", $("input[name=member_no]").val());
			}
			alert(data.result);
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#register_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

function HideModalPopup() 
{
 $("#ModalBehaviour").hide(); 
}

//Login member
$(document).on("submit","form#login_member",function(e)
{
	e.preventDefault();
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		var member_no = $("input[name=member_no]").val();
		var password = $("input[name=password]").val();
		
		service.login_member(member_no, password).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//display login items
				service.get_member_details(member_no).done(function (employees) {
				var data_two = jQuery.parseJSON(employees);
				var first_name = data_two.member_first_name;
				$( "#user_logged_in" ).html( '<h4>Welcome back '+first_name+'</h4>' );
				});
				
				$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
				$( ".user-nav ul li#my_account" ).css( "display", 'inline-block' );
	

				// $( "#first_page" ).css( "display_none", 'inline-block' );
				// $( "#logged_in_page" ).css( "display", 'inline-block' );
				
				$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
				$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

				$('.popup-login').removeClass('modal-in');
				$('.popup-login').css('display', 'none');
				$('.popup-overlay').removeClass('modal-overlay-visible');
				
				
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

//get a logged in user's details
function get_event_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {


		var data = jQuery.parseJSON(employees);
		var first_name = data.member_first_name;
		var email = data.member_email;
		var member_id = data.member_id;
		var member_no = data.member_code;

		window.localStorage.setItem("member_id", member_id);
		window.localStorage.setItem("member_first_name", first_name);
		window.localStorage.setItem("member_email", email);
		window.localStorage.setItem("member_no", member_no);

		$( "#questionForm_email" ).val( email );
		$( "#questionForm_user" ).val( first_name );
		$( "#questionForm_id" ).val( member_id );
		$( "#app_user" ).html( first_name );
	});
}

//get a logged in user's details
function get_social_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var email = data.member_email;
		var member_id = data.member_id;
		
		$( "#social_member_email1" ).val( email );
		$( "#social_member_id1" ).val( member_id );
		
		$( "#social_member_email2" ).val( email );
		$( "#social_member_id2" ).val( member_id );
		
	});
}

//cpd forum query member
$(document).on("submit","form#cpd_query_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#cpdquery_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_cpd_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#cpdquery_response").html('<div class="alert alert-success center-align">'+"Your question has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	// get_profile_details();
	return false;
});

function set_news_data()
{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		service.getallLatesNews().done(function (employees) {
		
		var data = jQuery.parseJSON(employees);
		
		window.localStorage.setItem("news_history", data.result);
		window.localStorage.setItem("total_news", data.total);
	});
}
function load_messages()
{
	var messages = window.localStorage.getItem("news_history");
	$("#icpak_news").html(messages);
}

function change_to_arms()
{
	get_arms_items();
	window.location.href = "arms.html";
}

$$(document).on('pageInit', '.page[data-page="influencers"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_influencers().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#influencers_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("influencers_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
})

$$(document).on('pageInit', '.page[data-page="professionals"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_professionals().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#professionals_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("professionals_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

$$(document).on('pageInit', '.page[data-page="investors"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_investors().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#investors_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("investors_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

//Share post
$(document).on("click","a.share_post",function(e)
{
	e.preventDefault();
	
	var message = $( "#content" ).val();
	var subject = $( "#title" ).val();
	var file = $( "#image" ).val();
	var url = $( "#audio" ).val();
	if(url == '')
	{
		url = null;
	}
	window.plugins.socialsharing.share(
		  message,
		  subject,
		  file,
		  url,
		  function(result) {/*alert('success: ' + result)*/},
		  function(result) {/*alert('error: ' + result)*/}
	 );
	return false;
});

//create_database
$(document).on("click","a.create_database",function(e)
{
	var database_service = new Database();
	database_service.initialize().done(function () {
		alert("Database service initialized");
	});
	
	var response = database_service.create_database();
});

//check_database
$(document).on("click","a.check_database",function(e)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	//var db = window.openDatabase("dominion", "1.0", "dominion_db", 1 * 1024);
	var db = window.openDatabase("Test", "1.0", "TestDB", 1 * 1024);
	
	cordova.plugins.sqlitePorter.exportDbToJson(db, {
		successFn: function(json_string, count){
			var data = JSON.stringify(json_string);
			alert(data);
			var arr = $.map(json_string.data.inserts.post, function(el) { return el });
			alert(arr.length);
			var rows = arr.length;
			for(var r = 0; r < rows; r++)
			{
				var name = arr[r];
				//alert(name.Title);
				alert(name['post_title']);
			}
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	}, true);
});

//update_database
$(document).on("click","a.update_database",function(e)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var db = window.openDatabase("Test", "1.0", "TestDB", 1 * 1024);
	var sql = "INSERT INTO Artist(Id,Title) SELECT 6, 'Jane' WHERE NOT EXISTS(SELECT 1 FROM Artist WHERE Id = 6 AND Title = 'Jane');"+
		"UPDATE Artist SET Title='Susan' WHERE Id='2';"+
		"DELETE FROM Artist WHERE Id='5';";
	var successFn = function(count){
		alert("Successfully imported "+count+" SQL statements to DB");
		$( "#loader-wrapper" ).addClass( "display_none" );
	};
	var errorFn = function(error){
		alert("The following error occurred: "+error.message);
		$( "#loader-wrapper" ).addClass( "display_none" );
	};
	var progressFn = function(current, total){
		console.log("Imported "+current+"/"+total+" statements");
	};
	cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
		successFn: successFn,
		errorFn: errorFn,
		progressFn: progressFn
	});
});

function getWords(str) {
    return str.split(/\s+/).slice(0,50).join(" ");
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
}
