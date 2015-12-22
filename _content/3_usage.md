---
title: "Usage"
in_page_link: usage
---

Once all is set up and ready to go you can create new virtual hosts simply by calling vhost name. The following is an example output for the creation of a virtual host named test.

```bash
$ vhost test
Creating host test
Copying template from /etc/apache2/sites-available/template.conf
Replacing Template variables with test
Moving generated template to /etc/apache2/sites-available
Creating Document Root
Activating site
Enabling site test.local.
To activate the new configuration, you need to run:
  service apache2 reload
Reloading Apache Server
Adding new site to /etc/hosts
127.0.0.1 test.local
Your site is now available at http://test.local
```

You can click the link to open the new Virtual Host and see the default page.
To remove a host run vhost -r name, so for the test host run vhost -r test. The script will prompt you to confirm the deletion before doing anything.

For more see vhost --usage.

### Template

vhost comes with a default template that is used to create new apache configuration files. Inside the file is a variable name `{{CUSTOM}}` that is replaced with whatever is specified as name when running `vhost name`. You can adjust this template as you need, as long as it is name `template.conf` and is located inside `/etc/apache2/sites-available`. Below is an example of creating SSL-only hosts with a `.dev` domain.

```conf
<VirtualHost *:443>
    ServerAdmin webmaster@localhost
    ServerName {{CUSTOM}}.dev

    SSLEngine on
    SSLCertificateFile /etc/apache2/ssl/{{CUSTOM}}.crt
    SSLCertificateKeyFile /etc/apache2/ssl/{{CUSTOM}}.key

    DocumentRoot /var/www/html/{{CUSTOM}}

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

   <Directory "/var/www/html/{{CUSTOM}}/">
     AllowOverride all
     Require all granted
   </Directory>
</VirtualHost>
```

This assumes, however, that you create the SSL Certificate and Key inside the `/etc/apache2/ssl` directory. As of now vhost cannot create self-signed SSL certificates.
