module.exports = function(req, res, connection){

    // Recive showId
    if(!req.query.filter)
        return res.sendStatus(404);

    var filter = req.query.filter;
    
    // Switch filter method
    var sql = '';
    switch(filter){
        
        case 'featured':
        sql = "SELECT id, title, episode, thumb_path FROM app_podcasts WHERE featured = 1 ORDER by likes DESC"
        break;

        case 'popular':
        sql = "SELECT id, title, episode, thumb_path FROM app_podcasts WHERE popular = 1 ORDER by likes DESC";
        break;

        case 'likes':
        sql = "SELECT id, title, episode, thumb_path FROM app_podcasts WHERE id IN ('" + req.query.key + "') ORDER BY title DESC";
        break;
        
    }

    // Query database
    connection.query(sql,function(error, result){

        if(error || result.length === 0){
            console.log(error);
            return res.sendStatus(404);
        }

        return res.json(result);

    });

}