'use strict';

import express from 'express'
const router = express.Router()
import System from '../../controller/system'

/**
 * 获取系统配置url参数
 */
router.get('/getParams', System.getParams);

/**
 * 获取系统配置
 */
router.get('/getConfig', System.getConfig);

export default router