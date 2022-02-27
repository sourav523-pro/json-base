import { Router } from "express"
import Youtube from 'ytdl-core'
import contentDisposition from 'content-disposition'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const App = Router();
App.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm')
})
const extractData = (req) => {
    let videoId = req.query.videoid || null
    let url = videoId ? "https://www.youtube.com/watch?v=" + videoId : req.query.url
    let formatAdded = req.query.format || "video/mp4"
    let quality = req.query.quality || "highest"
    let [type, format] = formatAdded.split('/')
    format = format.toLowerCase()
    quality = quality.toLowerCase()
    return {
        url: url,
        options: {
            format: format,
            quality: quality
        }
    }
}
App.get('/download', async (req, res) => {
    let videoId = req.query.videoid
    // let url = "https://www.youtube.com/watch?v=" + videoId
    // let url = req.query.url
    let url = videoId ? "https://www.youtube.com/watch?v=" + videoId : req.query.url
    let format = req.query.format || "mp4"
    let quality = req.query.quality || "highest"
    format = format.toLowerCase()
    quality = quality.toLowerCase()

    try {
        let info = await ytdl.getBasicInfo(url)
        let filename = info.videoDetails.title + '.' + format
        // res.header('Content-Disposition', 'attachment; filename=' + filename)
        // res.header('Content-Type', 'mime/' + format)
        // res.header('Content-Transfer-Encoding', 'binary')
        res.set({
            'Content-Type': type + '/' + format,
            'Content-Disposition': "attachment; filename=" + contentDisposition(filename),
            'Content-Transfer-Encoding': 'binary'
        })
        Youtube(url, {
            format: format,
            quality: quality
        }).pipe(res)
    } catch (err) {
        console.log(err)
        Youtube(url, {
            format: "mp4"
        }).pipe(res)
    }
})
App.get('/getinfo', async (req, res) => {
    let videoId = req.query.videoid || null
    let url = videoId ? "https://www.youtube.com/watch?v=" + videoId : req.query.url
    try {
        let info = await Youtube.getBasicInfo(url)
        res.json({ ...info })
    } catch (err) {
        res.writeHead(500, err)
        console.log(err)
    }
})

export default App