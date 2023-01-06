export const loginElements = ( callback ) => [
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
          type: 'button',
          name: 'login',
          label: 'Login',
          callback: callback.submit
        }
      ]