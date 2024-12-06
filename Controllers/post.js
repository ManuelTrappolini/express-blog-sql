

const connection = require('../data/database')

function index(req, res) {
    const sql = 'SELECT * FROM posts'


    connection.query(sql, (err, results) => {
        if (err) return res.serverStatus(500).json({ error: err })
        console.log(results);

        res.json(results)
    })
}

function show(req, res) {
    const id = req.params.id

    const postsSql = 'SELECT * FROM posts WHERE id = ?'

    const tagsSql = `
        SELECT tags.*
        FROM tags
        JOIN post_tag ON tags.id = post_tag.tag_id
        WHERE post_tag.post_id = ?
        `
    connection.query(postsSql, [id], (err, postsResults) => {
        if (err) return res.status(500).json({ error: err })
        if (!postsResults[0]) return res.status(404).json({ error: `404! Post not found` })
        const post = postsResults[0]
        console.log(post);
        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) return res.status(500).json({ error: err })
            console.log(tagsResults);
            post.tags = tagsResults
            const responseData = {
                data: post
            }

            res.status(200).json(responseData)

        })

    })

}








function destroy(req, res) {

    const { id } = req.params;
    connection.query('DELETE FROM posts WHERE id= ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    })
}




























/* const posts = require('../data/db.js')
const fs = require('fs') */

/* const index = (req, res) => {
    res.json({
        data: posts,
        count: posts.length
    })
}
 */
const store = (req, res) => {
    console.log(req.body);

    const post = {

        title: req.body.title,
        id: Number(posts[posts.length - 1].id + 1),
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    };

    posts.push(post);

    fs.writeFileSync('./data/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`);

    res.json({
        status: 201,
        data: posts,
        counter: posts.length
    })
}

/* function show(req, res) {
    const post = posts.find(post => post.id === Number(req.params.id));
    if (!post) {
        return res.status(404).json({
            error: "404! not found"
        })
    }
    return res.status(200).json({
        data: post
    })
} */

const update = (req, res) => {
    const post = posts.find((post) => post.id === Number(req.params.id))
    if (!post) {
        return res.status(404).json({
            errore: `404! Not Found`
        })
    }
    post.title = req.body.title;
    post.id = req.body.id;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    fs.writeFileSync('./data/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.json({
        status: 201,
        data: posts,
        counter: posts.length
    })


}

/* const destroy = (req, res) => {
    const post = posts.find((post) => post.id === Number(req.params.id))
    if (!post) {
        return res.status(404).json({
            errore: `404! No post found with this id ${req.params.id}`
        })
    }
    newPosts = posts.filter((post) => post.id !== Number(req.params.id))

    fs.writeFileSync('./data/db.js', `module.exports = ${JSON.stringify(newPosts, null, 4)}`)

    return res.json({
        status: 201,
        data: newPosts,
        counter: newPosts.length
    })
} */
module.exports = {
    store,
    index,
    show,
    update,
    destroy
}