const express=require('express');
import {getPrivateRoute} from '../controllers/private'
const router=express.Router()
router.route('/').get(getPrivateRoute)
module.exports=router;