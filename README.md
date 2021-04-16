# Scheduling-App-Google-Script
This is the database spreadsheet for the scheduling app that was written for a bar. It utilizes a frontend app (spreadsheet) also written in JS (Google Script) and two Google Forms that are interconnect for this app to function. Currently, the roles in the schedule app can not be changed. If this scheduling app needed to be used for a business with completely different roles a future PR will be needed to make roles more dynamic.

## Required files:
  - Database spreadsheet repo: https://github.com/Brian-Demon/Scheduling-App-Database-Google-Script
       - *REQUIRED* -- Follow the read me in that repo for this databse to work
  - Make a copy of the following Google spreadsheet: https://docs.google.com/spreadsheets/d/1-9gyabLz_8QLfj2bcv05tKuqKQ8T3F_doTQ_7K5Vd1s

## Google Apps GitHub Assistant:
To clone project:
Add Google Apps Script GitHub Assistant (https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo/related) to gain access to GitHub functionalty

## Change Sheet ID:
  - After cloning the repo and making a copy of the Google spreadsheet, open the spreadsheet and do the following:
    1) Tools -> Script editor -> in "0) Global Variables" change var ssData = SpreadsheetApp.openById( --THE ID OF THE DATABSE SPREADSHEET-- );
      - The ID can be found in the URL for your newly copied spreadsheet ( https://.../spreadsheets/d/THE-SPREADSHEET-ID-IS-HERE/ )
      - *REQUIRED* -- If you do not change the ID the code will explode

## Google Authorization Steps:
![Google Script Authorization Step 1](https://user-images.githubusercontent.com/74803363/115067547-b56d2e80-9eb6-11eb-83ef-be47fa632c0d.PNG)
![Google Script Authorization Step 2](https://user-images.githubusercontent.com/74803363/115067554-b69e5b80-9eb6-11eb-88c9-e6bf5b168bf1.PNG)
![Google Script Authorization Step 3](https://user-images.githubusercontent.com/74803363/115067558-b7cf8880-9eb6-11eb-8ea2-3a35f5b43c50.PNG)
![Google Script Authorization Step 4](https://user-images.githubusercontent.com/74803363/115067559-b900b580-9eb6-11eb-8acd-cf12b3ed50d1.PNG)
![Google Script Authorization Step 5](https://user-images.githubusercontent.com/74803363/115067565-baca7900-9eb6-11eb-88ee-7c316b0548de.PNG)
