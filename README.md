# Food Monk

GITFLOW:

- Always work on your local branches (like solo-bvirk1357)
  - Create branch using command: git co -b solo-<your username>

- Steps to push your code up into github
  - Commit your changes in the local branch
  - Switch to master branch on your local dir (git co master)
  - git pull
  - Switch to your branch
  - Merge in lastest changes from master by doing on your branch:
     - git merge master
  - After resolving any conflicts do a final commit into your own repo.
  - git push origin <branch>
  - On github, create a pull request

Done!


STARTUP for server + mongodb (AFTER INITIAL SETUP BELOW)
- on one terminal
  - mongod
- on other terminal
  - npm start
- on chrome browser: 'localhost:3000' should work



ENV SETUP COMMANDS TO RUN FIRST TIME YOU RUN THIS APP ON YOUR COMPUTER:

Source: http://www.bradoncode.com/tutorials/mean-stack-tutorial-part-1-setup/

- Install mongoDB:
  http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/?_ga=1.250162051.424956578.1438899402
  1) brew update
  2) brew install mongodb

- Install Node.js
  IT PROBABLY IS ALREADY INSTALLED, check by typing
    >> node
  https://nodejs.org/

Then setup:
1) npm install -g bower
2) npm install -g grunt-cli
3) npm install -g yo
4) npm install -g generator-meanjs@0.1.12
5) mkdir -p /data/db





