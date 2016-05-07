window.channels = [
  {
    "title": "Sportsnet World HD",
	"mediaid": "Sports HD",
    "image": "http://www.streamtvbox.com/site/placeholder.png",
    "sources": [
      {
        "file": "rtmp://usa.quickplay.tv:1935/liveedge?wmsAuthSign=" + urlkey1 + "/synx_world.stream",
        "default": "true",
        "type": "rtmp"
      }
  },{
    "title": "AMC - Acestream",
	"mediaid": "AMC",
    "image": "http://nowwatchtvlive.me/wp-content/uploads/2015/09/amc_acestream.png",
    "sources": [
      {
        "file": "plugin%3A%2F%2Fprogram.plexus%2F%3Furl%3D9d490c73b8376b3410d67bbe302947f2d3ab9baa",
        "default": "true",
        "type": "rtmp"
      }
  },

];
window.channels.sort( function(a,b) 
{
	if(a.mediaid < b.mediaid)
		return -1;
	if(a.mediaid > b.mediaid)
		return 1;
	if(a.title < b.title)
		return -1;
	if(a.title > b.title)
		return 1;
	return 0;
});



//---------- Do NOT edit anything below this line!! ----------//

jQuery(document).ready(function() {
  var $, channelSelectContainer, jwParent, aspectRatio, i, iChannel, jwp, jwpResize;
  $ = jQuery;
  channelSelectContainer = $('#channel-select');
  channelSelectContainer.before('<div id="category-select" style="text-align:center;line-height:50px;"></div>');
  categorySelectContainer = $('#category-select');
  i = 0;
  a = 0;
  category = " ";
  while (i < channels.length) {
    iChannel = channels[i];
    if(category != iChannel.mediaid) {
    	category = iChannel.mediaid;
    	a += 1;
    	if(a === 7) categorySelectContainer.append('<br>');
    	categorySelectContainer.append('<a href="#" class="category-selector category-button" data-category="' + iChannel.mediaid + '">' + iChannel.mediaid + '</a>');
    }
    i += 1;
  }
  categorySelectContainer.append('<a href="#" class="category-selector category-button" data-category="View all">View all</a>');

  $('.category-selector').click(function(e) {
  	e.preventDefault();
  	var caller = $(this);
  	channelSelectContainer.slideUp(500, function() {
  		channelSelectContainer.html('');
	  	it = 0;
	  	while (it < channels.length) {
	    	iChannel = channels[it];
	    	if(iChannel.mediaid == caller.data('category') || caller.data('category') == "View all") {
	    		channelSelectContainer.append("      <a id=\"channel-" + it + "\"      class=\"channel-select-link" + (it === 0 ? ' selected' : '') + "\"      href=\"#\">        " + (iChannel.title != null ? iChannel.title : 'Channel ' + it) + "      </a>      ");
	    	}
	    	it += 1;
	  	}
	  	channelSelectContainer.slideDown(500);
	  	$('.channel-select-link').click(function(e) {
		    var currentItem, jw, newItem, selectedChannel;
		    e.preventDefault();
		    $('.channel-select-link').removeClass('selected');
		    $(this).addClass('selected');
		    selectedChannel = parseInt($(this).attr("id").replace("channel-", ""));
		    jw = jwplayer("video-player");
		    currentItem = jw.getPlaylistItem();
		    newItem = jw.getPlaylistItem(selectedChannel);
		    console.log({
		      currentItem: currentItem,
		      newItem: newItem,
		      selectedChannel: selectedChannel,
		      jw: jw
		    });
		    if (jw.getPlaylistItem(selectedChannel) !== jw.getPlaylistItem()) {
		      return jw.playlistItem(selectedChannel)
			  document.write(selectedChannel)
			  document.write(urlkey1);
		    }
		 });
	});
  });
  /*
      Correctly resize the player, as the setup options are not working
  */

  aspectRatio = 16 / 9;
  jwp = jwplayer("video-player");
  jwParent = $("#video-player-container");
  jwpResize = function() {
    var jwplayerWidth;
    jwp = jwplayer("video-player");
    jwplayerWidth = jwParent.width();
    jwp.resize(jwplayerWidth, jwplayerWidth / aspectRatio);
    return $('#chat-container').height(jwplayerWidth / aspectRatio);
  };
  return null;
});