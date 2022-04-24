$(document).ready(function() {
    let API_KEY = 'AIzaSyAXF_4runhSUjlBCAhV_EPQO7MGKzw_Dic'
    let video = ''

    $("#form").submit(function(e) {
        e.preventDefault();
        let search = $("#search").val()+"trailer";

        videoSearch(API_KEY, search, 1)
    })
    function videoSearch(API_KEY, search, results) {
        search += " official trailer movie"
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + results + "&q=" + search, function(data) {
            console.log(data)

            data.items.forEach(item => {
                video = `

         <iframe id="searchTrailer" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>

        `
                $('#trailer').remove()
                $("#videos").append(video)
            })
        })
    }
})