# vhost

[![Join the chat at https://gitter.im/kevingimbel/vhost](https://badges.gitter.im/kevingimbel/vhost.svg)](https://gitter.im/kevingimbel/vhost?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`vhost` is a command line utility for creating new Virtual Hosts for the Apache Server. It was build out of laziness. Currently the script supports creating files for the Apache Web Server. Nginx support is on the roadmap but due to my lack of Nginx knowledge currently far away.

**NOTE:** `vhost` has only been tested on Ubuntu 14.04 running Apache 2.4.7! On other Linux Distributions most used programms (`rm`, `cp`, `sed`, `sudo`) should be available. It could happen that things go bad and you break your local Server. Be warned!

With a Linux Distribution similar to Ubuntu (such as Kubuntu, Lubuntu, etc.) you should be good to go. Other Linux Distributions as well as OS X most likely need to adjust the script as needed.

**This script is not intended to, and will never, run on Windows**

### vhost - installation

Clone this repository to some place on your computer.

```sh
$ cd ~/workspace/github
$ git clone git@github.com:kevingimbel/vhost.git
```

Next symlink the `template.conf` to `/etc/apache2/sites-available` - this file is
the template for all future Virtual Hosts. You'll also need to make vhost
executable and then symlink the vhost executable to some place that's in
your `$PATH`.

So, inside the Repository do the following
```sh
$ (sudo) ln -s /full/path/to/template.conf /etc/apache2/sites-available
$ chmod +x vhost
$ ln -s /full/path/to/vhost /usr/local/bin/vhost
```

Now you should be able to run `vhost -h` to get a help and usage message.

At this point you should perform a quick system check. Run `vhost --test` and
`vhost` will do a basic check for functions, folders and directories.

### vhost - usage

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
### vhost - configuration

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
  	ServerName {{CUSTOM}}.local

  	DocumentRoot /var/www/html/{{CUSTOM}}

    ErrorLog /var/log/apache2/{{CUSTOM}}.local/error.log
    CustomLog /var/log/apache2/{{CUSTOM}}.local/access.log combined

   <Directory "/var/www/html/{{CUSTOM}}/">
     AllowOverride all
     Require all granted
   </Directory>
</VirtualHost>

# <VirtualHost *:443>
#     ServerAdmin webmaster@localhost
#     ServerName {{CUSTOM}}.local
#
#     SSLEngine on
#     SSLCertificateFile /etc/ssl/certs/{{CUSTOM}}.crt
#     SSLCertificateKeyFile /etc/ssl/private/{{CUSTOM}}.key
#
#     DocumentRoot /var/www/html/{{CUSTOM}}
#     
#     ErrorLog /var/log/apache2/{{CUSTOM}}.local/error.log
#     CustomLog /var/log/apache2/{{CUSTOM}}.local/access.log combined
#
#    <Directory "/var/www/html/{{CUSTOM}}/">
#      AllowOverride all
#      Require all granted
#    </Directory>
# </VirtualHost>
```

# vhost-ssl

### vhost-ssl - install

Like installing `vhost` you just need to make the file executable and link it somewhere in your path. Then run `vhost-ssl -v` to verify it worked.

```sh
$ (sudo) ln -s /full/path/to/vhost-ssl /usr/local/bin/vhost-ssl
$  vhost-ssl -v

```

### vhost-ssl - configuration

`vhost-ssl` is a utility tool to create SSL keys and certificates for self-signed SSL certificates to use in local development. To run `vhost-ssl` you will need to create a `.vhostrc` in your home directory (`~/`). Inside configure a default key file used to sign certificates and a default output directory.

```txt
# .vhostrc
vhost_ssl_cert_dir="/etc/ssl/certs"
vhost_ssl_key_file="/etc/ssl/private/apache.key"
```

The `.vhostrc` file is read in when the command runs.

### vhost-ssl - usage

See `vhost --usage` for a usage overview. 

```txt
Usage: vhost-ssl [options [arg]]
Script to create SSL keys and certificates.

Options:
    -u,--usage            Show usage message
    -h,--help             Show help message for command, e.g. vhost-ssl -c --help
    -v,--version          Show version and author info
    -i,--info             Show info about root privileges
    -c,--cert [str]       Name of the certificate to be created
    -o,--out [str]        Output directory for key file
    -k,--key [str]        Create a key file, pass name as argument

Run 'vhost-ssl COMMAND --help' for more information on a command.
For example 'vhost-ssl -c --help'
```
