exports.passwordUpdatedTemp = (email, name) => {

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
   <body style="font-family: Arial, sans-serif; background:#fff; padding:20px;">
      <div style="max-width:600px; margin:auto; text-align:center;">
        
        <img src="https://i.ibb.co/7Xyj3PC/logo.png" 
             alt="Logo" 
             style="max-width:200px; margin-bottom:20px;" />

        <h2>Password Update Confirmation</h2>

        <p>Hey <b>${name}</b>,</p>

        <p>Your password has been successfully updated for 
        <b>${email}</b>.</p>

        <p>If this wasn’t you, please contact support immediately.</p>

        <p style="font-size:14px; color:gray;">
          Support: info@studynotion.com
        </p>

      </div>
    </body>
    
    </html>`;
};