const express = require('express');
const router = express.Router();
const path = require('path');


console.log(path.resolve(__dirname, 'ppt/pptdemo.pptx'))
import PPTXCompose from "pptx-compose";

const compose = new PPTXCompose();
router.get('/transfer', function(req, resp, next){
    resp.header("Access-Control-Allow-Origin", "*");
    let feedback = {
        code: 1,
        message: 'ppt success'
      };
    try {
        compose.toJSON(path.join(__dirname, '..', '/ppt/pptdemo.pptx')).then((data)=>{
            const title = data['docProps/core.xml']['cp:coreProperties']['dc:title'];
            console.log(title);
            console.log(data);
            feedback.pptData = data;
            resp.json(feedback);
        }) 
    } catch (error) {
        console.log(error);
        feedback.code = 0;
        feedback.message = 'failed'
        resp.json(feedback);
    }
})
module.exports = router;