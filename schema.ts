import * as yup from 'yup';
export let changePasswordSchema = yup.object().shape({
    profilePassword:yup.string().min(8, 'Password must be at least 8 characters long'),
    profileConfirmPassword:yup.string().min(8, 'Confirm password must be at least 8 characters long'),
  })
  
  export let registerUserSchema = yup.object().shape({
      username:yup.string().required(),
      email:yup.string().email(),
      password:yup.string().min(8, 'Password must be at least 8 characters long'),
      confirmPassword:yup.string().min(8, 'Confirm password must be at least 8 characters long'),
      userIcon:yup.string()
  });
  export let loginUserSchema = yup.object().shape({
      email:yup.string().email(),
      password:yup.string().min(3, 'Password must be at least 3 characters long'),
  });
  