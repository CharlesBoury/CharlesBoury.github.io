
# TODO

### must
* improve projects
    * more UI/VFX work (in bactattack)
    * show process (show font in tina project, etc)
    * videos, gifs, & interactive toys
* add Schmilblick project
* add bird_outline project
* better pictures in CV
* add Education to CV

### nice if
* blog link on homepage
* interactive tags on homepage
* responsive images (better resolution of pictures on large screen, quicker on small)
* dark theme
* animations ! But only on scroll, not on page load
* everything like `><span>New line...</span` to be consistent

### bugs
* bug: project imgs/videos with border: left & right blank space between borders and img/video when affected by 'object-fit: contain'.

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