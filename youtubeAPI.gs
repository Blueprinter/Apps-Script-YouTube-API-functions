function getMyLikedVideos(maxNmbrToGet,dataToGet) {
  var results;

  maxNmbrToGet = maxNmbrToGet ? maxNmbrToGet : 10;
  dataToGet = dataToGet ? dataToGet : "id";
  results = YouTube.Videos.list(dataToGet, {myRating: 'like', maxResults: maxNmbrToGet});

  //Logger.log('results: ' + results);
  //Logger.log('items[0].id: ' + items[0].id);

  return results.items;
}


function unlikeMyLikedVideo(id) {

  YouTube.Videos.rate(id,"none");

}

function addToMusicPlaylist(id,playListId) {
  var options = {},snippet = {};

  /*
  {"snippet":{
    "playlistId":"YOUR_PLAYLIST_ID",
    "position":0,
    "resourceId":{
      "kind":"youtube#video",
      "videoId":"abcdefg"
      }
    }
  }
  */

  snippet.playlistId = playListId;
  //snippet.position = 0;//Insert the video into the playlist at index zero

  snippet.resourceId = {};
  snippet.resourceId.kind = "youtube#video";
  snippet.resourceId.videoId = id;

  options.snippet = snippet;

  //Logger.log("options: " + JSON.stringify(options))
  YouTube.PlaylistItems.insert(options,"snippet");

}

function getMyPlayLists(playListName) {
  var i,L,myPlayLists,response;

  response = YouTube.Playlists.list("snippet",{mine:true});

  //Logger.log('response: ' + response);

  myPlayLists = response.items;

  if (!playListName) {
    return myPlayLists;
  }

  L = myPlayLists.length;

  for (i=0;i<L;i++) {
    thisPlayList = myPlayLists[i];

    name = thisPlayList.snippet.title;
    //Logger.log('name: ' + name)
    //Logger.log('thisPlayList.id: ' + thisPlayList.id)

    if (name.toLowerCase().indexOf(playListName.toLowerCase()) !== -1) {
      //Logger.log('found it')
      break;

    }

  }

  return thisPlayList.id;
}

function addLikedMusicVideosToPlaylistAndUnlike() {
  var allLikedVideos,i,id,L,playListId,thisVid;

  playListId = getMyPlayLists("Music");
  numberOfVideosToGet = 2;

  allLikedVideos = getMyLikedVideos(numberOfVideosToGet);
  L = allLikedVideos.length;

  for (i=0;i<L;i++) {
    thisVid = allLikedVideos[i];
    id = thisVid.id;
    //Logger.log("id: " + id)

    addToMusicPlaylist(id,playListId);

    unlikeMyLikedVideo(id);
  }
}

function unlikeLikedVideos() {
  var allLikedVideos,i,id,L,thisVid;

  numberOfVideosToGet = 18;
  dataToGet = "snippet";

  allLikedVideos = getMyLikedVideos(numberOfVideosToGet,dataToGet);
  L = allLikedVideos.length;

  for (i=0;i<L;i++) {
    thisVid = allLikedVideos[i];
    id = thisVid.id;
    //Logger.log("id: " + id)
    //Logger.log("thisVid: " + JSON.stringify(thisVid))
    //Logger.log("name: " + thisVid.snippet.title)

    unlikeMyLikedVideo(id);
  }

}

function testGet_aPlayListID() {

  var id = getMyPlayLists("Music");

  Logger.log('id: '  + id)
}
