const { devices } = require('@playwright/test');


const config = {
  testDir: './tests',
  

  timeout: 250 * 1000,
  expect: {
   
    timeout: 9000
    
  },
  
  //retries: 3,
  //reporter : 'html',
  workers : 1,
  //retries: 2,
  
  
  use : {
    
     browserName : 'chromium',
     workers : 1,
     headless: false,
     ignoreHTTPSErrors: true,
     screenshot: 'only-on-failure',
     //reporter: 'html',
     fullyParallel:false,
     video:'retain-on-failure',
     baseURL:"https://demo.ezto.io",
     //baseURL:'https://100qa.qa.eztovrfy.com',
    //  video: {
    //   mode: 'retain-on-failure',
       //size: { width: 720, height: 1280 }
    // }
     
    
     
   
    
     //navigationTimeout: 30 * 1000,
     //globalTimeout: 60 * 60 * 1000,
     //slowMo : 2000,
     //viewport: { width: 1440, height: 900 },
     //video : 'on',
  }
 
  

 

};

module.exports = config;
