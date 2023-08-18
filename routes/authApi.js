const express = require('express');
const router = express.Router();

const { authController } = require('../controller');
const { userValidation } = require('../schemas');
const { authentication, imageUpload } = require('../middleware');
const { validateBody } = require('../helpers');

const { userRegisterSchema, emailSchema, userLoginSchema, refreshSchema } =
  userValidation;

router.post(
  '/register',
  validateBody(userRegisterSchema),
  authController.register
);

router.get('/verify/:verificationToken', authController.verify);

router.post('/verify', validateBody(emailSchema), authController.reVerify);

router.post('/login', validateBody(userLoginSchema), authController.login);

router.post('/refresh', validateBody(refreshSchema), authController.refresh);

router.get('/current', authentication, authController.current);

router.post('/logout', authentication, authController.logout);

router.patch(
  '/avatar',
  authentication,
  imageUpload.single('avatar'),
  authController.updateAvatar
);

router.patch('/update', authentication, authController.updateUser);

module.exports = router;
