# vhost

`vhost` is a command line utility for creating new Virtual Hosts for the Apache Server. It was build out of laziness.

**NOTE:** `vhost` has only been tested on Ubuntu 14.04 running Apache 2.4.7! On other Linux Distributions most used programms (`rm`, `cp`, `sed`, `sudo`) should be available. It could happen that things go bad and you break your local Server. Be warned!

With a Linux Distribution similar to Ubuntu (such as Kubuntu, Lubuntu, etc.) you should be good to go. Other Linux Distributions as well as OS X most likely need to adjust the script as needed.

**This script is not intended to, and will never, run on Windows**

### Installation

Clone this repository to some place on your computer.

```sh
$ cd ~/workspace/github
$ git clone git@github.com:kevingimbel/vhost.git
```

Next symlink the `template.conf` to `/etc/apache2/sites-available` - this file is
the template for all future Virtual Hosts. You'll also need to make vhost
executable and then symlink the vhost executable to some place that's in
your `$PATH`, e.g. `~/local/bin`.

So, inside the Repository do the following
```sh
$ (sudo) ln -s template.conf /etc/apache2/sites-available
$ chmod +x vhost
$ ln -s vhost ~/local/bin
```

Now you should be able to run `vhost -h` to get a help and usage message.

At this point you should perform a quick system check. Run `vhost --test` and
`vhost` will do a basic check for functions, folders and directories.

### Usage

Creating a new Virtual Host is now as easy as calling `vhost test` - this will
generate a Virtual Host configuration file named `test.local.conf` inside
`/etc/apache2/sites-available/`, add a Document Root to `/var/www/html/` named
`test`, generate a index.html inside the new Document Root and add a new Host
entry to the `/etc/hosts` file. The script also reloads Apache to activate the
new configuration.

That's it, you can now visit [http://test.local](http://test.local/) and see
your shiny new Virtual Host in action.

You can also do a test run with `vhost -t`. This creates the configuration for http://test.local/ and tries to reload your Apache Server.
To remove this host type `vhost -r test`.
### Modification

You can modify the `template.conf` file as you wish by changing default Document
Roots, Server Names or whatsoever. Inside the file is a variable names
`{{CUSTOM}}`. This variable is replaced by whatever you pass as an argument to
`vhost`.

So let's say you want to publish your sites at `.dev` instead of
`.local` and your default Document Root should be on `~/workspace`. Your
template file would then look like this.

```
<VirtualHost *:80>
  	ServerAdmin webmaster@localhost
  	ServerName {{CUSTOM}}.dev

  	DocumentRoot /home/$USER/workspace/{{CUSTOM}}

    ErrorLog ${APACHE_LOG_DIR}/error.log
  	CustomLog ${APACHE_LOG_DIR}/access.log combined

   <Directory "/home/$USER/workspace/{{CUSTOM}}/">
     AllowOverride all
     Require all granted
   </Directory>
</VirtualHost>
```
