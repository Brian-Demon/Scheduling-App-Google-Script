# Scheduling-App-Google-Script
This is the database spreadsheet for the scheduling app that was written for a bar. It utilizes a frontend app (spreadsheet) also written in JS (Google Script) and two Google Forms that are interconnect for this app to function. Currently, the roles in the schedule app can not be changed. If this scheduling app needed to be used for a business with completely different roles a future PR will be needed to make roles more dynamic.

## Required files:
  - Database spreadsheet repo: https://github.com/Brian-Demon/Scheduling-App-Database-Google-Script
       - *REQUIRED* -- Follow the read me in that repo for this databse to work
  - Make a copy of the following Google spreadsheet: https://docs.google.com/spreadsheets/d/1-9gyabLz_8QLfj2bcv05tKuqKQ8T3F_doTQ_7K5Vd1s

## First Steps:
  - After cloning the repo and making a copy of the Google spreadsheet, open the spreadsheet and do the following:
    1) Tools -> Script editor -> in "0) Global Variables" change var ssData = SpreadsheetApp.openById( --THE ID OF THE DATABSE SPREADSHEET-- );
      - 
## Google Apps GitHub Assistant:
To clone project:
Add Google Apps Script GitHub Assistant (https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo/related) to gain access to GitHub functionalty
