
# TODO

### must
* redo CV (less classic but stay serious, and in english)
* improve projects
	* more UI/VFX work (in bactattack)
	* show process (show font in tina project, link proto of jnbdp, etc)
	* put videos, gifs, et interactive toys
	* links to play  (stores / itch.io / download)
* add hologram project
* opengraph image
	
### nice if
* myriad with only one picture (window + video combined)
* add blog link on homepage
* interactive tags on homepage
* anims when over a project on homepage
* add watermark on each picture
* compress pictures the most
* special font for my site
* animations when page changes (like biron.io)
* dark theme
* better resolution of pictures when on large screen
* myriad on touch devices
* everything like "><span>New line..." to be consistent

### bugs
* .mp4 doesn't seem to work in firefox 20. Put other video formats
* dragonbox logo falls when loading. Could be nice if it was waiting to be loaded before playing the anim
* 'about' text on iphone landscape is too big


# Tests

to test on localhost (or mothership.local from other machines):
1. check that the directory served by apache is the project directory (change "DocumentRoot" in /private/etc/apache2/httpd.conf)
2. in terminal: `sudo apachectl start` (or restart)

(infos from https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/)


# Deploy

in terminal: `git ftp push`

options:
	`git config git-ftp.url "ftp://ftp.charlesboury.fr:21/www"`
	`git config git-ftp.user "charlesbq"`
	`git config git-ftp.password "password"`
	(or in gitup: Repository > Edit git config)

(infos from https://github.com/git-ftp/git-ftp)