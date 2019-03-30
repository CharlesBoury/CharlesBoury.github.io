# Rules
all videos are both in mp4 & webm, to be playable on every device.
Here is a webm converter: https://video.online-convert.com/fr/convertir-en-webm

# Tests
to test on localhost (or mothership.local from other machines):

1. check that the directory served by apache is the project directory (change "DocumentRoot" in /private/etc/apache2/httpd.conf)
2. in terminal: `sudo apachectl start` (or restart)
	(infos from https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-osx-10-11-el-capitan/)

# Deploy
You can use [git-ftp](https://github.com/git-ftp/git-ftp)

in terminal: `git ftp push`
options:

	git config git-ftp.url "ftp://ftp.charlesboury.fr:21/www"
	git config git-ftp.user "charlesbq"
	git config git-ftp.password "password"
	
(or in gitup: Repository > Edit git config)

# Known bugs
* [dragonbox] logo anim is slow on iOS and safari
