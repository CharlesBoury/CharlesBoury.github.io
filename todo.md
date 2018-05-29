
# TODO

### must
* improve projects
    * more UI/VFX work (in bactattack)
    * show process (show font in tina project, etc)
    * links to play (stores / itch.io / download)
    * videos, gifs, & interactive toys
* add Schmilblick project
* add Frankenstein project

### nice if
* blog link on homepage
* interactive tags on homepage
* "zoom" on each picture
* responsive images (better resolution of pictures on large screen, quicker on small)
* dark theme
* animations ! But only on scroll, not on page load
* everything like `><span>New line...</span` to be consistent

### bugs
* myriad doesn't work on firefox 20, nor on touch devices

# Tests
to test on localhost (or mothership.local from other machines):

1. check that the directory served by apache is the project directory (change "DocumentRoot" in /private/etc/apache2/httpd.conf)
2. in terminal: `sudo apachectl start` (or restart)
    (infos from https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/)

# Deploy
in terminal: `git ftp push`
options:

    git config git-ftp.url "ftp://ftp.charlesboury.fr:21/www"
    git config git-ftp.user "charlesbq"
    git config git-ftp.password "password"
    
(or in gitup: Repository > Edit git config)

(infos from https://github.com/git-ftp/git-ftp)