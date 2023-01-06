export const signUpElements = ( callback ) => [
        {
          type: 'text',
          name: 'email',
          stack: 'vertical',
          label: 'Email Address',
        },{
          type: 'password',
          name: 'password',
          stack: 'vertical',
          label: 'Password'
        },{
          type: 'password',
          name: 'confirm',
          stack: 'vertical',
          label: 'Confirm Password'
        },{
          type: 'button',
          name: 'signup',
          label: 'Create Account',
          callback: callback.submit
        }
      ]